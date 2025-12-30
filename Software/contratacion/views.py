from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models
from .models import Contratacion
from .serializers import ContratacionSerializer, ContratacionListSerializer


class ContratacionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar contrataciones.
    Proporciona operaciones CRUD completas.
    """
    queryset = Contratacion.objects.all().select_related('trabajador')
    serializer_class = ContratacionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['trabajador', 'municipio_base', 'fecha_inicio_contrato']
    search_fields = ['cargo', 'trabajador__primer_nombre', 'trabajador__primer_apellido', 'municipio_base']
    ordering_fields = ['fecha_inicio_contrato', 'fecha_final_contrato', 'salario_contratado']
    ordering = ['-fecha_inicio_contrato']

    def get_serializer_class(self):
        """Usar serializer simplificado para listado"""
        if self.action == 'list':
            return ContratacionListSerializer
        return ContratacionSerializer

    @action(detail=False, methods=['get'])
    def contratos_activos(self, request):
        """Endpoint para obtener solo los contratos activos"""
        from datetime import date
        today = date.today()
        contratos = self.queryset.filter(
            fecha_inicio_contrato__lte=today
        ).filter(
            models.Q(fecha_final_contrato__gte=today) | models.Q(fecha_final_contrato__isnull=True)
        )
        serializer = self.get_serializer(contratos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def por_trabajador(self, request, pk=None):
        """Obtener todas las contrataciones de un trabajador específico"""
        contrataciones = self.queryset.filter(trabajador_id=pk)
        serializer = self.get_serializer(contrataciones, many=True)
        return Response(serializer.data)
