'use client';

import { motion } from 'motion/react';
import { Terminal, Cpu, Zap, Search, Shield, Settings, Code } from 'lucide-react';

const iconMap: Record<string, any> = {
  terminal: Terminal,
  cpu: Cpu,
  zap: Zap,
  search: Search,
  shield: Shield,
  settings: Settings,
  code: Code,
};

interface TechItem {
  tool: string;
  reasoning: string;
  icon?: string;
}

interface TechSelectionSectionProps {
  data: {
    title?: string;
    items?: TechItem[];
  };
}

export default function TechSelectionSection({ data }: TechSelectionSectionProps) {
  if (!data?.items || data.items.length === 0) return null;

  const { title = 'Tech Stack & Rationale', items } = data;

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-text-primary mb-12 flex items-center gap-4"
        >
          <span className="w-12 h-[2px] bg-accent" />
          {title}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon?.toLowerCase() || ''] || Code;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-base-900 border border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={24} />
                  </div>
                  
                  <h4 className="text-xl font-bold text-accent mb-3 group-hover:text-accent-hover transition-colors duration-300">
                    {item.tool}
                  </h4>
                  
                  <p className="!text-white leading-relaxed text-sm lg:text-base selection:bg-accent/30 opacity-90 relative z-10">
                    {item.reasoning}
                  </p>
                </div>

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
