"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Globe } from "lucide-react";

const stats = [
  {
    value: "100%",
    label: "Digital",
    description: "Proceso completamente paperless",
    icon: Globe,
  },
  {
    value: "80%",
    label: "Reducción",
    description: "Tiempo en procesos administrativos",
    icon: TrendingUp,
  },
  {
    value: "24/7",
    label: "Acceso",
    description: "Disponibilidad total del sistema",
    icon: Clock,
  },
  {
    value: "256-bit",
    label: "Seguridad",
    description: "Encriptación de datos",
    icon: Shield,
  },
];

export function Stats() {
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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="beneficios" className="relative overflow-hidden py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

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
            Resultados que{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hablan por Sí Mismos
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Métricas que demuestran el impacto de digitalizar tu gestión de
            talento humano
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Value */}
                <div className="mb-2 text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="mb-1 text-lg font-semibold text-primary">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Chart visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-secondary/30 p-8 backdrop-blur-sm lg:p-12"
        >
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              Crecimiento de Productividad
            </h3>
            <p className="text-muted-foreground">
              Mejora promedio en eficiencia después de implementar EyD Talent
              Manager
            </p>
          </div>

          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {[
              { label: "Mes 1", value: 20 },
              { label: "Mes 2", value: 45 },
              { label: "Mes 3", value: 65 },
              { label: "Mes 4", value: 80 },
              { label: "Mes 5", value: 90 },
              { label: "Mes 6", value: 95 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-muted-foreground">
                  {item.label}
                </div>
                <div className="relative flex-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-10 rounded-lg bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/20"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center px-4">
                    <span className="text-sm font-bold text-primary-foreground">
                      {item.value}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
