from rest_framework import serializers
from .models import Cronograma


class CronogramaSerializer(serializers.ModelSerializer):
    """Serializer para Cronograma - Solo datos de la tabla cronograma"""

    municipio_ejecucion_display = serializers.CharField(source='get_municipio_ejecucion_display', read_only=True)
    mes_display = serializers.SerializerMethodField()

    class Meta:
        model = Cronograma
        fields = [
            'id',
            'trabajador',
            'mes',
            'mes_display',
            'municipio_ejecucion',
            'municipio_ejecucion_display',
            'salario_cotizacion',
            'dias_laborados',
            'sueldo_devengado',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']

    def get_mes_display(self, obj):
        """Retorna el mes en formato legible (ej: 'Enero 2024')"""
        meses = {
            1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
            5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
            9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
        }
        return f"{meses[obj.mes.month]} {obj.mes.year}"
