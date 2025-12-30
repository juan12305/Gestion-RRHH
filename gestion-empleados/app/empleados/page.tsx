"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  FileText,
  Bell,
  LogOut,
  X,
  Menu,
  Database,
  Settings,
  BarChart3,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { getEmployees, type Employee } from "@/lib/api/employees";
import { useAuthStore } from "@/lib/stores/authStore";

// Funciones auxiliares para formateo
const getTipoDocumento = (tipo: string): string => {
  const tipos: Record<string, string> = {
    CC: "Cédula de Ciudadanía",
    CE: "Cédula de Extranjería",
    PA: "Pasaporte",
    TI: "Tarjeta de Identidad",
  };
  return tipos[tipo] || tipo;
};

const getTipoContrato = (tipo: string): string => {
  const tipos: Record<string, string> = {
    PRESTACION_SERVICIOS: "Prestación de Servicios",
    TERMINO_INDEFINIDO: "Término Indefinido",
    TERMINO_FIJO: "Término Fijo",
    OBRA_LABOR: "Obra o Labor",
    APRENDIZAJE: "Aprendizaje",
  };
  return tipos[tipo] || tipo;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount: string | number): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(numAmount);
};

export default function EmpleadosPage() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [duplicateEmployees, setDuplicateEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showingDuplicates, setShowingDuplicates] = useState(false);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const handleEmployeeClick = (employee: Employee) => {
    // Buscar TODOS los empleados con el mismo nombre en la lista completa
    const duplicates = employees.filter(
      (emp) => emp.nombre_completo === employee.nombre_completo
    );

    if (duplicates.length > 1) {
      // Hay duplicados, mostrar lista para seleccionar
      setDuplicateEmployees(duplicates);
      setShowingDuplicates(true);
    } else {
      // No hay duplicados, mostrar directamente
      setSelectedEmployee(employee);
      setShowingDuplicates(false);
    }
  };

  // Cargar empleados al montar el componente y cuando cambia el año
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await getEmployees(selectedYear);
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedYear]);

  // Filtrar empleados cuando cambia la búsqueda
  useEffect(() => {
    let filtered = employees;

    // Aplicar filtro de búsqueda si hay query
    if (searchQuery.trim() !== "") {
      filtered = employees.filter(
        (emp) =>
          emp.nombre_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.numero.includes(searchQuery)
      );
    }

    // Eliminar duplicados visuales - mostrar solo un trabajador por nombre
    const uniqueEmployees: Employee[] = [];
    const seenNames = new Set<string>();

    filtered.forEach((emp) => {
      if (!seenNames.has(emp.nombre_completo)) {
        seenNames.add(emp.nombre_completo);
        uniqueEmployees.push(emp);
      }
    });

    setFilteredEmployees(uniqueEmployees);
  }, [searchQuery, employees]);

  const menuItems = [
    { icon: Users, label: "Empleados", href: "/empleados", active: true },
    { icon: FileText, label: "Documentos", href: "/dashboard" },
    { icon: Database, label: "Base de Datos", href: "/dashboard" },
    { icon: BarChart3, label: "Reportes", href: "/dashboard" },
    { icon: Settings, label: "Configuración", href: "/dashboard" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border/50 bg-card/50 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-border/50 px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EyD Group
              </span>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 space-y-1 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                    item.active
                      ? "bg-primary/10 text-primary shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="border-t border-border/50 p-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border/50 bg-card/50 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Empleados
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Gestiona la información de tu equipo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-accent" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {/* Search Bar and Year Filter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre o cédula..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 rounded-2xl border-border/50 bg-card/50 pl-12 text-lg backdrop-blur-sm"
                  />
                </div>

                {/* Year Selector */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="h-14 w-32 rounded-2xl border border-border/50 bg-card/50 px-4 text-lg backdrop-blur-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </div>
            </motion.div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Cargando..."
                  : `${filteredEmployees.length} empleado${filteredEmployees.length !== 1 ? "s" : ""} encontrado${filteredEmployees.length !== 1 ? "s" : ""}`}
              </p>
              <Badge variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Total: {employees.length}
              </Badge>
            </div>

            {/* Employee List */}
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-24 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm animate-pulse"
                    />
                  ))
                ) : filteredEmployees.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-card/30 p-12 backdrop-blur-sm"
                  >
                    <Users className="mb-4 h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      No se encontraron empleados
                    </h3>
                    <p className="text-muted-foreground">
                      Intenta con otro término de búsqueda
                    </p>
                  </motion.div>
                ) : (
                  filteredEmployees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleEmployeeClick(employee)}
                      className="group relative cursor-pointer rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-lg font-bold text-primary">
                            {employee.primer_nombre?.[0] || ''}
                            {employee.primer_apellido?.[0] || ''}
                          </div>

                          {/* Info */}
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {employee.nombre_completo}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CreditCard className="h-4 w-4" />
                                {employee.tipo}: {employee.numero}
                              </span>
                              {employee.contratacion?.cargo && (
                                <span className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  {employee.contratacion.cargo}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* Employee Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEmployee(null)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/50 bg-card/95 p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (showingDuplicates && duplicateEmployees.length > 1) {
                    // Si vino desde duplicados, volver al modal de contratos
                    setSelectedEmployee(null);
                  } else {
                    // Si no, cerrar todo
                    setSelectedEmployee(null);
                    setShowingDuplicates(false);
                  }
                }}
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Header */}
              <div className="mb-6 flex items-start gap-6 border-b border-border/50 pb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground">
                  {selectedEmployee.primer_nombre?.[0] || ''}
                  {selectedEmployee.primer_apellido?.[0] || ''}
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-3xl font-bold text-foreground">
                    {selectedEmployee.nombre_completo}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.contratacion?.cargo && (
                      <Badge className="gap-1">
                        <Briefcase className="h-3 w-3" />
                        {selectedEmployee.contratacion.cargo}
                      </Badge>
                    )}
                    {selectedEmployee.contratacion?.municipio_base && (
                      <Badge variant="outline">
                        {selectedEmployee.contratacion.municipio_base}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {selectedEmployee.edad} años
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-2">
                {/* Información Personal */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Información de Identificación
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoItem
                      icon={CreditCard}
                      label="Tipo de Documento"
                      value={getTipoDocumento(selectedEmployee.tipo)}
                    />
                    <InfoItem
                      icon={CreditCard}
                      label="Número de Documento"
                      value={selectedEmployee.numero}
                    />
                    <InfoItem
                      icon={Calendar}
                      label="Fecha de Expedición"
                      value={formatDate(selectedEmployee.fecha_expedicion_cedula)}
                    />
                    <InfoItem
                      icon={Calendar}
                      label="Fecha de Nacimiento"
                      value={formatDate(selectedEmployee.fecha_nacimiento)}
                    />
                    <InfoItem
                      label="Edad"
                      value={`${selectedEmployee.edad} años`}
                    />
                  </div>
                </div>

                {/* Nombres Completos */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Nombres y Apellidos
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoItem
                      label="Primer Nombre"
                      value={selectedEmployee.primer_nombre}
                    />
                    {selectedEmployee.segundo_nombre && (
                      <InfoItem
                        label="Segundo Nombre"
                        value={selectedEmployee.segundo_nombre}
                      />
                    )}
                    <InfoItem
                      label="Primer Apellido"
                      value={selectedEmployee.primer_apellido}
                    />
                    {selectedEmployee.segundo_apellido && (
                      <InfoItem
                        label="Segundo Apellido"
                        value={selectedEmployee.segundo_apellido}
                      />
                    )}
                  </div>
                </div>

                {/* CONTRATACIÓN */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Contratación
                  </h3>
                  {selectedEmployee.contratacion ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InfoItem
                        icon={Briefcase}
                        label="Cargo"
                        value={selectedEmployee.contratacion.cargo}
                      />
                      <InfoItem
                        label="Tipo de Contrato"
                        value={selectedEmployee.contratacion.tipo_contrato_display || selectedEmployee.contratacion.tipo_contrato}
                      />
                      <InfoItem
                        label="Salario Contratado"
                        value={formatCurrency(selectedEmployee.contratacion.salario_contratado)}
                      />
                      <InfoItem
                        icon={MapPin}
                        label="Municipio Base"
                        value={selectedEmployee.contratacion.municipio_base_display || selectedEmployee.contratacion.municipio_base}
                      />
                      {selectedEmployee.contratacion.fecha_inicio_contrato && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha de Inicio"
                          value={formatDate(selectedEmployee.contratacion.fecha_inicio_contrato)}
                        />
                      )}
                      {selectedEmployee.contratacion.fecha_final_contrato && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Final"
                          value={formatDate(selectedEmployee.contratacion.fecha_final_contrato)}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No hay información de contratación disponible
                    </p>
                  )}
                </div>

                {/* INGRESO */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Ingreso
                  </h3>
                  {selectedEmployee.ingreso ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedEmployee.ingreso.fecha_ingreso && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha de Ingreso"
                          value={formatDate(selectedEmployee.ingreso.fecha_ingreso)}
                        />
                      )}
                      {selectedEmployee.ingreso.examen_ingreso && (
                        <InfoItem
                          label="Examen de Ingreso"
                          value={selectedEmployee.ingreso.examen_ingreso}
                        />
                      )}
                      {selectedEmployee.ingreso.fecha_entrega_epp && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Entrega EPP"
                          value={formatDate(selectedEmployee.ingreso.fecha_entrega_epp)}
                        />
                      )}
                      {selectedEmployee.ingreso.fecha_entrega_dotacion && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Entrega Dotación"
                          value={formatDate(selectedEmployee.ingreso.fecha_entrega_dotacion)}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No hay información de ingreso disponible
                    </p>
                  )}
                </div>

                {/* RETIRO */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Retiro
                  </h3>
                  {selectedEmployee.retiro ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedEmployee.retiro.fecha_retiro && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha de Retiro"
                          value={formatDate(selectedEmployee.retiro.fecha_retiro)}
                        />
                      )}
                      {selectedEmployee.retiro.fecha_liquidacion && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha de Liquidación"
                          value={formatDate(selectedEmployee.retiro.fecha_liquidacion)}
                        />
                      )}
                      {selectedEmployee.retiro.valor_liquidacion && (
                        <InfoItem
                          label="Valor Liquidación"
                          value={formatCurrency(selectedEmployee.retiro.valor_liquidacion)}
                        />
                      )}
                      {selectedEmployee.retiro.fecha_examen_retiro && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Examen de Retiro"
                          value={formatDate(selectedEmployee.retiro.fecha_examen_retiro)}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No hay información de retiro disponible
                    </p>
                  )}
                </div>

                {/* SEGURIDAD SOCIAL */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Seguridad Social
                  </h3>
                  {selectedEmployee.seguridad_social ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {selectedEmployee.seguridad_social.eps && (
                        <InfoItem
                          label="EPS"
                          value={selectedEmployee.seguridad_social.eps}
                        />
                      )}
                      {selectedEmployee.seguridad_social.fecha_afiliacion_eps && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Afiliación EPS"
                          value={formatDate(selectedEmployee.seguridad_social.fecha_afiliacion_eps)}
                        />
                      )}
                      {selectedEmployee.seguridad_social.caja_compensacion && (
                        <InfoItem
                          label="Caja de Compensación"
                          value={selectedEmployee.seguridad_social.caja_compensacion}
                        />
                      )}
                      {selectedEmployee.seguridad_social.fecha_afiliacion_caja && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Afiliación Caja"
                          value={formatDate(selectedEmployee.seguridad_social.fecha_afiliacion_caja)}
                        />
                      )}
                      {selectedEmployee.seguridad_social.fondo_pension && (
                        <InfoItem
                          label="Fondo de Pensión"
                          value={selectedEmployee.seguridad_social.fondo_pension}
                        />
                      )}
                      {selectedEmployee.seguridad_social.fecha_afiliacion_pension && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Afiliación Pensión"
                          value={formatDate(selectedEmployee.seguridad_social.fecha_afiliacion_pension)}
                        />
                      )}
                      {selectedEmployee.seguridad_social.arl && (
                        <InfoItem
                          label="ARL"
                          value={selectedEmployee.seguridad_social.arl_display || selectedEmployee.seguridad_social.arl}
                        />
                      )}
                      {selectedEmployee.seguridad_social.fecha_afiliacion_arl && (
                        <InfoItem
                          icon={Calendar}
                          label="Fecha Afiliación ARL"
                          value={formatDate(selectedEmployee.seguridad_social.fecha_afiliacion_arl)}
                        />
                      )}
                      {selectedEmployee.seguridad_social.riesgo && (
                        <InfoItem
                          label="Nivel de Riesgo"
                          value={selectedEmployee.seguridad_social.riesgo_display || selectedEmployee.seguridad_social.riesgo}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No hay información de seguridad social disponible
                    </p>
                  )}
                </div>

                {/* PROYECTOS */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Proyectos Asignados
                  </h3>
                  {selectedEmployee.proyecto ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.proyecto.administrativo && (
                        <Badge>Administrativo</Badge>
                      )}
                      {selectedEmployee.proyecto.construccion_instalaciones && (
                        <Badge>Construcción de Instalaciones</Badge>
                      )}
                      {selectedEmployee.proyecto.construccion_redes && (
                        <Badge>Construcción de Redes</Badge>
                      )}
                      {selectedEmployee.proyecto.servicios && (
                        <Badge>Servicios</Badge>
                      )}
                      {selectedEmployee.proyecto.mantenimiento_redes && (
                        <Badge>Mantenimiento de Redes</Badge>
                      )}
                      {!selectedEmployee.proyecto.administrativo &&
                       !selectedEmployee.proyecto.construccion_instalaciones &&
                       !selectedEmployee.proyecto.construccion_redes &&
                       !selectedEmployee.proyecto.servicios &&
                       !selectedEmployee.proyecto.mantenimiento_redes && (
                        <p className="text-sm text-muted-foreground">
                          No tiene proyectos asignados
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">
                      No hay información de proyectos disponible
                    </p>
                  )}
                </div>

                {/* Información de Sistema */}
                <div className="border-t border-border/30 pt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Información del Sistema
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoItem
                      icon={Calendar}
                      label="Fecha de Creación"
                      value={formatDateTime(selectedEmployee.fecha_creacion)}
                    />
                    <InfoItem
                      icon={Calendar}
                      label="Última Actualización"
                      value={formatDateTime(selectedEmployee.fecha_actualizacion)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Duplicate Selection Modal */}
      <AnimatePresence>
        {duplicateEmployees.length > 0 && !selectedEmployee && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setDuplicateEmployees([]);
                setShowingDuplicates(false);
              }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/50 bg-card/95 p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setDuplicateEmployees([]);
                  setShowingDuplicates(false);
                }}
                className="absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Header */}
              <div className="mb-6 border-b border-border/50 pb-6">
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Contratos Múltiples Encontrados
                </h2>
                <p className="text-sm text-muted-foreground">
                  Este trabajador tiene {duplicateEmployees.length} contratos en el año {selectedYear}.
                  Selecciona el contrato que deseas ver:
                </p>
              </div>

              {/* Contracts List */}
              <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-2">
                {duplicateEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      // No resetear duplicateEmployees aquí, mantenerlos para poder volver
                      // Solo cerrar el modal de duplicados, pero mantener showingDuplicates en true
                    }}
                    className="group cursor-pointer rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative">
                      {/* Contract Header */}
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Contrato #{index + 1}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {employee.id}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>

                      {/* Contract Details */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        {employee.contratacion?.cargo && (
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Cargo</p>
                              <p className="text-sm font-medium text-foreground">
                                {employee.contratacion.cargo}
                              </p>
                            </div>
                          </div>
                        )}

                        {employee.contratacion?.tipo_contrato && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Tipo</p>
                              <p className="text-sm font-medium text-foreground">
                                {getTipoContrato(employee.contratacion.tipo_contrato)}
                              </p>
                            </div>
                          </div>
                        )}

                        {employee.contratacion?.fecha_inicio_contrato && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Fecha Inicio</p>
                              <p className="text-sm font-medium text-foreground">
                                {formatDate(employee.contratacion.fecha_inicio_contrato)}
                              </p>
                            </div>
                          </div>
                        )}

                        {employee.contratacion?.municipio_base && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Municipio</p>
                              <p className="text-sm font-medium text-foreground">
                                {employee.contratacion.municipio_base}
                              </p>
                            </div>
                          </div>
                        )}

                        {employee.contratacion?.salario_contratado && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Salario</p>
                              <p className="text-sm font-medium text-foreground">
                                {formatCurrency(employee.contratacion.salario_contratado)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Componente auxiliar para mostrar información
function InfoItem({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon?: any;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-secondary/30 p-4 ${className}`}>
      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
