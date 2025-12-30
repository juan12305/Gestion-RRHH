from rest_framework import serializers
from .models import Proyecto


class ProyectoSerializer(serializers.ModelSerializer):
    """Serializer para Proyectos - Solo datos de la tabla proyectos"""

    class Meta:
        model = Proyecto
        fields = [
            'id',
            'trabajador',
            'administrativo',
            'construccion_instalaciones',
            'construccion_redes',
            'servicios',
            'mantenimiento_redes',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
