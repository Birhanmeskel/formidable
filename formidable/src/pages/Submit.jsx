import { useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import StepIndicator from '../components/forms/StepIndicator';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { SECTORS, STAGES, REGIONS } from '../data/sectors';

const STEPS = ['Basic Info', 'Founders', 'Traction', 'Funding', 'Review'];

const INITIAL_FORM = {
  name: '',
  tagline: '',
  sector: '',
  stage: '',
  city: '',
  region: '',
  website: '',
  description: '',
  founders: [{ fullName: '', title: '', email: '', linkedin: '' }],
  traction: {
    monthlyActiveUsers: '',
    revenue: '',
    customers: '',
    description: '',
  },
  funding: {
    totalRaised: '',
    lastRoundType: '',
    lastRoundAmount: '',
    lastRoundDate: '',
    investors: '',
  },
};

function Step1({ form, setForm }) {
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
      <Input
        label="Startup Name"
        required
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
        placeholder="e.g. AgriNet Ethiopia"
      />
      <Input
        label="Tagline"
        required
        value={form.tagline}
        onChange={(e) => update('tagline', e.target.value)}
        placeholder="One-line description of your startup"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Sector"
          required
          options={SECTORS}
          value={form.sector}
          onChange={(e) => update('sector', e.target.value)}
        />
        <Select
          label="Stage"
          required
          options={STAGES}
          value={form.stage}
          onChange={(e) => update('stage', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="City"
          required
          value={form.city}
          onChange={(e) => update('city', e.target.value)}
          placeholder="e.g. Addis Ababa"
        />
        <Select
          label="Region"
          required
          options={REGIONS}
          value={form.region}
          onChange={(e) => update('region', e.target.value)}
        />
      </div>
      <Input
        label="Website"
        type="url"
        value={form.website}
        onChange={(e) => update('website', e.target.value)}
        placeholder="https://yourstartup.et"
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Describe your startup, problem you're solving, and your solution..."
          rows={5}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600 transition-colors"
        />
      </div>
    </div>
  );
}

function Step2({ form, setForm }) {
  const addFounder = () =>
    setForm((f) => ({
      ...f,
      founders: [...f.founders, { fullName: '', title: '', email: '', linkedin: '' }],
    }));

  const removeFounder = (i) =>
    setForm((f) => ({
      ...f,
      founders: f.founders.filter((_, idx) => idx !== i),
    }));

  const updateFounder = (i, key, value) =>
    setForm((f) => ({
      ...f,
      founders: f.founders.map((fo, idx) => (idx === i ? { ...fo, [key]: value } : fo)),
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Founder Information</h2>
      {form.founders.map((founder, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-5 space-y-4 relative">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Founder {i + 1}</span>
            {form.founders.length > 1 && (
              <button
                type="button"
                onClick={() => removeFounder(i)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              value={founder.fullName}
              onChange={(e) => updateFounder(i, 'fullName', e.target.value)}
              placeholder="Abebe Girma"
            />
            <Input
              label="Title / Role"
              required
              value={founder.title}
              onChange={(e) => updateFounder(i, 'title', e.target.value)}
              placeholder="CEO & Co-Founder"
            />
            <Input
              label="Email"
              type="email"
              value={founder.email}
              onChange={(e) => updateFounder(i, 'email', e.target.value)}
              placeholder="founder@startup.et"
            />
            <Input
              label="LinkedIn"
              type="url"
              value={founder.linkedin}
              onChange={(e) => updateFounder(i, 'linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addFounder} type="button">
        <Plus size={14} /> Add Another Founder
      </Button>
    </div>
  );
}

function Step3({ form, setForm }) {
  const update = (key, value) =>
    setForm((f) => ({ ...f, traction: { ...f.traction, [key]: value } }));

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Traction & Metrics</h2>
      <p className="text-sm text-gray-500">
        Share your current traction data. All fields are optional but more data increases trust.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Monthly Active Users (MAU)"
          type="number"
          value={form.traction.monthlyActiveUsers}
          onChange={(e) => update('monthlyActiveUsers', e.target.value)}
          placeholder="e.g. 12000"
        />
        <Input
          label="Monthly Revenue (ETB)"
          type="number"
          value={form.traction.revenue}
          onChange={(e) => update('revenue', e.target.value)}
          placeholder="e.g. 500000"
        />
        <Input
          label="Number of Customers"
          type="number"
          value={form.traction.customers}
          onChange={(e) => update('customers', e.target.value)}
          placeholder="e.g. 2500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Traction Description</label>
        <textarea
          value={form.traction.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Describe key traction milestones, partnerships, or growth metrics..."
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600 transition-colors"
        />
      </div>
    </div>
  );
}

function Step4({ form, setForm }) {
  const update = (key, value) =>
    setForm((f) => ({ ...f, funding: { ...f.funding, [key]: value } }));

  const ROUND_TYPES = [
    { value: 'bootstrapped', label: 'Bootstrapped' },
    { value: 'pre_seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B' },
    { value: 'growth', label: 'Growth' },
    { value: 'grant', label: 'Grant' },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Funding History</h2>
      <p className="text-sm text-gray-500">
        Provide information about your funding history. Leave blank if not applicable.
      </p>
      <Input
        label="Total Capital Raised (USD)"
        type="number"
        value={form.funding.totalRaised}
        onChange={(e) => update('totalRaised', e.target.value)}
        placeholder="e.g. 500000"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Last Round Type"
          options={ROUND_TYPES}
          value={form.funding.lastRoundType}
          onChange={(e) => update('lastRoundType', e.target.value)}
        />
        <Input
          label="Last Round Amount (USD)"
          type="number"
          value={form.funding.lastRoundAmount}
          onChange={(e) => update('lastRoundAmount', e.target.value)}
          placeholder="e.g. 350000"
        />
      </div>
      <Input
        label="Last Round Date"
        type="date"
        value={form.funding.lastRoundDate}
        onChange={(e) => update('lastRoundDate', e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Key Investors</label>
        <textarea
          value={form.funding.investors}
          onChange={(e) => update('investors', e.target.value)}
          placeholder="List key investors, accelerators, or grant providers..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600 transition-colors"
        />
      </div>
    </div>
  );
}

function Step5({ form }) {
  const sector = SECTORS.find((s) => s.value === form.sector);
  const stage = STAGES.find((s) => s.value === form.stage);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Review & Submit</h2>
      <p className="text-sm text-gray-500">
        Please review your submission before sending. Our team will verify and publish your startup within 3–5 business days.
      </p>

      <div className="space-y-4">
        {[
          {
            title: 'Basic Info',
            items: [
              { label: 'Name', value: form.name },
              { label: 'Tagline', value: form.tagline },
              { label: 'Sector', value: sector?.label || form.sector },
              { label: 'Stage', value: stage?.label || form.stage },
              { label: 'Location', value: `${form.city}, Ethiopia` },
              { label: 'Website', value: form.website },
            ],
          },
          {
            title: 'Founders',
            items: form.founders.map((f, i) => ({
              label: `Founder ${i + 1}`,
              value: `${f.fullName} — ${f.title}`,
            })),
          },
          {
            title: 'Traction',
            items: [
              { label: 'MAU', value: form.traction.monthlyActiveUsers || '—' },
              { label: 'Revenue (ETB)', value: form.traction.revenue || '—' },
              { label: 'Customers', value: form.traction.customers || '—' },
            ],
          },
          {
            title: 'Funding',
            items: [
              { label: 'Total Raised', value: form.funding.totalRaised ? `$${Number(form.funding.totalRaised).toLocaleString()}` : '—' },
              { label: 'Last Round', value: form.funding.lastRoundType || '—' },
            ],
          },
        ].map((section) => (
          <div key={section.title} className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {section.title}
            </h3>
            <dl className="space-y-2">
              {section.items.map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <dt className="text-xs text-gray-400 w-28 flex-shrink-0">{label}</dt>
                  <dd className="text-sm text-gray-800 font-medium break-all">{value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center py-12">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: '#F0FDF4' }}
      >
        <CheckCircle2 size={40} style={{ color: '#1A6B3A' }} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
      <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
        Thank you for submitting your startup. Our team will review your application and get back to you within 3–5 business days.
      </p>
      <Link
        to="/startups"
        className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1A6B3A' }}
      >
        Browse Startups
      </Link>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function Submit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <SuccessScreen />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Startup</h1>
          <p className="text-sm text-gray-500">
            Get your startup listed on Ethiopia's premier startup intelligence platform.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* Step indicator */}
          <div className="mb-10">
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          </div>

          {/* Form steps */}
          <div className="min-h-[320px]">
            {currentStep === 1 && <Step1 form={form} setForm={setForm} />}
            {currentStep === 2 && <Step2 form={form} setForm={setForm} />}
            {currentStep === 3 && <Step3 form={form} setForm={setForm} />}
            {currentStep === 4 && <Step4 form={form} setForm={setForm} />}
            {currentStep === 5 && <Step5 form={form} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <div className="text-xs text-gray-400">
              Step {currentStep} of {STEPS.length}
            </div>
            {currentStep < STEPS.length ? (
              <Button variant="primary" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
