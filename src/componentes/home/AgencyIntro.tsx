//import React from 'react';
import { motion } from 'framer-motion';

const AgencyIntro = () => {
  // Variantes para animaciones coordinadas
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Decoración de fondo sutil */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid items-center gap-16 lg:grid-cols-2"
        >

          {/* Columna de Texto */}
          <div>
            <motion.span 
              variants={itemVariants}
              className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-sky-600"
            >
              Experiencia Local Real
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="mb-6 text-4xl font-extrabold tracking-tight text-sky-950 md:text-5xl"
            >
              Conoce <span className="text-sky-600">ManiAdventures</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="mb-10 text-lg leading-relaxed text-slate-600"
            >
              Explora Cusco con una agencia local experta en experiencias inolvidables.
              Diseñamos itinerarios bien planificados y aplicamos una 
              <span className="font-semibold text-sky-800"> estrategia de aclimatación progresiva</span> para que disfrutes sin malestar.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Stat icon="🏔" text="Experiencias organizadas" />
              <Stat icon="👥" text="Atención personalizada" />
              <Stat icon="📍" text="Agencia local en Cusco" />
              <Stat icon="🔼" text="Aclimatación progresiva" />
            </motion.div>
          </div>

          {/* Bloque visual con animación de flotado */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative"
          >
            {/* Adorno decorativo detrás de la caja */}
            <div className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-sky-200 transition-transform group-hover:scale-105" />
            
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-900 p-10 text-white shadow-2xl shadow-sky-200/50 lg:p-16">
              <div className="relative z-10">
                <h3 className="mb-6 text-3xl font-bold leading-tight">
                  Que no te lo cuenten… <br />
                  <span className="text-sky-300 underline decoration-sky-400/30 underline-offset-8 italic">vívelo.</span>
                </h3>
                <p className="text-lg leading-relaxed text-sky-100/90">
                  Nuestro enfoque combina planificación estratégica, seguridad y experiencias 
                  auténticas diseñadas para que vivas Cusco con energía y tranquilidad.
                </p>
              </div>

              {/* Círculo decorativo interno */}
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ icon, text }: { icon: string; text: string }) => (
  <motion.div 
    whileHover={{ y: -5, backgroundColor: "#f0f9ff" }}
    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors"
  >
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl shadow-inner">
      {icon}
    </span>
    <span className="text-sm font-bold text-sky-900">{text}</span>
  </motion.div>
);

export default AgencyIntro;