import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const LAUNCH_DATE = new Date();
LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 30);
LAUNCH_DATE.setHours(9, 0, 0, 0);

function getTimeLeft() {
  const now = new Date();
  const diff = LAUNCH_DATE.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function DigitBlock({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) {
  const str = String(value).padStart(2, '0');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center"
    >
      <div className="relative">
        {/* Subtle outer glow */}
        <div
          className="absolute inset-0 rounded-xl bg-[#008080]/20 blur-lg"
          style={{ transform: 'scale(1.05)' }}
        />
        {/* Clean frame — thin border, no glossy inset */}
        <div className="relative rounded-xl bg-[#FAFDFD] p-5 sm:p-6 shadow-[0_4px_14px_-2px_rgba(0,128,128,0.12)] min-w-[5rem] sm:min-w-[6rem] md:min-w-[7rem] lg:min-w-[8rem]">
          <span className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums text-[#008080]">
            {str}
          </span>
        </div>
      </div>
      <span className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#008080]/80">
        {label}
      </span>
    </motion.div>
  );
}

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative my-16"
    >
      {/* Decorative background blob */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
        aria-hidden
      >
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#008080]/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#FF9933]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#008080]/5 blur-2xl" />
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F0FDFA]/40 to-white p-10 sm:p-12 md:p-14 lg:p-16 shadow-[0_25px_60px_-12px_rgba(0,128,128,0.2)]">
        {/* Top ornament: dashed line + icon */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-[4rem] sm:max-w-[6rem] border-t-2 border-dashed border-[#008080]/30" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#008080] to-[#006666] text-white shadow-lg"
          >
            <Rocket className="h-6 w-6" />
          </motion.div>
          <div className="h-px flex-1 max-w-[4rem] sm:max-w-[6rem] border-t-2 border-dashed border-[#008080]/30" />
        </div>

        <p className="text-center text-sm sm:text-base font-semibold uppercase tracking-[0.35em] text-[#008080]/90 mb-8">
          Launching in
        </p>

        {/* Big countdown grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <DigitBlock value={timeLeft.days} label="Days" delay={0} />
          <div className="flex items-center pt-6">
            <span className="text-2xl sm:text-3xl font-bold text-[#008080]/50">:</span>
          </div>
          <DigitBlock value={timeLeft.hours} label="Hours" delay={0.1} />
          <div className="flex items-center pt-6">
            <span className="text-2xl sm:text-3xl font-bold text-[#008080]/50">:</span>
          </div>
          <DigitBlock value={timeLeft.minutes} label="Minutes" delay={0.2} />
          <div className="flex items-center pt-6">
            <span className="text-2xl sm:text-3xl font-bold text-[#008080]/50">:</span>
          </div>
          <DigitBlock value={timeLeft.seconds} label="Seconds" delay={0.3} />
        </div>
      </div>
    </motion.div>
  );
}
