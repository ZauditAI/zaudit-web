import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ProductPreview from './components/ProductPreview';
import SignupForm from './components/SignupForm';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ComparisonHero from './components/ComparisonHero';
import CompetitiveOverview from './components/CompetitiveOverview';
import CostVsFeature from './components/CostVsFeature';
import AutomationProductivity from './components/AutomationProductivity';
import WhySwitch from './components/WhySwitch';
import InsightsSection from './components/InsightsSection';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040714] antialiased">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(14,165,233,0.14),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(99,102,241,0.14),transparent_38%),radial-gradient(circle_at_20%_70%,rgba(16,185,129,0.15),transparent_36%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_40%,transparent_45%),linear-gradient(300deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_38%,transparent_45%)] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:160px_160px]" />
        <div className="absolute left-1/2 top-[-6rem] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#0ea5e9]/25 via-[#22d3ee]/15 to-transparent blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-6rem] h-[460px] w-[420px] rounded-full bg-gradient-to-tr from-[#f97316]/20 via-[#f59e0b]/12 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Problem Section */}
        <ProblemSection />

        {/* Solution Section */}
        <SolutionSection />

        {/* Product Preview */}
        <ProductPreview />

        {/* Comparison Page Sections */}
        <ComparisonHero />
        <InsightsSection />
        <CompetitiveOverview />
        <CostVsFeature />
        <AutomationProductivity />
        <WhySwitch />

        {/* Signup Form */}
        <SignupForm />

        {/* Footer */}
        <Footer />

        {/* Floating CTA */}
        <FloatingCTA />
      </div>
    </div>
  );
}
