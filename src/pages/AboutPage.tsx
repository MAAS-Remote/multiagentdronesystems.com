import React from 'react';
import { ArrowLeft, Phone, Mail, Brain, Zap, Settings, Feather, Network, Wrench, BookOpen } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema, SITE_URL } from '../lib/schemas';

// Minimalist bird-in-flight silhouette (W-shape reads instantly as a flying bird)
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

const thesisCards = [
  {
    title: 'Formation flight and energy efficiency',
    body: 'We model V-formation flight dynamics to reduce aerodynamic drag in multi-drone operations. When one drone leads and others trail in an offset formation, the trailing agents can reduce thrust requirements and extend mission endurance. The math behind this is well established in ornithology — MADS applies it to mission planning software.',
  },
  {
    title: 'Flocking and distributed consensus',
    body: 'Researchers studying bird flocks identified three simple rules: avoid collision, align with neighbours, stay cohesive. That set of local rules produces globally complex, adaptive behaviour with no central coordinator. Our multi-agent autonomy stack models these principles, enabling drone fleets to respond to environmental changes without a ground operator issuing individual commands to each aircraft.',
  },
  {
    title: 'Airframe morphology',
    body: "Different birds have different wing shapes for different performance envelopes. Broad, slotted wings for slow soaring. Narrow, swept wings for speed. Short, rounded wings for agility in tight spaces. MADS customises airframes on a per-product basis, drawing from avian morphology to match the drone's shape to its mission profile.",
  },
  {
    title: 'Perching and landing biomechanics',
    body: 'Birds land by dramatically increasing angle of attack just before contact — bleeding speed and using drag, not thrust, to decelerate. We study perching mechanics to develop landing modes that reduce actuator wear and improve stability on non-flat surfaces.',
  },
];

const departments = [
  {
    name: 'Computer Engineering',
    role: 'The Brain',
    icon: Brain,
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
    border: 'border-2 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    accent: 'text-amber-600',
    body1: 'The Computer Engineering department owns intelligence: autonomy algorithms, multi-agent coordination software, onboard flight control, sensor fusion, and the communication stack that allows drones to act as a coherent fleet rather than a collection of individuals. If the flock knows where it is going and why, that is Computer Engineering.',
    body2: 'This department is where the bio-inspired thesis becomes computation. Flocking algorithms that implement separation, alignment, and cohesion. Formation controllers that model aerodynamic interdependence. Mission planners that assign roles across agents based on energy state, sensor coverage, and proximity. The brain is always on, always adapting, always thinking several steps ahead.',
    dot: 'bg-amber-400',
  },
  {
    name: 'Electrical Engineering',
    role: 'The Nervous System',
    icon: Zap,
    bg: 'bg-gradient-to-br from-sky-50 to-blue-100',
    border: 'border-2 border-sky-200 hover:border-sky-400',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    accent: 'text-sky-600',
    body1: 'The Electrical Engineering department connects everything. Power distribution, motor controllers, embedded sensor arrays, communication hardware, and the signal pathways that let the brain command the body in real time. Without a reliable nervous system, the smartest algorithms are theoretical.',
    body2: 'Electrical also handles the problem of endurance: how to store, distribute, and prioritise energy across a mission so the drone can stay aloft as long as the task demands. Birds manage metabolic energy with remarkable precision — MADS manages electrical energy with the same intent.',
    dot: 'bg-sky-400',
  },
  {
    name: 'Mechanical Engineering',
    role: 'The Body',
    icon: Settings,
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-100',
    border: 'border-2 border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    accent: 'text-emerald-600',
    body1: 'The Mechanical Engineering department gives the drone its form. Airframe geometry, materials selection, propulsion mounting, structural load analysis, and the physical interface between the drone and its environment. This is where the avian morphology principles become real objects that fly.',
    body2: "Mechanical owns the most visible part of the MADS product: the shape of the drone itself. The curvature of a wing. The span-to-chord ratio. The placement of a payload bay. These are not aesthetic decisions — they are aerodynamic ones. Every curve has a reason, and that reason usually traces back to a bird.",
    dot: 'bg-emerald-400',
  },
];

