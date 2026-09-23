import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS_DATA } from '../data/mediaData';

interface CounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="relative py-24 bg-[#09090b] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {STATS_DATA.map((item, index) => {
            const hasDecimals = item.value % 1 !== 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`pt-6 sm:pt-0 sm:px-6 flex flex-col justify-center text-center sm:text-left ${
                  index === 0 ? 'sm:pl-0' : ''
                }`}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-none">
                  <AnimatedCounter
                    target={item.value}
                    suffix={item.suffix}
                    decimals={hasDecimals ? 1 : 0}
                  />
                </div>

                <div className="mt-3">
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-200">
                    {item.label}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
