from django.contrib import admin
from .models import Proyecto


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'administrativo',
        'construccion_instalaciones',
        'construccion_redes',
        'servicios',
        'mantenimiento_redes'
    ]

    list_filter = [
        'administrativo',
        'construccion_instalaciones',
        'construccion_redes',
        'servicios',
        'mantenimiento_redes'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido'
    ]

    ordering = ['-fecha_creacion']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Tipos de Proyectos', {
            'fields': (
                'administrativo',
                'construccion_instalaciones',
                'construccion_redes',
                'servicios',
                'mantenimiento_redes'
            ),
            'description': 'Marca los tipos de proyectos en los que participa el trabajador'
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']
