from rest_framework import serializers
from .models import Contratacion


class ContratacionSerializer(serializers.ModelSerializer):
    """Serializer completo para Contratacion - Solo datos de la tabla contratación"""

    contrato_activo = serializers.ReadOnlyField()
    dias_restantes = serializers.ReadOnlyField()
    municipio_base_display = serializers.CharField(source='get_municipio_base_display', read_only=True)
    tipo_contrato_display = serializers.CharField(source='get_tipo_contrato_display', read_only=True)

    class Meta:
        model = Contratacion
        fields = [
            'id',
            'trabajador',
            'tipo_contrato',
            'tipo_contrato_display',
            'cargo',
            'salario_contratado',
            'municipio_base',
            'municipio_base_display',
            'fecha_inicio_contrato',
            'fecha_final_contrato',
            'contrato_activo',
            'dias_restantes',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']


class ContratacionListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listado de contrataciones"""

    trabajador_nombre = serializers.CharField(source='trabajador.nombre_completo', read_only=True)
    municipio_base_display = serializers.CharField(source='get_municipio_base_display', read_only=True)
    tipo_contrato_display = serializers.CharField(source='get_tipo_contrato_display', read_only=True)
    contrato_activo = serializers.ReadOnlyField()

    class Meta:
        model = Contratacion
        fields = [
            'id',
            'trabajador',
            'trabajador_nombre',
            'tipo_contrato_display',
            'cargo',
            'salario_contratado',
            'municipio_base_display',
            'fecha_inicio_contrato',
            'fecha_final_contrato',
            'contrato_activo'
        ]
