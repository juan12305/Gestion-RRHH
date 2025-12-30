"use client";

import { motion } from "framer-motion";
import { Link2, FileEdit, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Empleado recibe link de registro",
    description:
      "RRHH envía un enlace personalizado y seguro al nuevo empleado para iniciar su proceso de onboarding digital.",
    icon: Link2,
  },
  {
    number: "02",
    title: "Completa información y anexa documentos",
    description:
      "El empleado completa sus datos personales, educación, experiencia y carga todos los documentos requeridos de forma segura.",
    icon: FileEdit,
  },
  {
    number: "03",
    title: "RRHH gestiona y aprueba desde el dashboard",
    description:
      "El equipo de RRHH revisa, valida y aprueba la información desde un panel centralizado con toda la documentación organizada.",
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="como-funciona" className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Cómo{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tres simples pasos para transformar tu gestión de talento humano
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-8 lg:space-y-12"
        >
          {/* Connecting line */}
          <div className="absolute left-8 top-16 hidden h-[calc(100%-8rem)] w-0.5 bg-gradient-to-b from-primary via-accent to-primary lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
                {/* Number indicator */}
                <div className="relative flex items-center gap-6 lg:w-32">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-6xl font-bold text-primary/20 lg:hidden">
                    {step.number}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1">
                  <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 lg:p-8">
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="hidden text-5xl font-bold text-primary/30 lg:block">
                          {step.number}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8 backdrop-blur-sm lg:p-12">
            <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
              ¿Listo para simplificar tu gestión de RRHH?
            </h3>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Únete a las empresas que ya están transformando su gestión de
              talento humano con EyD Talent Manager
            </p>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Comenzar Ahora
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
