from django.db import models
from trabajadores.models import Trabajador


class Proyecto(models.Model):
    """
    Modelo de asignación de proyectos a trabajadores.
    Permite múltiples asignaciones por año para histórico.
    """

    # Relación con Trabajador (permite múltiples proyectos por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='proyectos_asignados',
        verbose_name='Trabajador'
    )

    # Año del proyecto (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del proyecto (ej: 2024, 2025)',
        db_index=True,
        default=2025
    )

    # Tipos de proyectos (checkboxes en Excel)
    administrativo = models.BooleanField(
        default=False,
        verbose_name='Administrativo'
    )

    construccion_instalaciones = models.BooleanField(
        default=False,
        verbose_name='Construcción de Instalaciones'
    )

    construccion_redes = models.BooleanField(
        default=False,
        verbose_name='Construcción de Redes'
    )

    servicios = models.BooleanField(
        default=False,
        verbose_name='Servicios'
    )

    mantenimiento_redes = models.BooleanField(
        default=False,
        verbose_name='Mantenimiento de Redes'
    )

    # Campos de auditoría
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['-anio']
        db_table = 'proyectos'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener una asignación de proyecto por año

    def __str__(self):
        proyectos_activos = []
        if self.administrativo:
            proyectos_activos.append('Administrativo')
        if self.construccion_instalaciones:
            proyectos_activos.append('Construcción Instalaciones')
        if self.construccion_redes:
            proyectos_activos.append('Construcción Redes')
        if self.servicios:
            proyectos_activos.append('Servicios')
        if self.mantenimiento_redes:
            proyectos_activos.append('Mantenimiento Redes')

        proyectos_str = ', '.join(proyectos_activos) if proyectos_activos else 'Sin proyectos'
        return f"{self.trabajador.nombre_completo} - {proyectos_str} ({self.anio})"
