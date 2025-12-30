from django.db import models
from trabajadores.models import Trabajador


class Retiro(models.Model):
    """
    Modelo de Retiro de trabajadores.
    Relación uno a uno con Trabajador.
    """

    # Relación con Trabajador (permite múltiples retiros por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='retiros',
        verbose_name='Trabajador'
    )

    # Año del retiro (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del retiro (ej: 2024, 2025)',
        db_index=True,
        default=2025
    )

    # Información de retiro
    fecha_retiro = models.DateField(
        verbose_name='Fecha de Retiro',
        null=True,
        blank=True
    )

    fecha_liquidacion = models.DateField(
        verbose_name='Fecha de Liquidación',
        null=True,
        blank=True
    )

    valor_liquidacion = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Valor Liquidación',
        null=True,
        blank=True,
        help_text='Valor en pesos colombianos'
    )

    fecha_examen_retiro = models.DateField(
        verbose_name='Fecha Examen de Retiro',
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
        verbose_name = 'Retiro'
        verbose_name_plural = 'Retiros'
        ordering = ['-anio', '-fecha_retiro']
        db_table = 'retiro'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener un retiro por año

    def __str__(self):
        return f"Retiro de {self.trabajador.nombre_completo} - {self.fecha_retiro} ({self.anio})"
