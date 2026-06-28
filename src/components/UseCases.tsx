import React from 'react';
import { Eye, Map, Package } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const cases = [
  {
    icon: Eye,
    title: 'Persistent Area Surveillance',
    body: 'Single-drone surveillance goes dark when the battery lands. A MADS multi-agent fleet maintains continuous coverage by rotating units in and out of the monitoring zone autonomously — no operator manually assigning patrol sectors. If a drone is lost, the remaining units redistribute to close the gap.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
  },
  {
    icon: Map,
    title: 'Coordinated Mapping and Photogrammetry',
    body: 'Mapping large areas with a single drone is slow. A MADS fleet divides the survey area, assigns non-overlapping flight corridors to each unit, and collects imagery in parallel. Coverage patterns interlock correctly, avoiding gaps and excessive overlap. Mission time scales with fleet size.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    icon: Package,
    title: 'Multi-Node Delivery Networks',
    body: 'Beyond-line-of-sight delivery with a single drone is range-limited. A MADS network extends effective range by staging units across waypoints — drones relay positioning data and hand off payloads without each unit making the full round trip. The network adapts. Individual drones do not need to.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
];

const UseCases: React.FC = () => {
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
    <section id="capabilities" className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4" {...fadeUp()}>
            Applications
          </motion.p>
          <motion.h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" {...fadeUp(0.05)}>
            What MADS Enables
          </motion.h2>
          <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.1)}>
            Multi-agent drone systems unlock capabilities that single-drone platforms cannot deliver.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                {...fadeUp(i * 0.1)}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${c.iconBg} mb-4`}>
                  <Icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
