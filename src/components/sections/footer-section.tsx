'use client';

import Link from 'next/link';
import { Instagram } from 'lucide-react';
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

          <motion.div 
            className="mt-6 md:mt-0 md:absolute md:right-0 bottom-0 md:top-1/2 md:-translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
             <Link 
                href="https://instagram.com" 
                target="_blank"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-300 group"
                aria-label="Instagram"
             >
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.2 }}>
                  <Instagram className="w-5 h-5 text-white" />
                </motion.div>
             </Link>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  );
}