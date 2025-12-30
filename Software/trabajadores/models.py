from django.db import models


class Trabajador(models.Model):
    """
    Modelo principal de Trabajadores.
    Esta tabla estará relacionada con: contratacion, ingreso, retiro,
    seguridad_social, proyectos y cronograma.
    """

    TIPO_IDENTIFICACION_CHOICES = [
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('PA', 'Pasaporte'),
        ('TI', 'Tarjeta de Identidad'),
    ]

    # Información de identificación
    tipo = models.CharField(
        max_length=2,
        choices=TIPO_IDENTIFICACION_CHOICES,
        verbose_name='Tipo de Identificación'
    )

    numero = models.CharField(
        max_length=20,
        verbose_name='Número de Identificación',
        help_text='Número de documento de identidad'
    )

    fecha_expedicion_cedula = models.DateField(
        verbose_name='Fecha de Expedición de Cédula'
    )

    fecha_nacimiento = models.DateField(
        verbose_name='Fecha de Nacimiento'
    )

    # Nombres y apellidos
    primer_apellido = models.CharField(
        max_length=50,
        verbose_name='Primer Apellido'
    )

    segundo_apellido = models.CharField(
        max_length=50,
        verbose_name='Segundo Apellido',
        blank=True,
        null=True
    )

    primer_nombre = models.CharField(
        max_length=50,
        verbose_name='Primer Nombre'
    )

    segundo_nombre = models.CharField(
        max_length=50,
        verbose_name='Segundo Nombre',
        blank=True,
        null=True
    )

    # Año del trabajador
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año al que pertenece el trabajador (ej: 2024, 2025)',
        db_index=True,
        default=2025
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
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'
        ordering = ['primer_apellido', 'segundo_apellido', 'primer_nombre']
        db_table = 'trabajadores'

    def __str__(self):
        nombre_completo = f"{self.primer_apellido}"
        if self.segundo_apellido:
            nombre_completo += f" {self.segundo_apellido}"
        nombre_completo += f", {self.primer_nombre}"
        if self.segundo_nombre:
            nombre_completo += f" {self.segundo_nombre}"
        return f"{nombre_completo} ({self.numero})"

    @property
    def nombre_completo(self):
        """Retorna el nombre completo del trabajador"""
        nombre = f"{self.primer_nombre}"
        if self.segundo_nombre:
            nombre += f" {self.segundo_nombre}"
        nombre += f" {self.primer_apellido}"
        if self.segundo_apellido:
            nombre += f" {self.segundo_apellido}"
        return nombre

    @property
    def edad(self):
        """Calcula la edad del trabajador"""
        from datetime import date
        today = date.today()
        return today.year - self.fecha_nacimiento.year - (
            (today.month, today.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day)
        )
