from django.db import models
from trabajadores.models import Trabajador


class Cronograma(models.Model):
    """
    Modelo de Cronograma de trabajadores.
    Relación muchos a uno con Trabajador.
    Un trabajador puede tener múltiples registros de cronograma (uno por cada mes).
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

    # Relación con Trabajador (muchos a uno)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='cronogramas',
        verbose_name='Trabajador'
    )

    # Mes y año del cronograma
    mes = models.DateField(
        verbose_name='Mes/Año',
        help_text='Primer día del mes (ej: 2024-01-01 para Enero 2024)'
    )

    # Año del cronograma (extraído del campo mes, para facilitar búsquedas)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del cronograma (se extrae del campo mes)',
        db_index=True,
        default=2025
    )

    # Información del cronograma mensual
    municipio_ejecucion = models.CharField(
        max_length=50,
        choices=MUNICIPIOS_NARINO,
        verbose_name='Municipio de Ejecución'
    )

    salario_cotizacion = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='Salario Cotización (PILA)',
        help_text='Salario de cotización en pesos colombianos'
    )

    dias_laborados = models.IntegerField(
        verbose_name='Días Laborados (Mes)',
        help_text='Número de días trabajados en el mes'
    )

    sueldo_devengado = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        verbose_name='Sueldo Devengado (Mes)',
        help_text='Sueldo devengado en el mes en pesos colombianos'
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
        verbose_name = 'Cronograma'
        verbose_name_plural = 'Cronogramas'
        db_table = 'cronograma'
        ordering = ['-mes']
        unique_together = ['trabajador', 'mes']  # Un trabajador solo puede tener un registro por mes
        indexes = [
            models.Index(fields=['trabajador', 'anio']),
            models.Index(fields=['anio', 'mes']),
        ]

    def save(self, *args, **kwargs):
        # Auto-calcular el año desde el campo mes
        if self.mes:
            self.anio = self.mes.year
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Cronograma de {self.trabajador.nombre_completo} - {self.mes.strftime('%B %Y')}"
