export default function RealClientsSection() {
  return (
    <section className="relative w-full py-24 bg-[#0F0505] overflow-hidden">
      {/* Background ambient glow/gradients for the red theme vibe */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF3333] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF3333] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              {/* Highlighted text as requested (Green) */}
              <h4 className="font-display font-semibold text-lg md:text-xl text-[#00FF41] uppercase tracking-wide">
                O veredito é unânime: menos lag, mais FPS
              </h4>
              
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Clientes Reais. <br />
                Performance Comprovada.
              </h2>
              
              <p className="font-body text-[#B0B8D4] text-base md:text-lg leading-relaxed max-w-lg">
                Experiência de alto nível, para jogares profissionais e casuais. Chegue no seu máximo, sem travamentos.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#"
                className="inline-block bg-[#FF3333] hover:bg-[#D62828] text-white font-body font-semibold text-base py-4 px-10 rounded-full shadow-[0_4px_20px_rgba(255,51,51,0.3)] hover:shadow-[0_6px_25px_rgba(255,51,51,0.4)] transition-all transform hover:-translate-y-1 duration-300"
              >
                Destrave seu pc agora!
              </a>
            </div>
          </div>

          {/* Right Column: Testimonial Gallery Grid */}
          <div className="lg:col-span-7 relative">
            {/* 
               Grid Layout for Testimonials
               Simulating the masonry/grid layout from the screenshot using Tailwind Grid
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Column 1 */}
              <div className="space-y-6 md:pt-12">
                <TestimonialCard 
                   name="Pedro S."
                   text="Mano, meu CS2 tá rodando liso demais! Antes dropava pra 100 fps, agora segura 300 cravado. Surreal!"
                   time="Há 2 horas"
                   image="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c1e29c8d-fe18-432f-91cc-e817f8ee3f8d-bravoboost-com-br/assets/images/Bravoboost-feedback-14-300x300-30.webp"
                />
                <TestimonialCard 
                   name="Lucas G."
                   text="O input lag sumiu completamente. Parece que tô jogando em LAN. Valeu demais Smidex Boost!"
                   time="Há 5 horas"
                   // Reusing asset or placeholder logic
                   fallbackInitials="LG"
                />
                <TestimonialCard 
                   name="Rafinha_FPS"
                   text="Não acreditava que ia mudar tanto. Ganhei uns 40 fps no Warzone e o jogo tá muito mais fluido."
                   time="Ontem"
                   isDarker
                />
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                 <TestimonialCard 
                   name="Gabriel M."
                   text="Serviço top! Atendimento rápido e o resultado foi imediato. Recomendo pra todo mundo do clã."
                   time="Há 3 horas"
                   isAccent
                />
                <TestimonialCard 
                   name="João Victor"
                   text="Meu PC parecia uma carroça hahaha agora tá voando. Otimização braba!"
                   time="Hoje"
                />
                <TestimonialCard 
                   name="Matheus K."
                   text="Sensacional. O suporte pós-venda também é incrível. Resolveram tudo rapidinho."
                   time="Há 1 dia"
                   isDarker
                />
              </div>
            </div>
            
            {/* Fade overlay at bottom of grid for smooth integration on mobile if grid gets too long */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F0505] to-transparent pointer-events-none md:hidden" />
          </div>

        </div>
      </div>
    </section>
  );
}

// Subcomponent for Testimonial Card
function TestimonialCard({ 
  name, 
  text, 
  time, 
  image,
  fallbackInitials,
  isAccent = false,
  isDarker = false
}: { 
  name: string; 
  text: string; 
  time: string; 
  image?: string; 
  fallbackInitials?: string;
  isAccent?: boolean;
  isDarker?: boolean;
}) {
  return (
    <div className={`p-6 rounded-2xl border border-[#2A1515] transition-transform hover:scale-[1.02] duration-300 ${isDarker ? 'bg-[#150a0a]' : 'bg-[#1F0A0A]'} shadow-xl group`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden bg-[#2A1515] border border-[#3A2020]">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#FF3333] font-bold">
              {fallbackInitials || name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h5 className="text-white font-display font-bold text-sm">{name}</h5>
          <span className="text-[#B0B8D4] text-xs font-body opacity-60">{time}</span>
        </div>
      </div>
      
      {/* Simulating Chat Message Bubble Vibe */}
      <div className={`relative p-3 rounded-lg rounded-tl-none ${isAccent ? 'bg-[#2A1010]' : 'bg-[#250d0d]'} border border-[#3A1515]`}>
        <p className="text-gray-200 text-sm font-body leading-relaxed">
          {text}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
         {/* Simple Star Rating svg simulation */}
         {[1, 2, 3, 4, 5].map((star) => (
           <svg key={star} className="w-3 h-3 text-[#FF3333]" fill="currentColor" viewBox="0 0 20 20">
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
           </svg>
         ))}
      </div>
    </div>
  );
}