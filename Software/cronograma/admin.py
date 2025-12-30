from django.contrib import admin
from .models import Cronograma


@admin.register(Cronograma)
class CronogramaAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'mes',
        'municipio_ejecucion',
        'salario_cotizacion',
        'dias_laborados',
        'sueldo_devengado'
    ]

    list_filter = [
        'mes',
        'municipio_ejecucion'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido'
    ]

    ordering = ['-mes', 'trabajador']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Período', {
            'fields': ('mes',)
        }),
        ('Información del Cronograma', {
            'fields': (
                'municipio_ejecucion',
                'salario_cotizacion',
                'dias_laborados',
                'sueldo_devengado'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']

    date_hierarchy = 'mes'
