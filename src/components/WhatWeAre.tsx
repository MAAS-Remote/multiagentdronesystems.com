import React from 'react';
import { Check, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const weAre = [
  'A nature-inspired drone production company — bio-inspired airframes, multi-agent autonomy software, and coordinated fleet behaviour modelled on avian biology.',
  'A research-rooted company. MADS was incorporated out of graduate-level work at McGill University. The engineering methodology comes from the lab, not from a pitch deck.',
  'Building for mission-critical environments: surveillance, mapping, and delivery applications where fleet performance matters more than any individual unit.',
];

const weAreNot = [
  'A drone-as-a-service company. We sell systems, not subscriptions.',
  'A consumer drone brand. Nothing we build is designed for recreational use. Every product is engineered for a specific operational profile.',
  'A one-size-fits-all vendor. The bio-inspired approach means customisation is the methodology. A drone built to soar like a broad-winged hawk is a different aircraft from one built to sprint like a peregrine.',
];

const WhatWeAre: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="mission" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 22 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: '-40px' },
                transition: { duration: 0.5, ease: 'easeOut' },
              })}
        >
          <p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Position</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">What We Are. What We Are Not.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* We ARE */}
          <motion.div
            className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-100 rounded-2xl p-8"
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, x: -40 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: '-40px' },
                  transition: { duration: 0.55, ease: 'easeOut' },
                })}
          >
            <h3 className="text-xl font-bold text-sky-700 mb-6">We are</h3>
            <div className="space-y-5">
              {weAre.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* We ARE NOT */}
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-slate-100 border-2 border-gray-200 rounded-2xl p-8"
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, x: 40 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: '-40px' },
                  transition: { duration: 0.55, ease: 'easeOut' },
                })}
          >
            <h3 className="text-xl font-bold text-gray-500 mb-6">We are not</h3>
            <div className="space-y-5">
              {weAreNot.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;
