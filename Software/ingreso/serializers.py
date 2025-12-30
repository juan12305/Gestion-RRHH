from rest_framework import serializers
from .models import Ingreso


class IngresoSerializer(serializers.ModelSerializer):
    """Serializer para Ingreso - Solo datos de la tabla ingreso"""

    class Meta:
        model = Ingreso
        fields = [
            'id',
            'trabajador',
            'fecha_ingreso',
            'examen_ingreso',
            'fecha_entrega_epp',
            'fecha_entrega_dotacion',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
