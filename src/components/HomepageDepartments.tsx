import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Settings, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const depts = [
  {
    name: 'Computer Engineering',
    role: 'The Brain',
    icon: Brain,
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
    border: 'border-2 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    accent: 'text-amber-600',
    dot: 'bg-amber-400',
    body: 'Autonomy algorithms, multi-agent coordination, onboard flight control, sensor fusion, and the communication stack that lets a fleet act as one organism.',
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
    dot: 'bg-sky-400',
    body: 'Power distribution, motor controllers, embedded sensor arrays, and the signal pathways that carry intent from brain to body in real time. Electrical also owns endurance.',
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
    dot: 'bg-emerald-400',
    body: 'Airframe geometry, materials selection, propulsion mounting, structural analysis, and the avian morphology that translates into manufactured hardware that actually flies.',
  },
];

const HomepageDepartments: React.FC = () => {
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
    <section id="departments" className="bg-gray-50 py-24 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4" {...fadeUp()}>
            Our Structure
          </motion.p>
          <motion.h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" {...fadeUp(0.05)}>
            Built Like the Systems We Study
          </motion.h2>
          <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
            A bird needs a brain, a nervous system, and a body. So does every MADS drone. Our engineering mirrors that anatomy — not by coincidence, but by design.
          </motion.p>
        </div>

        {/* Anatomy connector — desktop only */}
        <div className="hidden md:flex items-center mb-5 relative px-8">
          <div className="absolute left-[calc(16.67%+0.5rem)] right-[calc(16.67%+0.5rem)] top-1/2 h-px bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300" />
          {depts.map((d) => (
            <div key={d.name} className="flex-1 flex justify-center">
              <div className={`relative z-10 w-3 h-3 rounded-full ${d.dot}`} />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {depts.map((dept, i) => {
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
                <h3 className="text-lg font-bold text-gray-900 mb-3">{dept.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{dept.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="text-center" {...fadeUp()}>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors duration-200 text-sm"
          >
            Read the full story on our About page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageDepartments;
