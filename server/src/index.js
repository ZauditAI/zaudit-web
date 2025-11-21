import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pino from 'pino';
import { z } from 'zod';

dotenv.config();

// -------------------------
// Env Vars
// -------------------------
const {
  PORT = 4000,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM = '"Zaudit Early Access" <zaudit.co@gmail.com>',
  MAIL_TO = 'zaudit.co@gmail.com',
  ALLOWED_ORIGINS,
  NODE_ENV
} = process.env;

// -------------------------
// Logger
// -------------------------
const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' }
      }
    : undefined,
});

// -------------------------
// App Setup
// -------------------------
const app = express();
app.use(express.json());

// -------------------------
// CORS
// -------------------------
const corsOrigins = ALLOWED_ORIGINS?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins?.length ? corsOrigins : '*',
    methods: ['POST', 'OPTIONS'],
  })
);

// -------------------------
// Validation Schema
// -------------------------
const submissionSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  businessType: z.string().min(2, 'Business type is required'),
  city: z.string().min(2, 'City is required'),
});

// -------------------------
// Email Transport
// -------------------------
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT ? Number(SMTP_PORT) : undefined,
  secure: SMTP_SECURE === 'true',
  auth: SMTP_USER && SMTP_PASS
    ? { user: SMTP_USER, pass: SMTP_PASS }
    : undefined,
});

// Verify SMTP & warn (but don't crash)
async function verifyTransporter() {
  try {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP is not configured correctly.');
    }
    await transporter.verify();
    logger.info('SMTP connection verified');
  } catch (error) {
    logger.error({ err: error }, 'SMTP connection failed');
  }
}

// -------------------------
// API Route
// -------------------------
app.post('/api/early-access', async (req, res) => {
  try {
    const submission = submissionSchema.parse(req.body);

    if (!MAIL_TO || !MAIL_FROM) {
      logger.error('MAIL_TO and MAIL_FROM must be set');
      return res.status(500).json({
        success: false,
        message: 'Mail configuration missing',
      });
    }

    const mailOptions = {
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `[Zaudit] New Early Access Request from ${submission.name}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Business Type: ${submission.businessType}`,
        `City: ${submission.city}`,
        `Submitted At: ${new Date().toISOString()}`,
      ].join('\n'),
      html: `
        <h2>New Early Access Request</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Business Type:</strong> ${submission.businessType}</p>
        <p><strong>City:</strong> ${submission.city}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    logger.info({ submission }, 'Early access request emailed');

    res.json({
      success: true,
      message: 'Request received. We will be in touch soon.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      });
    }

    logger.error({ err: error }, 'Failed to handle early-access submission');
    res.status(500).json({
      success: false,
      message: 'Could not submit request. Please try again later.',
    });
  }
});

// -------------------------
// Health Check
// -------------------------
app.get('/healthz', async (_req, res) => {
  try {
    await transporter.verify();
    res.json({ ok: true, smtp: true });
  } catch {
    res.status(500).json({ ok: false, smtp: false });
  }
});

// -------------------------
// Start Server
// -------------------------
app.listen(Number(PORT), () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  verifyTransporter();
});
