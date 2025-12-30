"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, User, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ username, password });

      // Guardar datos de autenticación en el store
      setAuth(response.user, response.access);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error de login:", err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else if (err.message === "Network Error") {
        setError("No se puede conectar al servidor. Verifica que el backend esté corriendo.");
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid pattern background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial gradient */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Back to home link */}
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-8 sm:top-8"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Volver al inicio
        </Link>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo and title */}
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                EyD Group SAS
              </span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-foreground">
              Bienvenido de vuelta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          {/* Form card */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

            {/* Form content */}
            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Iniciando sesión..." : "Acceder al Sistema"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>

            {/* Decorative element */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/5 blur-2xl" />
          </div>

        </motion.div>
      </div>
    </div>
  );
}
