from django.db import models
from trabajadores.models import Trabajador


class SeguridadSocial(models.Model):
    """
    Modelo de Seguridad Social de trabajadores.
    Permite múltiples registros por año para histórico.
    """

    ARL_CHOICES = [
        ('POSITIVA', 'Positiva'),
        ('SURA', 'Sura'),
        ('BOLIVAR', 'Bolívar'),
        ('EQUIDAD', 'Equidad'),
        ('LIBERTY', 'Liberty'),
        ('MAPFRE', 'Mapfre'),
        ('COLMENA', 'Colmena'),
        ('AURORA', 'Aurora'),
        ('OTRA', 'Otra'),
    ]

    RIESGO_CHOICES = [
        ('1', 'Riesgo I'),
        ('2', 'Riesgo II'),
        ('3', 'Riesgo III'),
        ('4', 'Riesgo IV'),
        ('5', 'Riesgo V'),
    ]

    # Relación con Trabajador (permite múltiples registros por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='seguridad_social_registros',
        verbose_name='Trabajador'
    )

    # Año del registro (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del registro (ej: 2024, 2025)',
        db_index=True,
        default=2025
    )

    # Información de seguridad social
    eps = models.CharField(
        max_length=100,
        verbose_name='EPS',
        blank=True,
        null=True
    )

    fecha_afiliacion_eps = models.DateField(
        verbose_name='Fecha Afiliación EPS',
        null=True,
        blank=True
    )

    caja_compensacion = models.CharField(
        max_length=100,
        verbose_name='Caja de Compensación',
        blank=True,
        null=True
    )

    fecha_afiliacion_caja = models.DateField(
        verbose_name='Fecha Afiliación Caja',
        null=True,
        blank=True
    )

    fondo_pension = models.CharField(
        max_length=100,
        verbose_name='Fondo de Pensión',
        blank=True,
        null=True
    )

    fecha_afiliacion_pension = models.DateField(
        verbose_name='Fecha Afiliación Pensión',
        null=True,
        blank=True
    )

    arl = models.CharField(
        max_length=50,
        choices=ARL_CHOICES,
        verbose_name='ARL',
        blank=True,
        null=True
    )

    riesgo = models.CharField(
        max_length=10,
        verbose_name='Nivel de Riesgo',
        blank=True,
        null=True,
        help_text='Nivel de riesgo (I, II, III, IV, V)'
    )

    fecha_afiliacion_arl = models.DateField(
        verbose_name='Fecha Afiliación ARL',
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
        verbose_name = 'Seguridad Social'
        verbose_name_plural = 'Seguridad Social'
        ordering = ['-anio', '-fecha_afiliacion_eps']
        db_table = 'seguridad_social'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener un registro por año

    def __str__(self):
        return f"Seguridad Social de {self.trabajador.nombre_completo} ({self.anio})"
