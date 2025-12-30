from django.contrib import admin
from .models import Retiro


@admin.register(Retiro)
class RetiroAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'fecha_retiro',
        'fecha_liquidacion',
        'valor_liquidacion',
        'fecha_examen_retiro'
    ]

    list_filter = [
        'fecha_retiro',
        'fecha_liquidacion'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido'
    ]

    ordering = ['-fecha_retiro']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Información de Retiro', {
            'fields': (
                'fecha_retiro',
                'fecha_liquidacion',
                'valor_liquidacion',
                'fecha_examen_retiro'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']
