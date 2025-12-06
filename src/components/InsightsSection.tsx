import SectionContainer from './SectionContainer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label, Sector } from 'recharts';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const painPointData = [
  { name: 'Too slow / complex', value: 4 },
  { name: 'Limited reporting', value: 4 },
  { name: 'GST headaches', value: 3 },
  { name: 'Customization + inventory', value: 4 },
  { name: 'Outdated automation', value: 3 },
];

const toolUsageData = [
  { name: 'Tally (desktop)', value: 14 },
  { name: 'Flash / legacy', value: 1 },
  { name: 'SAP / large ERP', value: 1 },
  { name: 'Mostly spreadsheets', value: 3 },
];

const benefitsData = [
  { name: 'Faster reporting', value: 8 },
  { name: 'Less manual entry', value: 6 },
  { name: 'Automation / integrations', value: 4 },
  { name: 'AI assistance', value: 2 },
];

const COLORS = ['#22d3ee', '#a855f7', '#22c55e', '#f97316', '#64748b'];

function InsightCard({ title, data, highlight, delay = 0 }: {
  title: string;
  data: { name: string; value: number }[];
  highlight?: string;
  delay?: number;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay }}
      className="h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-[0_25px_120px_-45px_rgba(56,189,248,0.5)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-[-30%] top-[-20%] h-60 w-60 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="absolute bottom-[-35%] right-[-10%] h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.1),transparent_40%),linear-gradient(120deg,rgba(255,255,255,0.06)_25%,transparent_25%),linear-gradient(300deg,rgba(255,255,255,0.04)_25%,transparent_25%)] bg-[length:100%_100%,100%_100%,16px_16px,16px_16px]" />
        </div>

        <div className="relative flex flex-col gap-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/40 to-emerald-400/30 ring-1 ring-white/20 shadow-inner" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80">{title}</p>
                <p className="text-[13px] text-slate-200/80">Pulse from discovery calls</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              Live
            </div>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative mx-auto flex h-[280px] w-full max-w-[360px] items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 via-white/5 to-white/0 blur-xl" />
              <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-white/5 bg-[conic-gradient(from_0deg,rgba(14,165,233,0.12),rgba(255,255,255,0)_35%,rgba(168,85,247,0.2),rgba(255,255,255,0)_70%,rgba(34,197,94,0.18))] opacity-70" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[conic-gradient(from_120deg,rgba(14,165,233,0.35),rgba(168,85,247,0.4),rgba(34,197,94,0.3),rgba(14,165,233,0.35))] p-1 shadow-[0_20px_90px_-40px_rgba(14,165,233,0.7)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900/60 p-4 ring-1 ring-white/10 backdrop-blur-2xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.45)" />
                        </filter>
                        {COLORS.map((color, index) => (
                          <linearGradient key={color} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                            <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                          </linearGradient>
                        ))}
                      </defs>

                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        startAngle={210}
                        endAngle={-150}
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        cornerRadius={14}
                        stroke="transparent"
                        filter="url(#shadow)"
                        activeIndex={activeIndex}
                        activeShape={(props) => {
                          const { outerRadius, ...rest } = props;
                          return (
                            <motion.g animate={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
                              <Sector {...rest} outerRadius={outerRadius + 8} />
                            </motion.g>
                          );
                        }}
                      >
                        <Label
                          position="center"
                          content={({ viewBox }) => {
                            if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                            const { cx, cy } = viewBox;
                            return (
                              <foreignObject x={cx - 60} y={cy - 45} width={120} height={90} className="text-center">
                                <div className="flex h-full flex-col items-center justify-center text-sm text-slate-200">
                                  <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-200">Total</span>
                                  <span className="text-4xl font-semibold text-white">{total}</span>
                                  <span className="text-[11px] text-slate-300/80">responses</span>
                                </div>
                              </foreignObject>
                            );
                          }}
                        />
                        {data.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={`url(#gradient-${index % COLORS.length})`}
                            className="transition-all duration-500"
                            onMouseEnter={() => setActiveIndex(index)}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [value, name]}
                        contentStyle={{ background: '#0b1224', borderRadius: 14, borderColor: '#67e8f9', color: '#E5E7EB' }}
                        itemStyle={{ color: '#E5E7EB' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {highlight && <p className="text-base leading-relaxed text-slate-100/90">{highlight}</p>}
              <div className="grid gap-3">
                {data.map((entry, index) => {
                  const percent = Math.round((entry.value / total) * 100);
                  return (
                    <div key={entry.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-cyan-500/10">
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            aria-hidden
                          />
                          <span className="text-sm font-medium text-white">{entry.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
                          {entry.value}
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-slate-100">{percent}%</span>
                        </div>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightsSection() {
  return (
    <SectionContainer className="relative overflow-hidden bg-gradient-to-b from-[#0b1224] via-[#0d142c] to-[#050915]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="absolute right-[-12%] bottom-[-15%] h-[420px] w-[420px] rounded-full bg-purple-500/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(120deg,rgba(255,255,255,0.04)_25%,transparent_25%),linear-gradient(300deg,rgba(255,255,255,0.04)_25%,transparent_25%)] bg-[length:100%_100%,18px_18px,18px_18px] opacity-60" />
        <div className="absolute inset-12 rounded-[32px] border border-white/5 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.25),transparent_25%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.2),transparent_30%)] opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto mb-16 max-w-5xl text-center space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-100 shadow-lg shadow-cyan-500/10"
        >
          Live discovery signals
          <span className="inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" aria-hidden />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl font-semibold text-white sm:text-5xl"
        >
          A neon snapshot of what founders keep saying
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-lg leading-relaxed text-slate-200/85"
        >
          We layered every interview into a visual pulse. Glide through the rings to see where frustration clusters and where automation buys time back.
        </motion.p>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-3">
        <InsightCard
          title="Primary frustrations"
          data={painPointData}
          highlight="Speed, reporting, GST, and manual data remain the loudest blockers across conversations."
        />
        <InsightCard
          title="Current tools"
          data={toolUsageData}
          highlight="Tally is still the heartbeat for most finance teams, with pockets of spreadsheets and legacy stacks."
          delay={0.1}
        />
        <InsightCard
          title="What would save time"
          data={benefitsData}
          highlight="Faster reporting plus automated entry and integrations form the clearest path to time saved."
          delay={0.2}
        />
      </div>
    </SectionContainer>
  );
}
