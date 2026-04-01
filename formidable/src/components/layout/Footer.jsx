import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

const LINKS = {
  Platform: [
    { label: 'Startup Directory', to: '/startups' },
    { label: 'Submit a Startup', to: '/submit' },
    { label: 'For Investors', to: '/startups' },
    { label: 'For Founders', to: '/submit' },
  ],
  Resources: [
    { label: 'About Formidable', to: '/' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F1923', color: '#CBD5E1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield size={26} style={{ color: '#1A6B3A' }} />
              <span className="text-xl font-bold text-white">Formidable</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Ethiopia's most comprehensive startup intelligence platform — connecting founders, investors, and ecosystem builders.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:hello@formidable.et"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://formidable.et"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2024 Formidable. Ethiopia's Startup Intelligence Platform
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Made with</span>
            <span style={{ color: '#1A6B3A' }}>♥</span>
            <span>in Addis Ababa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