const timelineItems = [
  { year: '2024', label: 'Founded', detail: 'MADS incorporated, spun out of McGill University research' },
  { year: 'Today', label: '4–5 Engineers', detail: 'Students and expert engineers building the foundation' },
  { year: 'Now', label: '2 Co-Founders Joining', detail: 'Formalizing Mechanical and Electrical leadership' },
  { year: 'Ahead', label: 'Product Line Expanding', detail: 'Growing the fleet as research matures and manufacturing scales' },
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0): object =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About MADS — Nature-Inspired Drone Systems | Multi-Agent Drone Systems</title>
        <meta name="description" content="MADS Inc builds bio-inspired autonomous drone systems in Ottawa, Canada. Founded from McGill University research, we translate avian biology — flocking, formation flight, and airframe morphology — into drone hardware and algorithms." />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'About', url: `${SITE_URL}/about` },
          ]))}
        </script>
      </Helmet>

      {!shouldReduceMotion && (
        <style>{`
          @keyframes birdFly {
            0%   { transform: translateX(-120px); }
            100% { transform: translateX(110vw); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="birdFly"] { animation: none !important; }
          }
        `}</style>
      )}

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        {!shouldReduceMotion && (
          <>
            <FlyingBird delay={0}  top="18%" scale={1.1} />
            <FlyingBird delay={5}  top="38%" scale={0.75} />
            <FlyingBird delay={10} top="60%" scale={1.0} />
            <FlyingBird delay={15} top="75%" scale={0.6} />
            <FlyingBird delay={19} top="28%" scale={0.85} />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(251,146,60,0.08)_0%,transparent_65%)]" />

        <div className="relative z-10 text-center px-6 sm:px-12 max-w-5xl mx-auto pt-24 pb-32">
          <motion.p
            className="text-orange-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } })}
          >
            Ottawa, Ontario, Canada
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-10"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.15 } })}
          >
            Multi-Agent Drone Systems Inc.
          </motion.h1>

          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFD700] italic leading-snug"
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.35 } })}
          >
            Nature built the blueprint.
            <br />
            We build the drones.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">

        {/* ── Origin ── */}
        <section className="pt-16 mb-24 max-w-3xl mx-auto">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-8" {...fadeUp()}>
            From the Lab to the Launchpad
          </motion.h2>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-5" {...fadeUp(0.05)}>
            Multi-Agent Drone Systems — MADS Inc. — was born out of research, and it still thinks like a researcher.
          </motion.p>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-5" {...fadeUp(0.1)}>
            Our founder completed both undergraduate and graduate-level research at McGill University, studying how autonomous agents coordinate, communicate, and move together through space. The feedback that mattered most didn't come from a pitch deck or a funding round.
          </motion.p>

          {/* Pull-quote */}
          <motion.blockquote className="border-l-4 border-orange-400 pl-6 my-8 py-1" {...fadeUp(0.15)}>
            <p className="text-xl sm:text-2xl italic text-gray-800 leading-relaxed">
              "A McGill professor, at two separate stages of the research, said it was worth pursuing further. That was enough. MADS was incorporated."
            </p>
          </motion.blockquote>

          <motion.p className="text-lg text-gray-700 leading-relaxed mb-5" {...fadeUp(0.2)}>
            Since then, the team has grown from a single founder to a small group of students and expert engineers — people who crossed paths because they were all asking the same question: what does it look like when machines move the way living things move? Two co-founders are now joining to formalize the mechanical and electrical pillars of the company, cementing what has always been a three-part foundation.
          </motion.p>
          <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.25)}>
            We are based in Ottawa, Ontario — a city with a deep tradition in defence, aerospace, and government-adjacent technology. It is an appropriate home for a company building systems that operate beyond the line of sight, beyond a single pilot, and beyond what any one drone can do alone.
          </motion.p>
        </section>

        {/* ── Bird thesis ── */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto mb-12">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-6" {...fadeUp()}>
              The Thesis: Nature Is the Best Systems Engineer
            </motion.h2>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.05)}>
              Every MADS drone is inspired by a bird. That is not metaphor. It is the design methodology.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.1)}>
              Birds solved multi-agent autonomous flight millions of years before the aerospace industry arrived. A murmuration of starlings — thousands of individuals turning in unison without a single leader — is one of the most efficient distributed consensus systems observed in nature. Canada geese flying in V-formation reduce total energy expenditure across the flock by exploiting the upwash created by the bird ahead. Peregrines modulate their wing sweep angle mid-dive to maintain control authority at speeds exceeding 300 km/h. Swifts sleep while flying, sustaining continuous airborne operations for months.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.15)}>
              None of these capabilities were engineered from scratch. They were evolved over geological timescales, field-tested across billions of individuals, and refined until failure was essentially impossible at the species level.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.2)}>
              MADS takes that library of solutions and translates it into hardware and algorithms.
            </motion.p>
          </div>

          {/* 2×2 glass cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {thesisCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(i * 0.08)}
                whileHover={shouldReduceMotion ? {} : { rotateX: 2, rotateY: -2, scale: 1.015 }}
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                className="relative bg-white/60 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <BirdSvg className="absolute top-4 right-4 w-12 h-6 text-orange-100" />
                <h3 className="text-base font-bold text-gray-900 mb-3 pr-14 leading-snug">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p className="text-lg text-gray-700 leading-relaxed mt-10 max-w-3xl mx-auto" {...fadeUp()}>
            The result is a product line where every drone has a bird at its core: a species whose evolutionary pressures match the mission requirements we are trying to meet.
          </motion.p>
        </section>

        {/* ── Departments ── */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto mb-10">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" {...fadeUp()}>
              Three Departments. One Organism.
            </motion.h2>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-3" {...fadeUp(0.05)}>
              A bird needs a brain, a nervous system, and a body. So does every MADS drone.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.1)}>
              We are organised into three equally weighted engineering departments. They are not a hierarchy. They are an anatomy.
            </motion.p>
          </div>

          {/* Anatomy connector — desktop only */}
          <div className="hidden md:flex items-center mb-5 relative px-8">
            <div className="absolute left-[calc(16.67%+0.5rem)] right-[calc(16.67%+0.5rem)] top-1/2 h-px bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300" />
            {departments.map((dept) => (
              <div key={dept.name} className="flex-1 flex justify-center">
                <div className={`relative z-10 w-3 h-3 rounded-full ${dept.dot}`} />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {departments.map((dept, i) => {
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
                  <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${dept.accent}`}>{dept.role}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{dept.name}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{dept.body1}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{dept.body2}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="mb-24">
          <div className="max-w-3xl mx-auto mb-10">
            <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" {...fadeUp()}>
              Where We Are Headed
            </motion.h2>
            <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.05)}>
              MADS is a young company and we are deliberate about saying so.
            </motion.p>
          </div>

          {/* Desktop: horizontal timeline | Mobile: vertical timeline */}
          <div className="relative mb-10">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-[7px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-200 via-amber-400 to-orange-200" />
            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-[7px] top-0 bottom-4 w-px bg-orange-200" />

            <div className="grid md:grid-cols-4 gap-6 md:gap-4">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  {...fadeUp(i * 0.1)}
                  className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 pb-8 md:pb-0"
                >
                  <div className="flex-shrink-0 w-[15px] h-[15px] rounded-full bg-orange-400 ring-4 ring-orange-50 relative z-10 md:mb-4" />
                  <div className="md:text-center">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase mb-0.5">{item.year}</p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp()}>
              What we are not doing is pretending to be larger than we are. The nature-inspired approach requires patience. Birds did not evolve flight in a single generation, and MADS will not manufacture a mature product line overnight. We are building the foundation first — the methods, the team, the tools — and growing the product around it.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeUp(0.05)}>
              If you are a customer, that means you are buying from a company that is rigorous and growing. If you are an engineer, it means there is real ground-floor work to be done here.
            </motion.p>
          </div>
        </section>

        {/* ── Get in Touch ── */}
        <section>
          <motion.div {...fadeUp()} className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-400 mb-8">We are based in Ottawa, Ontario.</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:+16134132941"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-2xl px-6 py-4 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="font-semibold text-white">+1-613-413-2941</p>
                </div>
              </a>

              <a
                href="mailto:info@multiagentdronesystems.com"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-2xl px-6 py-4 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="font-semibold text-white">info@multiagentdronesystems.com</p>
                </div>
              </a>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-2xl">
              Whether you are interested in our products, want to discuss a custom drone requirement, or are curious about working with us, we want to hear from you.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
