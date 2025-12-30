from rest_framework import serializers
from .models import SeguridadSocial


class SeguridadSocialSerializer(serializers.ModelSerializer):
    """Serializer para Seguridad Social - Solo datos de la tabla seguridad_social"""

    arl_display = serializers.CharField(source='get_arl_display', read_only=True)
    riesgo_display = serializers.CharField(source='get_riesgo_display', read_only=True)

    class Meta:
        model = SeguridadSocial
        fields = [
            'id',
            'trabajador',
            'eps',
            'fecha_afiliacion_eps',
            'caja_compensacion',
            'fecha_afiliacion_caja',
            'fondo_pension',
            'fecha_afiliacion_pension',
            'arl',
            'arl_display',
            'riesgo',
            'riesgo_display',
            'fecha_afiliacion_arl',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
