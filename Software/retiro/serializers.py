from rest_framework import serializers
from .models import Retiro


class RetiroSerializer(serializers.ModelSerializer):
    """Serializer para Retiro - Solo datos de la tabla retiro"""

    class Meta:
        model = Retiro
        fields = [
            'id',
            'trabajador',
            'fecha_retiro',
            'fecha_liquidacion',
            'valor_liquidacion',
            'fecha_examen_retiro',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
