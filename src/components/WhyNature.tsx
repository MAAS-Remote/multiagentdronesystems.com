import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BirdSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M0 22 Q25 2 50 16 Q75 2 100 22" />
  </svg>
);

const principles = [
  {
    title: 'Formation flight and energy efficiency',
    body: 'When drones fly in offset formations, trailing aircraft benefit from the upwash of the aircraft ahead. MADS models these dynamics in our multi-drone mission planners to extend fleet endurance without increasing battery size.',
  },
  {
    title: 'Flocking and distributed consensus',
    body: "Researchers studying bird flocks identified three simple rules — avoid collision, align with neighbours, stay cohesive — that produce globally adaptive behaviour with no central coordinator. Our autonomy stack implements these principles so the fleet responds without waiting for a ground operator.",
  },
  {
    title: 'Airframe morphology',
    body: "Different bird species evolved different wing geometries for different flight regimes: broad and slotted for soaring, swept and narrow for speed. MADS customises airframe shapes to match the drone's mission profile, using avian morphology as the starting point.",
  },
  {
    title: 'Perching and precision landing',
    body: 'Birds arrest their descent by dramatically increasing angle of attack at the last moment — trading speed for drag. We study this to build landing modes that reduce actuator wear and improve stability on imperfect surfaces.',
  },
];

const WhyNature: React.FC = () => {
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
    <section id="why-nature" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4" {...fadeUp()}>
            Why Nature?
          </motion.p>
          <motion.h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" {...fadeUp(0.05)}>
            Nature Is the Best Systems Engineer
          </motion.h2>
          <motion.p className="text-lg text-gray-600 leading-relaxed mb-4" {...fadeUp(0.1)}>
            Aviation has spent a century solving problems that birds solved in millennia. A Canada goose flying in V-formation uses less energy than one flying alone — not through propulsion improvements, but through aerodynamic cooperation. A murmuration of starlings coordinates thousands of individuals without a central controller.
          </motion.p>
          <motion.p className="text-lg text-gray-600 leading-relaxed" {...fadeUp(0.15)}>
            These are not metaphors. They are engineering specifications. MADS reads avian biology as a design document and builds drones accordingly.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {principles.map((card, i) => (
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

        <motion.p className="text-center text-gray-400 text-sm italic" {...fadeUp()}>
          Nature spent millions of years refining these solutions. We apply them.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyNature;
