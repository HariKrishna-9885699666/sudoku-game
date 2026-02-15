import React, { useState } from 'react';
import { User, X, Github, Linkedin, Globe, Mail, Phone, MapPin, GraduationCap, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/HariKrishna-9885699666', text: 'HariKrishna-9885699666' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/anemharikrishna', text: 'anemharikrishna' },
  { icon: Globe, label: 'Blog', url: 'https://hashnode.com/@HariKrishna-9885699666', text: 'Hashnode' },
  { icon: ExternalLink, label: 'Portfolio', url: 'https://harikrishna.is-a-good.dev', text: 'https://harikrishna.is-a-good.dev' },
];

export default function ProfileCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
        aria-label="Open profile card"
      >
        <User size={22} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary px-6 py-5 flex items-center gap-4 relative">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <User className="text-primary-foreground" size={28} />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold text-primary-foreground truncate">Hari Krishna Anem</h2>
                <p className="font-body text-sm text-primary-foreground/70 flex items-center gap-1.5">
                  <GraduationCap size={14} /> B.Tech (CSIT)
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contact info */}
            <div className="px-6 py-4 space-y-3 border-b border-border">
              <a href="mailto:anemharikrishna@gmail.com" className="flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors">
                <Mail size={16} className="text-muted-foreground shrink-0" />
                anemharikrishna@gmail.com
              </a>
              <a href="tel:+919885699666" className="flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors">
                <Phone size={16} className="text-muted-foreground shrink-0" />
                +91 9885699666
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                <MapPin size={16} className="shrink-0" />
                Hyderabad, India
              </div>
            </div>

            {/* Social links */}
            <div className="px-6 py-4 space-y-2.5">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors group"
                >
                  <link.icon size={16} className="text-muted-foreground group-hover:text-accent shrink-0 transition-colors" />
                  <span className="truncate">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
