import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Link as LinkIcon,
  Share2,
  MapPin,
  GraduationCap,
  Briefcase,
  Building2,
} from 'lucide-react';
import { FOUNDERS } from '../data/founders';
import { STARTUPS } from '../data/startups';
import Avatar from '../components/ui/Avatar';
import StartupCard from '../components/startup/StartupCard';

export default function FounderProfile() {
  const { slug } = useParams();
  const founder = FOUNDERS.find((f) => f.slug === slug);

  if (!founder) return <Navigate to="/startups" replace />;

  const founderStartups = STARTUPS.filter((s) =>
    founder.startups.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="relative pt-16 pb-24"
        style={{ background: 'linear-gradient(135deg, #0F1923 0%, #1A3A2A 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link
            to="/startups"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Avatar src={founder.photo} name={founder.fullName} size="2xl" />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap mb-1">
                <h1 className="text-3xl font-bold text-white">{founder.fullName}</h1>
                {founder.isVerified && (
                  <CheckCircle2 size={22} style={{ color: '#4ADE80' }} />
                )}
              </div>
              <p className="text-white/70 text-base mb-3">{founder.title}</p>
              <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap text-sm text-white/50">
                {founder.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {founder.location.city}, Ethiopia
                  </span>
                )}
                {founderStartups.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Building2 size={13} /> {founderStartups.length} startup{founderStartups.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
                {founder.socialLinks?.linkedin && (
                  <a
                    href={founder.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    title="LinkedIn"
                  >
                    <LinkIcon size={16} />
                  </a>
                )}
                {founder.socialLinks?.twitter && (
                  <a
                    href={founder.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    title="X / Twitter"
                  >
                    <Share2 size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{founder.bio}</p>
            </div>

            {/* Startups */}
            {founderStartups.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Building2 size={15} style={{ color: '#1A6B3A' }} /> Startups
                </h2>
                <div className="space-y-4">
                  {founderStartups.map((s) => (
                    <StartupCard key={s.id} startup={s} view="list" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            {founder.education?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                  <GraduationCap size={14} style={{ color: '#1A6B3A' }} /> Education
                </h3>
                <div className="space-y-3">
                  {founder.education.map((e, i) => (
                    <div key={i} className="border-l-2 border-green-100 pl-3">
                      <div className="text-sm font-medium text-gray-800">{e.degree}</div>
                      <div className="text-xs text-gray-500">{e.institution}</div>
                      <div className="text-xs text-gray-400">{e.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {founder.experience?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                  <Briefcase size={14} style={{ color: '#1A6B3A' }} /> Experience
                </h3>
                <div className="space-y-3">
                  {founder.experience.map((e, i) => (
                    <div key={i} className="border-l-2 border-yellow-100 pl-3">
                      <div className="text-sm font-medium text-gray-800">{e.role}</div>
                      <div className="text-xs text-gray-500">{e.company}</div>
                      <div className="text-xs text-gray-400">{e.years}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
