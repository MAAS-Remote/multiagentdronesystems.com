import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const Ottawa: React.FC = () => {
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
    <section id="location" className="bg-white py-24 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <motion.p className="text-[#E8A87C] text-sm font-semibold tracking-[0.2em] uppercase mb-4" {...fadeUp()}>
              Where We Are
            </motion.p>
            <motion.h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" {...fadeUp(0.05)}>
              Ottawa, Ontario, Canada
            </motion.h2>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.1)}>
              MADS is headquartered in Ottawa — Canada's capital and a city with a long history in defence technology, aerospace, and government-contracted engineering.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-4" {...fadeUp(0.15)}>
              We are a Canadian incorporated company building hardware in a regulatory environment that takes airspace seriously. The Ottawa engineering ecosystem — universities, government labs, and the defence/aerospace cluster — is the right place to do this kind of work.
            </motion.p>
            <motion.p className="text-lg text-gray-700 leading-relaxed mb-8" {...fadeUp(0.2)}>
              Our research origins are at McGill University in Montreal — one of Canada's leading research universities and the institution where the science behind our autonomous coordination work was developed. We work with customers across Canada and are available for international projects. If your operation requires a drone system that does not yet exist, that is the conversation we are designed to have.
            </motion.p>

            <motion.div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4" {...fadeUp(0.25)}>
              <a href="mailto:info@multiagentdronesystems.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-gray-900 font-medium group-hover:text-gray-700 transition-colors text-sm">info@multiagentdronesystems.com</p>
                </div>
              </a>
              <a href="tel:+16134132941" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="text-gray-900 font-medium group-hover:text-gray-700 transition-colors">+1-613-413-2941</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, margin: '-40px' },
                  transition: { duration: 0.55, ease: 'easeOut' },
                })}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-75.78%2C45.38%2C-75.58%2C45.46&layer=mapnik&marker=45.4215%2C-75.6972"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              title="Ottawa, Ontario, Canada — MADS Inc headquarters location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ottawa;
