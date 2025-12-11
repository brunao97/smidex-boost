'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Diana Johnston',
    rating: 4.9,
    date: '29 Aug, 2017',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    review: 'Excellent service! The optimization made my gaming experience so much better. No more lag spikes during intense gameplay. Highly recommended for any serious gamer.',
  },
  {
    id: 2,
    name: 'Lauren Contreras',
    rating: 4.9,
    date: '29 Aug, 2017',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    review: 'Been working with appscrip for a number of years now with a variety of different apps. They have my recommendation. They are a great team.',
  },
  {
    id: 3,
    name: 'Edward Alexander',
    rating: 4.9,
    date: '29 Aug, 2017',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    review: 'Professional team with outstanding results. My FPS increased significantly and the system runs much smoother now. Worth every penny!',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const TestimonialsSection = () => {
  const [selectedId, setSelectedId] = useState(2);

  const selectedTestimonial = testimonials.find(t => t.id === selectedId) || testimonials[1];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-1 bg-[#2ECC71]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-display">
              Customer Reviews
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-[#2ECC71]/30" />
            
            <div className="flex flex-col gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                    selectedId === testimonial.id ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedId(testimonial.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      selectedId === testimonial.id ? 'border-[#2ECC71] shadow-lg shadow-[#2ECC71]/20' : 'border-gray-200'
                    }`}>
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {selectedId === testimonial.id && (
                      <motion.div 
                        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2ECC71] rounded-full"
                        layoutId="indicator"
                      />
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`font-semibold transition-all duration-300 ${
                      selectedId === testimonial.id ? 'text-[#1A1A1A] text-lg' : 'text-[#4A4A4A] text-base'
                    }`}>
                      {testimonial.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-[#2ECC71] text-[#2ECC71]" />
                      <span className="text-sm text-[#2ECC71] font-medium">{testimonial.rating}</span>
                      <span className="text-sm text-gray-400">on {testimonial.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <span className="absolute -top-8 -left-4 text-8xl text-gray-200 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-xl md:text-2xl text-[#2A2A2A] font-serif italic leading-relaxed pl-8">
                  <span className="text-4xl font-normal not-italic">{selectedTestimonial.review.charAt(0)}</span>
                  {selectedTestimonial.review.slice(1)}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
