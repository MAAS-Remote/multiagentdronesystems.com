import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Clock, ArrowLeft, X, Brain, Zap, Settings, Feather, Network, Wrench, BookOpen, Mail } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema, SITE_URL } from '../lib/schemas';
import { usePositions } from '../hooks/useSupabaseData';
import { useAuth } from '../contexts/AuthContext';
import ApplicationModal from '../components/ApplicationModal';
import AuthModal from '../components/AuthModal';

interface Position {
  id: string;
  title: string;
  location_type: string;
  employment_type: string;
  description: string;
  image_url?: string;
  open: boolean;
}

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: Position | null;
  onApply: () => void;
}

const JobDescriptionModal: React.FC<JobDescriptionModalProps> = ({
  isOpen,
  onClose,
  position,
  onApply
}) => {
  if (!isOpen || !position) return null;

  const formatDescription = (text: string) => {
    const lines = text.split('\n');
    const formattedLines: JSX.Element[] = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('-')) {
        const bulletText = line.trim().substring(1).trim();
        const processedText = bulletText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        formattedLines.push(
          <li key={index} className="mb-2">
            <span dangerouslySetInnerHTML={{ __html: processedText }} />
          </li>
        );
      } else if (line.trim()) {
        const processedText = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        formattedLines.push(
          <p key={index} className="mb-4">
            <span dangerouslySetInnerHTML={{ __html: processedText }} />
          </p>
        );
      }
    });

    return formattedLines;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 relative rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">{position.title}</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {position.location_type}
                </div>
                <div className="flex items-center text-white/70 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {position.employment_type}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {position.image_url && (
              <div className="mb-6">
                <img
                  src={position.image_url}
                  alt={`${position.title} role at MADS — Multi-Agent Drone Systems`}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="prose prose-gray max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed">
                {formatDescription(position.description || '').map((element, index) => {
                  if (element.type === 'li') {
                    const listItems = [];
                    let currentIndex = index;
                    while (
                      currentIndex < formatDescription(position.description || '').length &&
                      formatDescription(position.description || '')[currentIndex]?.type === 'li'
                    ) {
                      listItems.push(formatDescription(position.description || '')[currentIndex]);
                      currentIndex++;
                    }
                    if (index === 0 || formatDescription(position.description || '')[index - 1]?.type !== 'li') {
                      return (
                        <ul key={`list-${index}`} className="list-disc list-inside mb-4 space-y-2">
                          {listItems}
                        </ul>
                      );
                    }
                    return null;
                  }
                  return element;
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onApply}
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Apply for this Position
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ── Page-level data ──────────────────────────────────────────────

const BirdSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M0 22 Q25 2 50 16 Q75 2 100 22" />
  </svg>
);

const FlyingBird = ({ delay, top, scale = 1 }: { delay: number; top: string; scale?: number }) => (
  <div
    className="absolute pointer-events-none text-white/10"
    style={{ top, width: `${72 * scale}px`, animation: `birdFly 22s linear infinite`, animationDelay: `${delay}s` }}
  >
    <BirdSvg />
  </div>
);

const thrivesCards = [
  {
    icon: Feather,
    title: 'Bio-inspired thinking',
    body: 'You find yourself reading about murmuration dynamics or avian aerodynamics for fun. You think about how evolution solved engineering problems. You can translate biological principles into design decisions.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    icon: Network,
    title: 'Multi-agent autonomy',
    body: 'You care about distributed systems, emergent behaviour, swarm intelligence, or decentralized coordination. You want to work on problems where the interesting part is what happens between agents, not inside a single one.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    icon: Wrench,
    title: 'Hands-on engineering',
    body: 'You build things. You want to see your code fly, your circuit carry current, your airframe lift off. You are not satisfied with simulation as a final answer.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    icon: BookOpen,
    title: 'Research-to-product bridging',
    body: 'You have a background in academic research and you are ready to move from papers to hardware. You know how to ask rigorous questions and you also know how to ship.',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

const careersDepts = [
  {
    name: 'Computer Engineering',
    icon: Brain,
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
    border: 'border-2 border-amber-100 hover:border-amber-300',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    accent: 'text-amber-600',
    blurb: 'We want to see autonomy stack experience — flight controllers, multi-agent planners, sensor fusion, embedded software. A background in robotics, control systems, or swarm intelligence is highly relevant. We are especially interested in people who understand the line between a system that works in simulation and a system that works in the field.',
    roles: ['Autonomy Engineer', 'Multi-Agent Systems Researcher', 'Flight Software Engineer'],
  },
  {
    name: 'Electrical Engineering',
    icon: Zap,
    bg: 'bg-gradient-to-br from-sky-50 to-blue-50',
    border: 'border-2 border-sky-100 hover:border-sky-300',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    accent: 'text-sky-600',
    blurb: 'Power systems, embedded hardware, motor controllers, communication protocols, PCB design. If you have worked on power-constrained systems where every milliamp-hour matters, that experience is directly useful here. Experience with avionics or drone hardware is a strong signal.',
    roles: ['Power Systems Engineer', 'Embedded Hardware Engineer', 'Avionics Integration Specialist'],
  },
  {
    name: 'Mechanical Engineering',
    icon: Settings,
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    border: 'border-2 border-emerald-100 hover:border-emerald-300',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    accent: 'text-emerald-600',
    blurb: 'Airframe design, structural analysis, composites, propulsion systems, aerodynamics. We are particularly interested in people who understand the relationship between wing geometry and flight performance — not just in theory, but in manufactured parts. Experience with UAV or aerospace-adjacent manufacturing is valuable.',
    roles: ['Airframe Design Engineer', 'Propulsion Systems Engineer', 'Structures & Composites Engineer'],
  },
];

// ── Page component ───────────────────────────────────────────────

const CareersPage: React.FC = () => {
  const { data: positions, isLoading, error } = usePositions();
  const navigate = useNavigate();
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const handleBackToHome = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const careersSection = document.getElementById('careers');
      if (careersSection) {
        careersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewJobDescription = (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    if (!position) return;
    setSelectedPosition(position);
    setShowJobDescriptionModal(true);
  };

  const handleApplyFromModal = () => {
    if (!user) {
      setShowJobDescriptionModal(false);
      setShowAuthModal(true);
      return;
    }
    setShowJobDescriptionModal(false);
    setShowApplicationModal(true);
  };

  const fadeUp = (delay = 0): object =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div className="text-gray-900 text-xl">Loading positions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Careers at MADS — Join Our Team | Multi-Agent Drone Systems</title>
        <meta name="description" content="MADS Inc is small, growing, and selective. We build nature-inspired autonomous drone systems in Ottawa, Canada. No specific roles posted today — but the right person always gets a conversation." />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Careers', url: `${SITE_URL}/careers` },
          ]))}
        </script>
      </Helmet>

      {!shouldReduceMotion && (
        <style>{`
          @keyframes birdFly {
            0%   { transform: translateX(-120px); }
            100% { transform: translateX(110vw); }
          }
          @keyframes ctaGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(251, 146, 60, 0); }
            50%       { box-shadow: 0 0 32px 6px rgba(251, 146, 60, 0.18), 0 0 64px 12px rgba(251, 146, 60, 0.06); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="birdFly"], [style*="ctaGlow"] { animation: none !important; }
          }
        `}</style>
      )}

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleBackToHome}
          className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        {!shouldReduceMotion && (
          <>
            <FlyingBird delay={0}  top="20%" scale={1.0} />
            <FlyingBird delay={5}  top="42%" scale={0.7} />
            <FlyingBird delay={10} top="62%" scale={0.9} />
            <FlyingBird delay={16} top="30%" scale={0.8} />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(251,146,60,0.07)_0%,transparent_65%)]" />

        <div className="relative z-10 text-center px-6 sm:px-12 max-w-4xl mx-auto pt-24 pb-28">
          <motion.p
            className="text-orange-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } })}
          >
            Ottawa, Ontario, Canada
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.15 } })}
          >
            Work at MADS
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 italic leading-snug"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.35 } })}
          >
            We hire slowly and deliberately — because the work demands it.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">

        {/* ── Intro ── */}
        <section className="pt-16 mb-20 max-w-3xl mx-auto">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-6" {...fadeUp()}>
            We're Small, We're Growing, and We're Selective
          </motion.h2>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.05)}>
            Multi-Agent Drone Systems is not hiring for the sake of scale. We hire when the right person is in the room and we know it.
          </motion.p>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.1)}>
            We are a small team of engineers and researchers based in Ottawa, Ontario, building nature-inspired autonomous drone systems. The work is technical, interdisciplinary, and genuinely open-ended. We do not have a playbook — we are writing it.
          </motion.p>
          <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.15)}>
            No specific roles are posted today. That is intentional. We would rather meet the right person and create a role around them than fill a box on an org chart with someone who does not belong here.
          </motion.p>
        </section>

        {/* ── Who Thrives ── */}
        <section className="mb-20">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" {...fadeUp()}>
            Who Thrives at MADS
          </motion.h2>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl" {...fadeUp(0.05)}>
            You do not need to be the best at everything. But you should have a real obsession in at least one of these directions:
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-5">
            {thrivesCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp(i * 0.08)}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl ${card.iconBg} mb-4`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Three Departments ── */}
        <section className="mb-20">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-10" {...fadeUp()}>
            The Three Departments
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {careersDepts.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.name}
                  {...fadeUp(i * 0.1)}
                  whileHover={shouldReduceMotion ? {} : { y: -5 }}
                  className={`rounded-2xl ${dept.border} ${dept.bg} p-7 transition-all duration-300 shadow-sm hover:shadow-lg`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${dept.iconBg} mb-4`}>
                    <Icon className={`w-6 h-6 ${dept.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">{dept.blurb}</p>

                  {/* Future roles */}
                  <div className="border-t border-gray-200/70 pt-5">
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${dept.accent}`}>Future Roles</p>
                    <div className="space-y-2">
                      {dept.roles.map((role) => (
                        <div key={role} className="flex items-start gap-2">
                          <span className="text-sm font-medium text-gray-800 flex-1">{role}</span>
                          <span className="flex-shrink-0 text-[9px] font-bold tracking-wide text-gray-400 bg-gray-100 rounded px-1.5 py-0.5 uppercase leading-tight whitespace-nowrap">
                            Closed — apply speculatively
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Open Positions (when any exist) ── */}
        {positions.length > 0 && (
          <section className="mb-16">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-6" {...fadeUp()}>
              Open Positions
            </motion.h2>
            <div className="space-y-4">
              {positions.map((position: Position, index: number) => (
                <motion.div
                  key={position.id}
                  {...fadeUp(index * 0.08)}
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {position.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                        {(position as any).caption || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          <MapPin className="w-4 h-4 mr-2" />
                          {position.location_type}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          <Clock className="w-4 h-4 mr-2" />
                          {position.employment_type}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleViewJobDescription(position.id)}
                        className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        View Job Description
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── No Openings notice (small, when no positions) ── */}
        {positions.length === 0 && (
          <motion.div
            {...fadeUp()}
            className="mb-10 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 flex items-start gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-0.5">No Openings Posted Today</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are not currently hiring for any specific listed role. We post openings when they exist. Today, they do not — but the right person always gets a conversation.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Speculative Applications CTA ── */}
        <motion.div
          {...fadeUp()}
          className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 p-10 text-white relative overflow-hidden"
          style={shouldReduceMotion ? {} : { animation: 'ctaGlow 3.5s ease-in-out infinite' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(251,146,60,0.08)_0%,transparent_65%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">Speculative Applications</h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
              If you believe you belong here, tell us why.
            </p>

            <div className="bg-white/10 border border-white/10 rounded-xl px-5 py-4 mb-8 inline-block">
              <p className="text-xs text-gray-400 mb-1">Send to</p>
              <p className="font-semibold text-white mb-2">info@multiagentdronesystems.com</p>
              <p className="text-xs text-gray-400 mb-1">Subject line</p>
              <p className="font-mono text-orange-300 text-sm">"Speculative Application"</p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">
              Include which department you are interested in, what you have built, and what drew you to bio-inspired drone systems specifically. We read every message. We reply when there is a fit.
            </p>

            <a
              href="mailto:info@multiagentdronesystems.com?subject=Speculative%20Application"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              Send Speculative Application
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modals — unchanged */}
      <JobDescriptionModal
        isOpen={showJobDescriptionModal}
        onClose={() => {
          setShowJobDescriptionModal(false);
          setSelectedPosition(null);
        }}
        position={selectedPosition}
        onApply={handleApplyFromModal}
      />

      {selectedPosition && (
        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedPosition(null);
          }}
          positionId={selectedPosition.id}
          positionTitle={selectedPosition.title}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signin"
      />
    </div>
  );
};

export default CareersPage;
