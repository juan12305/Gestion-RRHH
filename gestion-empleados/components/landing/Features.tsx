"use client";

import { motion } from "framer-motion";
import { UserPlus, FileText, Database, FileSignature, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: UserPlus,
    title: "Onboarding Digital",
    description:
      "Los empleados completan sus datos mediante un link personalizado, simplificando el proceso de ingreso.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: FileText,
    title: "Gestión Documental",
    description:
      "Carga y almacenamiento seguro de diplomas, certificados, contratos y toda la documentación laboral.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Database,
    title: "Base de Datos Centralizada",
    description:
      "Acceso rápido y organizado a la información completa de todos los empleados desde un solo lugar.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: FileSignature,
    title: "Generación de Contratos",
    description:
      "Creación y gestión automatizada de contratos laborales con plantillas personalizables.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="caracteristicas" className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />

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
            Características{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Principales
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Todo lo que necesitas para gestionar tu talento humano de forma
            eficiente y moderna
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* What is section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-secondary/30 p-8 backdrop-blur-sm lg:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              ¿Qué es EyD Talent Manager?
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Una plataforma integral que permite a los nuevos empleados
              completar su proceso de onboarding digitalmente, anexar
              documentos, generar hojas de vida, y facilita a RRHH el acceso
              centralizado a toda la información del personal. Todo en un solo
              lugar, seguro y accesible desde cualquier dispositivo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
