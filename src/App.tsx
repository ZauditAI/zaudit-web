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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#020617] via-[#050c1f] to-[#020617] antialiased">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 opacity-60 mix-blend-screen bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,214,102,0.22),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(94,234,212,0.25),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_25%,transparent_25%),linear-gradient(300deg,rgba(255,255,255,0.02)_25%,transparent_25%)] bg-[length:18px_18px]" />
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-cyan-400/25 blur-[90px]" />
        <div className="absolute right-[-15%] top-[30%] h-96 w-96 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-72 w-72 rounded-full bg-emerald-400/25 blur-[100px]" />
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
