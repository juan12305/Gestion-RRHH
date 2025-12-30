"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  FileText,
  Database,
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus,
  FileCheck,
  TrendingUp,
  Bell,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStore";
import { getEmployees, type Employee } from "@/lib/api/employees";

export default function DashboardPage() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalContracts, setTotalContracts] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Array<{ user: string; action: string; time: string }>>([]);
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const handleExportExcel = async () => {
    try {
      // Mostrar mensaje de que la descarga comenzó
      setShowDownloadMessage(true);

      const response = await fetch('http://127.0.0.1:8000/api/trabajadores/exportar-excel/');
      const blob = await response.blob();

      // Crear URL del blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Generar nombre del archivo con fecha y hora
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0].replace('T', '_');
      a.download = `RELACION_PERSONAL_EXPORT_${timestamp}.xlsx`;

      // Disparar la descarga
      document.body.appendChild(a);
      a.click();

      // Limpiar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => setShowDownloadMessage(false), 3000);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      setShowDownloadMessage(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Cargar empleados de 2024 y 2025
        const employees2024 = await getEmployees(2024);
        const employees2025 = await getEmployees(2025);
        const allEmployees = [...employees2024, ...employees2025];

        setEmployees(allEmployees);

        // Calcular total de empleados únicos (por nombre)
        const uniqueNames = new Set(allEmployees.map(emp => emp.nombre_completo));
        setTotalEmployees(uniqueNames.size);

        // Calcular total de contratos (todos los registros/empleados)
        setTotalContracts(allEmployees.length);

        // Generar actividades recientes basadas en los últimos empleados creados
        const sortedEmployees = [...allEmployees].sort((a, b) =>
          new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
        );

        const activities = sortedEmployees.slice(0, 3).map(emp => {
          const createdDate = new Date(emp.fecha_creacion);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - createdDate.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

          let timeAgo = '';
          if (diffDays > 0) {
            timeAgo = `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
          } else if (diffHours > 0) {
            timeAgo = `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
          } else {
            timeAgo = 'Hace unos minutos';
          }

          return {
            user: emp.nombre_completo,
            action: 'completó su registro',
            time: timeAgo
          };
        });

        setRecentActivities(activities);

      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    {
      title: "Total Empleados",
      value: isLoading ? "..." : totalEmployees.toString(),
      change: "+12%",
      icon: Users,
      color: "from-primary to-accent",
    },
    {
      title: "Total Contratos",
      value: isLoading ? "..." : totalContracts.toString(),
      change: "+3",
      icon: FileText,
      color: "from-accent to-primary",
    },
    {
      title: "Documentos Pendientes",
      value: "15",
      change: "-5",
      icon: FileText,
      color: "from-primary/80 to-accent/80",
    },
    {
      title: "Procesos Completados",
      value: "92%",
      change: "+8%",
      icon: FileCheck,
      color: "from-accent/80 to-primary/80",
    },
  ];

  const sidebarItems = [
    { name: "Empleados", icon: Users, href: "/empleados" },
    { name: "Documentos", icon: FileText, href: "#" },
    { name: "Base de Datos", icon: Database, href: "#" },
    { name: "Reportes", icon: TrendingUp, href: "#" },
    { name: "Configuración", icon: Settings, href: "#" },
  ];

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
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border/40 bg-card/50 backdrop-blur-xl transition-transform duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between border-b border-border/40 p-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  EyD Group
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {sidebarItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>

            {/* Logout */}
            <div className="border-t border-border/40 p-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Bienvenido al panel de administración
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">Admin</p>
                    <p className="text-xs text-muted-foreground">
                      Administrador
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}
                      >
                        <stat.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          stat.change.startsWith("+")
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <p className="mb-1 text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Actividad Reciente
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          <span className="text-primary">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Acciones Rápidas
                </h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Registrar Nuevo Empleado
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/20 hover:bg-primary/10"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Revisar Documentos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/20 hover:bg-primary/10"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Generar Reporte
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-primary/20 hover:bg-primary/10"
                    onClick={handleExportExcel}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Exportar Base de Datos a Excel
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Download notification */}
      <AnimatePresence>
        {showDownloadMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 rounded-lg border border-primary/50 bg-primary/10 px-6 py-4 shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary" />
              <p className="font-medium text-foreground">
                El archivo Excel comenzó a descargarse
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
