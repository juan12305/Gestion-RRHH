import apiClient from './client';

// Información de contratación
export interface Contratacion {
  id: number;
  trabajador: number;
  tipo_contrato: string;
  tipo_contrato_display?: string;
  cargo: string;
  salario_contratado: string;
  municipio_base: string;
  municipio_base_display?: string;
  fecha_inicio_contrato?: string;
  fecha_final_contrato?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  contrato_activo?: boolean;
  dias_restantes?: number;
}

// Información de ingreso
export interface Ingreso {
  id: number;
  trabajador: number;
  fecha_ingreso?: string;
  examen_ingreso?: string;
  fecha_entrega_epp?: string;
  fecha_entrega_dotacion?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Información de retiro
export interface Retiro {
  id: number;
  trabajador: number;
  fecha_retiro?: string;
  fecha_liquidacion?: string;
  valor_liquidacion?: string;
  fecha_examen_retiro?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Información de seguridad social
export interface SeguridadSocial {
  id: number;
  trabajador: number;
  eps?: string;
  fecha_afiliacion_eps?: string;
  caja_compensacion?: string;
  fecha_afiliacion_caja?: string;
  fondo_pension?: string;
  fecha_afiliacion_pension?: string;
  arl?: string;
  arl_display?: string;
  riesgo?: string;
  riesgo_display?: string;
  fecha_afiliacion_arl?: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Información de proyecto
export interface Proyecto {
  id: number;
  trabajador: number;
  administrativo: boolean;
  construccion_instalaciones: boolean;
  construccion_redes: boolean;
  servicios: boolean;
  mantenimiento_redes: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Modelo principal de Trabajador/Employee
export interface Employee {
  id: number;
  // Campos de identificación
  numero: string; // Número de documento (cédula)
  tipo: 'CC' | 'CE' | 'PA' | 'TI'; // Tipo de identificación
  fecha_expedicion_cedula: string;
  fecha_nacimiento: string;

  // Nombres y apellidos
  primer_apellido: string;
  segundo_apellido?: string;
  primer_nombre: string;
  segundo_nombre?: string;

  // Campos calculados (read-only)
  nombre_completo: string;
  edad: number;

  // Relaciones
  contratacion?: Contratacion;
  ingreso?: Ingreso;
  retiro?: Retiro;
  seguridad_social?: SeguridadSocial;
  proyecto?: Proyecto;

  // Campos de auditoría
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export const getEmployees = async (year: number = 2025): Promise<Employee[]> => {
  const response = await apiClient.get('/trabajadores/', {
    params: { anio: year }
  });
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await apiClient.get(`/trabajadores/${id}/`);
  return response.data;
};

export const searchEmployees = async (query: string): Promise<Employee[]> => {
  const response = await apiClient.get('/trabajadores/', {
    params: { search: query }
  });
  return response.data;
};

export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
  const response = await apiClient.post('/trabajadores/', employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
  const response = await apiClient.patch(`/trabajadores/${id}/`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/trabajadores/${id}/`);
};
