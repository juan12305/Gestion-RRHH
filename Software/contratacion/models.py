from django.db import models
from trabajadores.models import Trabajador


class Contratacion(models.Model):
    """
    Modelo de Contratación de trabajadores.
    Relacionado con el modelo Trabajador.
    """

    MUNICIPIOS_NARINO = [
        ('ALBAN', 'Albán'),
        ('ALDANA', 'Aldana'),
        ('ANCUYA', 'Ancuyá'),
        ('ARBOLEDA', 'Arboleda'),
        ('BARBACOAS', 'Barbacoas'),
        ('BELEN', 'Belén'),
        ('BUESACO', 'Buesaco'),
        ('COLON', 'Colón'),
        ('CONSACA', 'Consacá'),
        ('CONTADERO', 'Contadero'),
        ('CORDOBA', 'Córdoba'),
        ('CUASPUD', 'Cuaspúd'),
        ('CUMBAL', 'Cumbal'),
        ('CUMBITARA', 'Cumbitara'),
        ('CHACHAGUI', 'Chachagüí'),
        ('EL_CHARCO', 'El Charco'),
        ('EL_PENOL', 'El Peñol'),
        ('EL_ROSARIO', 'El Rosario'),
        ('EL_TABLON', 'El Tablón'),
        ('EL_TAMBO', 'El Tambo'),
        ('FRANCISCO_PIZARRO', 'Francisco Pizarro'),
        ('FUNES', 'Fúnes'),
        ('GUACHUCAL', 'Guachucal'),
        ('GUAITARILLA', 'Guaitarilla'),
        ('GUALMATN', 'Gualmatán'),
        ('ILES', 'Iles'),
        ('IMUES', 'Imués'),
        ('IPIALES', 'Ipiales'),
        ('LA_CRUZ', 'La Cruz'),
        ('LA_FLORIDA', 'La Florida'),
        ('LA_LLANADA', 'La Llanada'),
        ('LA_TOLA', 'La Tola'),
        ('LA_UNION', 'La Unión'),
        ('LEIVA', 'Leiva'),
        ('LINARES', 'Linares'),
        ('LOS_ANDES', 'Los Andes'),
        ('MAGUI_PAYAN', 'Magüí Payán'),
        ('MALLAMA', 'Mallama'),
        ('MOSQUERA', 'Mosquera'),
        ('NARINO', 'Nariño'),
        ('OLAYA_HERRERA', 'Olaya Herrera'),
        ('OSPINA', 'Ospina'),
        ('PASTO', 'Pasto'),
        ('POLICARPA', 'Policarpa'),
        ('POTOSI', 'Potosí'),
        ('PROVIDENCIA', 'Providencia'),
        ('PUERRES', 'Puerres'),
        ('PUPIALES', 'Pupiales'),
        ('RICAURTE', 'Ricaurte'),
        ('ROBERTO_PAYAN', 'Roberto Payán'),
        ('SAMANIEGO', 'Samaniego'),
        ('SAN_BERNARDO', 'San Bernardo'),
        ('SAN_LORENZO', 'San Lorenzo'),
        ('SAN_PABLO', 'San Pablo'),
        ('SAN_PEDRO_CARTAGO', 'San Pedro de Cartago'),
        ('SANDONA', 'Sandoná'),
        ('SANTA_BARBARA', 'Santa Bárbara'),
        ('SANTACRUZ', 'Santacruz'),
        ('SAPUYES', 'Sapuyes'),
        ('TAMINANGO', 'Taminango'),
        ('TANGUA', 'Tangua'),
        ('TUMACO', 'Tumaco'),
        ('TUQUERRES', 'Túquerres'),
        ('YACUANQUER', 'Yacuanquer'),
    ]

    # Relación con Trabajador (permite múltiples contrataciones por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='contrataciones',
        verbose_name='Trabajador'
    )

    # Año de la contratación (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año de la contratación (ej: 2024, 2025)',
        db_index=True,
        default=2025
    )

    # Información de contratación
    TIPO_CONTRATO_CHOICES = [
        ('PRESTACION_SERVICIOS', 'Prestación de Servicios'),
        ('TERMINO_INDEFINIDO', 'Término Indefinido'),
        ('TERMINO_FIJO', 'Término Fijo'),
        ('OBRA_LABOR', 'Obra o Labor'),
        ('APRENDIZAJE', 'Aprendizaje'),
    ]

    tipo_contrato = models.CharField(
        max_length=50,
        choices=TIPO_CONTRATO_CHOICES,
        verbose_name='Tipo de Contrato'
    )

    cargo = models.CharField(
        max_length=200,
        verbose_name='Cargo'
    )

    salario_contratado = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Salario Contratado',
        help_text='Salario en pesos colombianos'
    )

    municipio_base = models.CharField(
        max_length=50,
        choices=MUNICIPIOS_NARINO,
        verbose_name='Municipio Base'
    )

    fecha_inicio_contrato = models.DateField(
        verbose_name='Fecha Inicio Contrato',
        null=True,
        blank=True
    )

    fecha_final_contrato = models.DateField(
        verbose_name='Fecha Final Contrato',
        null=True,
        blank=True,
        help_text='Dejar vacío si es contrato indefinido'
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
        verbose_name = 'Contratación'
        verbose_name_plural = 'Contrataciones'
        ordering = ['-anio', '-fecha_inicio_contrato']
        db_table = 'contratacion'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener una contratación por año

    def __str__(self):
        return f"{self.trabajador.nombre_completo} - {self.cargo} ({self.anio})"

    @property
    def contrato_activo(self):
        """Verifica si el contrato está activo"""
        from datetime import date
        today = date.today()
        if self.fecha_final_contrato:
            return self.fecha_inicio_contrato <= today <= self.fecha_final_contrato
        return self.fecha_inicio_contrato <= today

    @property
    def dias_restantes(self):
        """Calcula los días restantes del contrato"""
        if not self.fecha_final_contrato:
            return None
        from datetime import date
        today = date.today()
        if self.fecha_final_contrato < today:
            return 0
        return (self.fecha_final_contrato - today).days
