from django.contrib import admin
from .models import Contratacion


@admin.register(Contratacion)
class ContratacionAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'tipo_contrato',
        'cargo',
        'salario_contratado',
        'municipio_base',
        'fecha_inicio_contrato',
        'fecha_final_contrato',
        'get_estado_contrato'
    ]

    list_filter = [
        'tipo_contrato',
        'municipio_base',
        'fecha_inicio_contrato',
        'fecha_final_contrato'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido',
        'cargo',
        'municipio_base'
    ]

    ordering = ['-fecha_inicio_contrato']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Información de Contratación', {
            'fields': (
                'tipo_contrato',
                'cargo',
                'salario_contratado',
                'municipio_base',
                'fecha_inicio_contrato',
                'fecha_final_contrato'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']

    def get_estado_contrato(self, obj):
        return "Activo" if obj.contrato_activo else "Inactivo"
    get_estado_contrato.short_description = 'Estado'
    get_estado_contrato.boolean = True
