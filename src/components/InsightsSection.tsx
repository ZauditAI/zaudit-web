import SectionContainer from './SectionContainer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { motion } from 'motion/react';

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

const COLORS = ['#0f766e', '#0ea5e9', '#16a34a', '#f97316', '#6366f1'];

const highlightMetrics = [
  { label: 'Teams interviewed', value: '23', note: 'founders & finance leads' },
  { label: 'Shared frustrations', value: '94%', note: 'felt slowed by current stack' },
  { label: 'Ready to switch', value: '3 in 5', note: 'if reporting is instant' },
];

function InsightCard({
  title,
  data,
  highlight,
  delay = 0,
}: {
  title: string;
  data: { name: string; value: number }[];
  highlight?: string;
  delay?: number;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, delay }}
      className="h-full"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_35px_120px_-60px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-white/10" />
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#0ea5e9]/20 blur-3xl" />
        <div className="absolute -left-24 bottom-[-16%] h-64 w-64 rounded-full bg-[#f97316]/20 blur-3xl" />

        <div className="relative flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#67e8f9]">{title}</span>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 shadow-inner">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.15)] animate-pulse" />
              Live pulse
            </div>
          </div>

          <div className="grid items-center gap-7 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative h-72 w-full">
              <div className="absolute inset-6 rounded-full border border-white/20 bg-gradient-to-br from-[#0ea5e9]/10 via-transparent to-transparent blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0ea5e9]/30 via-transparent to-[#16a34a]/30 opacity-60 animate-[spin_18s_linear_infinite]" />

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgba(0,0,0,0.18)" />
                    </filter>
                    {COLORS.map((color, index) => (
                      <linearGradient key={color} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={1} />
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
                    innerRadius={62}
                    outerRadius={105}
                    paddingAngle={5}
                    cornerRadius={14}
                    stroke="transparent"
                    filter="url(#shadow)"
                  >
                    <Label
                      position="center"
                      content={({ viewBox }) => {
                        if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                        const { cx, cy } = viewBox;
                        return (
                          <foreignObject x={cx - 60} y={cy - 42} width={120} height={84} className="text-center">
                            <div className="flex h-full flex-col items-center justify-center text-sm text-slate-200">
                              <span className="text-[10px] uppercase tracking-[0.3em] text-[#67e8f9]">Total</span>
                              <span className="text-4xl font-semibold text-white">{total}</span>
                              <span className="text-[11px] text-slate-400">responses</span>
                            </div>
                          </foreignObject>
                        );
                      }}
                    />
                    {data.map((entry, index) => (
                      <Cell key={entry.name} fill={`url(#gradient-${index % COLORS.length})`} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{ background: '#020617', borderRadius: 14, borderColor: '#22d3ee', color: '#E2E8F0' }}
                    itemStyle={{ color: '#E2E8F0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-5">
              {highlight && <p className="text-base leading-relaxed text-slate-200">{highlight}</p>}
              <div className="grid gap-3">
                {data.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        aria-hidden
                      />
                      <span className="text-sm font-medium text-white/90">{entry.name}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#67e8f9]">{entry.value}</div>
                  </div>
                ))}
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
    <SectionContainer className="relative overflow-hidden bg-gradient-to-br from-[#050b1c] via-[#0a1432] to-[#0f172a]" innerClassName="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.18),transparent_36%),radial-gradient(circle_at_50%_60%,rgba(16,185,129,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:140px_140px] opacity-30" />
        <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto mb-12 flex flex-col items-center text-center space-y-6 max-w-5xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#67e8f9] shadow-sm">
          Insights from founders & finance leads
        </p>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          Razor-sharp signals from our discovery sprint
        </h2>
        <p className="text-lg leading-relaxed text-slate-200">
          Themes surfaced immediately: speed, audit-ready reporting, and ruthless automation. We redesigned the visuals to
          spotlight what teams actually need — and how fast they want to move.
        </p>
      </div>

      <div className="relative mb-12 grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-3">
        {highlightMetrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-2 rounded-2xl bg-white/5 px-4 py-3 text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#67e8f9]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {metric.label}
            </div>
            <div className="text-3xl font-semibold text-white">{metric.value}</div>
            <p className="text-sm text-slate-300">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="relative grid gap-10 lg:grid-cols-3">
        <InsightCard
          title="Primary frustrations"
          data={painPointData}
          highlight="Speed, reporting, GST, and manual data are the top blockers."
        />
        <InsightCard
          title="Current tools"
          data={toolUsageData}
          highlight="Tally still powers the majority of books, with a handful on older or manual processes."
          delay={0.1}
        />
        <InsightCard
          title="What would save time"
          data={benefitsData}
          highlight="Faster reporting and automated entry with integrations are in highest demand."
          delay={0.2}
        />
      </div>
    </SectionContainer>
  );
}
