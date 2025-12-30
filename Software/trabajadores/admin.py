from django.contrib import admin
from .models import Trabajador


@admin.register(Trabajador)
class TrabajadorAdmin(admin.ModelAdmin):
    list_display = [
        'numero',
        'tipo',
        'primer_apellido',
        'segundo_apellido',
        'primer_nombre',
        'segundo_nombre',
        'fecha_nacimiento',
        'get_edad'
    ]

    list_filter = [
        'tipo',
        'fecha_nacimiento',
        'fecha_expedicion_cedula'
    ]

    search_fields = [
        'numero',
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido'
    ]

    ordering = ['primer_apellido', 'primer_nombre']

    fieldsets = (
        ('Información de Identificación', {
            'fields': ('tipo', 'numero', 'fecha_expedicion_cedula')
        }),
        ('Información Personal', {
            'fields': (
                'primer_nombre',
                'segundo_nombre',
                'primer_apellido',
                'segundo_apellido',
                'fecha_nacimiento'
            )
        }),
        ('Información del Sistema', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ['fecha_creacion', 'fecha_actualizacion']

    def get_edad(self, obj):
        return f"{obj.edad} años"
    get_edad.short_description = 'Edad'
    get_edad.admin_order_field = 'fecha_nacimiento'
