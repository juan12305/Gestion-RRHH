from rest_framework import serializers
from .models import Trabajador
from proyectos.models import Proyecto


class TrabajadorSerializer(serializers.ModelSerializer):
    """Serializer básico para el modelo Trabajador (sin relaciones)"""

    nombre_completo = serializers.ReadOnlyField()
    edad = serializers.ReadOnlyField()

    class Meta:
        model = Trabajador
        fields = [
            'id',
            'numero',
            'tipo',
            'fecha_expedicion_cedula',
            'fecha_nacimiento',
            'primer_apellido',
            'segundo_apellido',
            'primer_nombre',
            'segundo_nombre',
            'nombre_completo',
            'edad',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']


class TrabajadorDetalleSerializer(serializers.ModelSerializer):
    """Serializer completo con todas las relaciones del trabajador"""

    nombre_completo = serializers.ReadOnlyField()
    edad = serializers.ReadOnlyField()

    # Relaciones uno a uno
    contratacion = serializers.SerializerMethodField()
    ingreso = serializers.SerializerMethodField()
    retiro = serializers.SerializerMethodField()
    seguridad_social = serializers.SerializerMethodField()
    proyecto = serializers.SerializerMethodField()

    class Meta:
        model = Trabajador
        fields = [
            'id',
            'numero',
            'tipo',
            'fecha_expedicion_cedula',
            'fecha_nacimiento',
            'primer_apellido',
            'segundo_apellido',
            'primer_nombre',
            'segundo_nombre',
            'nombre_completo',
            'edad',
            'contratacion',
            'ingreso',
            'retiro',
            'seguridad_social',
            'proyecto',
            'fecha_creacion',
            'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']

    def get_contratacion(self, obj):
        """Obtiene la contratación del trabajador para el año seleccionado"""
        from contratacion.serializers import ContratacionSerializer
        try:
            anio = self.context.get('anio', 2025)
            contratacion = obj.contrataciones.filter(anio=anio).first()
            if contratacion:
                return ContratacionSerializer(contratacion).data
            return None
        except:
            return None

    def get_ingreso(self, obj):
        """Obtiene el ingreso del trabajador para el año seleccionado"""
        from ingreso.serializers import IngresoSerializer
        try:
            anio = self.context.get('anio', 2025)
            ingreso = obj.ingresos.filter(anio=anio).first()
            if ingreso:
                return IngresoSerializer(ingreso).data
            return None
        except:
            return None

    def get_retiro(self, obj):
        """Obtiene el retiro del trabajador para el año seleccionado"""
        from retiro.serializers import RetiroSerializer
        try:
            anio = self.context.get('anio', 2025)
            retiro = obj.retiros.filter(anio=anio).first()
            if retiro:
                return RetiroSerializer(retiro).data
            return None
        except:
            return None

    def get_seguridad_social(self, obj):
        """Obtiene la seguridad social del trabajador para el año seleccionado"""
        from seguridad_social.serializers import SeguridadSocialSerializer
        try:
            anio = self.context.get('anio', 2025)
            seguridad_social = obj.seguridad_social_registros.filter(anio=anio).first()
            if seguridad_social:
                return SeguridadSocialSerializer(seguridad_social).data
            return None
        except:
            return None

    def get_proyecto(self, obj):
        """Obtiene el proyecto del trabajador para el año seleccionado"""
        from proyectos.serializers import ProyectoSerializer
        try:
            anio = self.context.get('anio', 2025)
            proyecto = obj.proyectos_asignados.filter(anio=anio).first()
            if proyecto:
                return ProyectoSerializer(proyecto).data
            return None
        except:
            return None


class TrabajadorListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listado de trabajadores"""

    nombre_completo = serializers.ReadOnlyField()

    class Meta:
        model = Trabajador
        fields = [
            'id',
            'numero',
            'tipo',
            'nombre_completo',
            'fecha_nacimiento'
        ]
