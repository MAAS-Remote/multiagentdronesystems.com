import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MultiAgent: React.FC = () => {
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
    <section id="multi-agent" className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4" {...fadeUp()}>
          The Technology
        </motion.p>
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight" {...fadeUp(0.05)}>
          Multi-Agent Means More Than Marketing
        </motion.h2>

        <motion.p className="text-lg text-gray-300 leading-relaxed mb-5" {...fadeUp(0.1)}>
          The phrase "multi-agent" is common in drone marketing. Most of the time it means: multiple drones, one operator, one script. That is not what MADS means.
        </motion.p>
        <motion.p className="text-lg text-gray-300 leading-relaxed mb-5" {...fadeUp(0.15)}>
          A true multi-agent system is one in which each agent perceives its local environment, makes autonomous decisions based on that perception, and coordinates with other agents without relying on a centralised controller to dictate every action. The intelligence is distributed. The coordination is emergent. The system adapts to unexpected conditions — a drone failure, a wind shift, an obstacle — without a human operator issuing corrective commands to each unit individually.
        </motion.p>
        <motion.p className="text-lg text-gray-300 leading-relaxed mb-5" {...fadeUp(0.2)}>
          This is how birds fly. A flock does not have a leader. Each bird watches its nearest neighbours, applies simple local rules, and the result — at the scale of a thousand individuals — is coordinated, adaptive, and resilient to disruption.
        </motion.p>
        <motion.p className="text-lg text-gray-300 leading-relaxed mb-14" {...fadeUp(0.25)}>
          MADS builds multi-agent drone systems in the rigorous sense. Each drone maintains local state awareness, participates in distributed consensus for formation and role assignment, and can reassign responsibilities across the fleet if an individual unit is lost or degraded.
        </motion.p>

        {/* Pull-quote */}
        <motion.div
          className="border-l-4 border-[#FFD700] pl-8 py-2"
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
              })}
        >
          <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed italic mb-4">
            The difference between multi-agent and multi-drone is the difference between a flock and a fleet of individual aircraft that happen to share airspace.
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#FFD700]">We build the flock.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MultiAgent;
