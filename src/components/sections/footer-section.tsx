'use client';

import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[linear-gradient(to_bottom,#1A0505_0%,#000000_100%)] py-8 border-t border-[#3A1010]">
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center relative min-h-[40px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
          <motion.p 
            className="text-white text-xs md:text-sm font-normal font-body text-center tracking-wide opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Copyright © 2025 Smidex Technologies. All rights Reserved
          </motion.p>

        </motion.div>
      </div>
    </footer>
  );
}