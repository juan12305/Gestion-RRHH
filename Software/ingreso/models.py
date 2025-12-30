from django.db import models
from trabajadores.models import Trabajador


class Ingreso(models.Model):
    """
    Modelo de Ingreso de trabajadores.
    Relación uno a uno con Trabajador.
    """

    # Relación con Trabajador (permite múltiples ingresos por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='ingresos',
        verbose_name='Trabajador'
    )

    # Año del ingreso (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del ingreso (ej: 2024, 2025)',
        db_index=True,
        default=2025
    )

    # Información de ingreso
    fecha_ingreso = models.DateField(
        verbose_name='Fecha de Ingreso',
        null=True,
        blank=True
    )

    examen_ingreso = models.DateField(
        verbose_name='Examen de Ingreso',
        null=True,
        blank=True
    )

    fecha_entrega_epp = models.DateField(
        verbose_name='Fecha Entrega EPP',
        null=True,
        blank=True,
        help_text='Equipos de Protección Personal'
    )

    fecha_entrega_dotacion = models.DateField(
        verbose_name='Fecha Entrega Dotación',
        null=True,
        blank=True
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
        verbose_name = 'Ingreso'
        verbose_name_plural = 'Ingresos'
        ordering = ['-anio', '-fecha_ingreso']
        db_table = 'ingreso'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener un ingreso por año

    def __str__(self):
        return f"Ingreso de {self.trabajador.nombre_completo} - {self.fecha_ingreso} ({self.anio})"
