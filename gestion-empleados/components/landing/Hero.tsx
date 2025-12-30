"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, FileCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    smoothScrollTo(targetId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const floatingIcons = [
    { icon: Users, delay: 0, position: "top-20 left-10" },
    { icon: FileCheck, delay: 0.2, position: "top-40 right-20" },
    { icon: Zap, delay: 0.4, position: "bottom-40 left-20" },
  ];

  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20 pt-16"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Floating particles */}
      {mounted &&
        [...Array(15)].map((_, i) => {
          const randomX = Math.random() * window.innerWidth;
          const randomY = Math.random() * window.innerHeight;
          const randomX2 = Math.random() * window.innerWidth;
          const randomY2 = Math.random() * window.innerHeight;
          const randomDuration = 10 + Math.random() * 10;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute h-1 w-1 rounded-full bg-primary/20"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                x: randomX2,
                y: randomY2,
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`absolute hidden lg:block ${item.position}`}
        >
          <div className="rounded-2xl border border-primary/20 bg-card/50 p-4 backdrop-blur-sm">
            <item.icon className="h-8 w-8 text-primary" />
          </div>
        </motion.div>
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-2 lg:gap-8"
        >
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Sistema en la nube
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Gestión de{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Talento Humano
              </span>{" "}
              Simplificada
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 text-lg text-muted-foreground sm:text-xl"
            >
              Digitaliza tu proceso de contratación, gestión documental y
              seguimiento de empleados en una sola plataforma moderna y segura.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="group bg-primary text-lg hover:bg-primary/90"
              >
                <Link href="/login">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a
                  href="#caracteristicas"
                  onClick={(e) => handleSmoothScroll(e, "#caracteristicas")}
                >
                  Conocer Más
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Digital</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Disponible</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">-80%</div>
                <div className="text-sm text-muted-foreground">Tiempo</div>
              </div>
            </motion.div>
          </div>

          {/* Right content - Dashboard preview */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />

              {/* Dashboard mockup */}
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 shadow-2xl backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dashboard
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="space-y-4">
                  <div className="h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-4">
                    <div className="mb-2 h-4 w-32 rounded bg-foreground/20" />
                    <div className="h-8 w-48 rounded bg-foreground/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded-lg bg-secondary/50 p-3">
                      <div className="mb-2 h-3 w-20 rounded bg-foreground/20" />
                      <div className="h-6 w-16 rounded bg-foreground/10" />
                    </div>
                    <div className="h-24 rounded-lg bg-secondary/50 p-3">
                      <div className="mb-2 h-3 w-20 rounded bg-foreground/20" />
                      <div className="h-6 w-16 rounded bg-foreground/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/20" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3 w-32 rounded bg-foreground/20" />
                          <div className="h-2 w-24 rounded bg-foreground/10" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
