from django.contrib import admin
from .models import Ingreso


@admin.register(Ingreso)
class IngresoAdmin(admin.ModelAdmin):
    list_display = [
        'trabajador',
        'fecha_ingreso',
        'examen_ingreso',
        'fecha_entrega_epp',
        'fecha_entrega_dotacion'
    ]

    list_filter = [
        'fecha_ingreso',
        'examen_ingreso'
    ]

    search_fields = [
        'trabajador__numero',
        'trabajador__primer_nombre',
        'trabajador__primer_apellido'
    ]

    ordering = ['-fecha_ingreso']

    fieldsets = (
        ('Información del Trabajador', {
            'fields': ('trabajador',)
        }),
        ('Información de Ingreso', {
            'fields': (
                'fecha_ingreso',
                'examen_ingreso',
                'fecha_entrega_epp',
                'fecha_entrega_dotacion'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']
