# Fly.io Deployment Guide

## Prerequisites
1. Add payment method to Fly.io: https://fly.io/dashboard/vaibhav-maloo/billing
   - Even free tier requires a payment method (but you won't be charged for free tier usage)

## Step 1: Create the App
```bash
export FLYCTL_INSTALL="/Users/vaibhavmaloo/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
flyctl apps create zaudit-form-backend --org personal
```

## Step 2: Set Environment Secrets
You need to set these secrets on Fly.io. Replace the values with your actual configuration:

```bash
flyctl secrets set \
  SMTP_HOST="smtp.gmail.com" \
  SMTP_PORT="465" \
  SMTP_SECURE="true" \
  SMTP_USER="zaudit.co@gmail.com" \
  SMTP_PASS="your-gmail-app-password" \
  MAIL_FROM='"Zaudit Early Access" <zaudit.co@gmail.com>' \
  MAIL_TO="zaudit.co@gmail.com" \
  ALLOWED_ORIGINS="https://zaudit.co,https://www.zaudit.co" \
  --app zaudit-form-backend
```

**Important**: 
- `SMTP_PASS` should be a Gmail App Password (not your regular password)
  - Generate one at: https://myaccount.google.com/apppasswords
- `ALLOWED_ORIGINS` must include your frontend URLs (zaudit.co)

## Step 3: Deploy the Backend
```bash
cd /Users/vaibhavmaloo/zaudit-web-1
flyctl deploy --config fly.toml
```

## Step 4: Verify Deployment
After deployment, test these endpoints:

1. **Root endpoint** (should return service status):
   ```bash
   curl https://zaudit-form-backend.fly.dev/
   ```

2. **Health check** (should return health status):
   ```bash
   curl https://zaudit-form-backend.fly.dev/healthz
   ```

3. **Test form submission** (from browser console on zaudit.co):
   ```javascript
   fetch('https://zaudit-form-backend.fly.dev/api/early-access', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'Test User',
       email: 'test@example.com',
       businessType: 'retail',
       city: 'Mumbai'
     })
   }).then(r => r.json()).then(console.log)
   ```

## Step 5: Update Frontend (if needed)
The frontend already has the backend URL hardcoded in `SignupForm.tsx`:
- It uses `https://zaudit-form-backend.fly.dev/api/early-access` as fallback
- If you want to use an environment variable instead, set `VITE_API_URL` during build

## Troubleshooting

### Check App Status
```bash
flyctl status --app zaudit-form-backend
```

### View Logs
```bash
flyctl logs --app zaudit-form-backend
```

### Check Secrets
```bash
flyctl secrets list --app zaudit-form-backend
```

### Common Issues

1. **"Failed to fetch" error**: 
   - Check if CORS is configured correctly (ALLOWED_ORIGINS secret)
   - Verify the app is running: `flyctl status`
   - Check logs for errors: `flyctl logs`

2. **CORS errors**:
   - Make sure ALLOWED_ORIGINS includes your frontend URL (https://zaudit.co)
   - Redeploy after updating secrets

3. **SMTP errors**:
   - Verify SMTP credentials are correct
   - Make sure you're using Gmail App Password, not regular password
   - Check logs for SMTP connection errors

## Notes
- The backend runs on port 8080 (configured in fly.toml)
- Free tier includes: 3 shared vCPUs, 160MB RAM, 100GB outbound traffic
- Auto-scales to 0 when not in use (configured in fly.toml)

