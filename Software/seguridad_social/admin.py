from django.contrib import admin
from .models import SeguridadSocial


@admin.register(SeguridadSocial)
class SeguridadSocialAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'eps',
        'fondo_pension',
        'arl',
        'riesgo'
    ]

    list_filter = [
        'arl',
        'riesgo',
        'fecha_afiliacion_eps'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido',
        'eps',
        'fondo_pension',
        'arl'
    ]

    ordering = ['-fecha_creacion']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Información de EPS', {
            'fields': (
                'eps',
                'fecha_afiliacion_eps'
            )
        }),
        ('Información de Caja de Compensación', {
            'fields': (
                'caja_compensacion',
                'fecha_afiliacion_caja'
            )
        }),
        ('Información de Fondo de Pensión', {
            'fields': (
                'fondo_pension',
                'fecha_afiliacion_pension'
            )
        }),
        ('Información de ARL', {
            'fields': (
                'arl',
                'riesgo',
                'fecha_afiliacion_arl'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']
