import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import SectionContainer from './SectionContainer';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    city: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  // In development, use proxy. In production, use VITE_API_URL
  const endpoint = apiUrl
  ? `${apiUrl.replace(/\/$/, '')}/api/early-access`
  : 'https://zaudit-form-backend.fly.dev/api/early-access';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus('idle');
    setMessage(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        let errorMessage = 'Something went wrong. Please try again.';
        try {
          const errorData = await response.json();
          // Handle validation errors with field-specific messages
          if (errorData?.errors) {
            const errorMessages = Object.values(errorData.errors)
              .flat()
              .filter(Boolean)
              .join(', ');
            errorMessage = errorMessages || errorData?.message || errorMessage;
          } else if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      setStatus('success');
      setMessage(data?.message ?? 'Thank you! We will be in touch soon.');
      setFormData({
        name: '',
        email: '',
        businessType: '',
        city: '',
      });
    } catch (error) {
      setStatus('error');
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setMessage('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setMessage(error instanceof Error ? error.message : 'Could not submit the form. Try again later.');
      }
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer
      id="signup"
      className="bg-gradient-to-b from-[#F9FAFB] to-white"
      innerClassName="max-w-4xl"
    >
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#008080]/10 to-[#FF9933]/10 px-4 py-2 rounded-full mb-6 border border-[#008080]/20">
            <Sparkles className="w-4 h-4 text-[#008080]" />
            <span className="text-sm text-[#008080]">Limited Early Access Program</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl mb-6 leading-tight">
            Join the future of accounting
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Be among the first to experience AI-powered accounting. Get priority access, exclusive features, and direct support.
          </p>
      </motion.div>

      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12 rounded-3xl shadow-xl border-2 border-[#E5E7EB] bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm text-[#374151]">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl border-2 border-[#E5E7EB] focus:border-[#008080] transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm text-[#374151]">
                    Work Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rahul@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl border-2 border-[#E5E7EB] focus:border-[#008080] transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="businessType" className="text-sm text-[#374151]">
                    Business Type
                  </label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                    required
                  >
                    <SelectTrigger className="h-12 rounded-xl border-2 border-[#E5E7EB] focus:border-[#008080]">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail & Trading</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="city" className="text-sm text-[#374151]">
                    City
                  </label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Mumbai, Delhi, Bangalore..."
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 rounded-xl border-2 border-[#E5E7EB] focus:border-[#008080] transition-colors"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-2xl p-6 border border-[#E5E7EB]">
                <h3 className="text-lg mb-4 text-[#1a1a1a]">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Priority feature access',
                    'Dedicated onboarding support',
                    'Direct feedback channel',
                    'Influence product roadmap',
                    'Exclusive early-bird pricing',
                    'Free data migration assistance'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#008080] flex-shrink-0" />
                      <span className="text-sm text-[#4B5563]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#008080] to-[#006666] hover:from-[#006666] hover:to-[#005555] text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Early Access'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {message && (
                  <div
                    className={`rounded-xl border p-4 text-sm ${
                      status === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-rose-200 bg-rose-50 text-rose-700'
                    }`}
                  >
                    {message}
                  </div>
                )}
              </div>

              <p className="text-sm text-center text-[#6B7280]">
                We respect your privacy. No spam, only product updates and early access notifications.
              </p>
            </form>
          </Card>
        </motion.div>

      {/* Trust Indicators */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 mt-16 text-center sm:grid-cols-3"
        >
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#008080]/10 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-[#008080]" />
            </div>
            <p className="text-sm text-[#6B7280]">Bank-Grade Security</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#008080]/10 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-[#008080]" />
            </div>
            <p className="text-sm text-[#6B7280]">5-Minute Setup</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#008080]/10 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-[#008080]" />
            </div>
            <p className="text-sm text-[#6B7280]">Built for India</p>
          </div>
      </motion.div>
    </SectionContainer>
  );
}
