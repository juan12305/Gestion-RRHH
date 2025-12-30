# 🔄 Cambios para Sistema Multi-Año

Guía completa para implementar el sistema de histórico multi-año (2024, 2025, 2026, etc.)

---

## ✅ Modelos Ya Modificados

- ✅ **Contratacion**: ForeignKey + campo `anio` + unique_together
- ✅ **Ingreso**: ForeignKey + campo `anio` + unique_together
- ✅ **Retiro**: ForeignKey + campo `anio` + unique_together

---

## 📝 PASO 1: Modificar Modelos Restantes

### A) Modificar `seguridad_social/models.py`

**REEMPLAZAR** el contenido del archivo con esto:

```python
from django.db import models
from trabajadores.models import Trabajador


class SeguridadSocial(models.Model):
    """
    Modelo de Seguridad Social de trabajadores.
    Permite múltiples registros por año para histórico.
    """

    ARL_CHOICES = [
        ('POSITIVA', 'Positiva'),
        ('SURA', 'Sura'),
        ('BOLIVAR', 'Bolívar'),
        ('EQUIDAD', 'Equidad'),
        ('LIBERTY', 'Liberty'),
        ('MAPFRE', 'Mapfre'),
        ('COLMENA', 'Colmena'),
        ('OTRA', 'Otra'),
    ]

    # Relación con Trabajador (permite múltiples registros por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='seguridad_social_registros',
        verbose_name='Trabajador'
    )

    # Año del registro (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del registro (ej: 2024, 2025)',
        db_index=True
    )

    # Información de seguridad social
    eps = models.CharField(
        max_length=100,
        verbose_name='EPS',
        blank=True,
        null=True
    )

    fecha_afiliacion_eps = models.DateField(
        verbose_name='Fecha Afiliación EPS',
        null=True,
        blank=True
    )

    caja_compensacion = models.CharField(
        max_length=100,
        verbose_name='Caja de Compensación',
        blank=True,
        null=True
    )

    fecha_afiliacion_caja = models.DateField(
        verbose_name='Fecha Afiliación Caja',
        null=True,
        blank=True
    )

    fondo_pension = models.CharField(
        max_length=100,
        verbose_name='Fondo de Pensión',
        blank=True,
        null=True
    )

    fecha_afiliacion_pension = models.DateField(
        verbose_name='Fecha Afiliación Pensión',
        null=True,
        blank=True
    )

    arl = models.CharField(
        max_length=50,
        choices=ARL_CHOICES,
        verbose_name='ARL',
        blank=True,
        null=True
    )

    riesgo = models.CharField(
        max_length=10,
        verbose_name='Nivel de Riesgo',
        blank=True,
        null=True,
        help_text='Nivel de riesgo (I, II, III, IV, V)'
    )

    fecha_afiliacion_arl = models.DateField(
        verbose_name='Fecha Afiliación ARL',
        null=True,
        blank=True
    )

    # Campos de auditoría
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        verbose_name = 'Seguridad Social'
        verbose_name_plural = 'Seguridad Social'
        ordering = ['-anio', '-fecha_afiliacion_eps']
        db_table = 'seguridad_social'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener un registro por año

    def __str__(self):
        return f"Seguridad Social de {self.trabajador.nombre_completo} ({self.anio})"
```

---

### B) Modificar `proyectos/models.py`

**REEMPLAZAR** el contenido del archivo con esto:

```python
from django.db import models
from trabajadores.models import Trabajador


class Proyecto(models.Model):
    """
    Modelo de asignación de proyectos a trabajadores.
    Permite múltiples asignaciones por año para histórico.
    """

    # Relación con Trabajador (permite múltiples proyectos por año)
    trabajador = models.ForeignKey(
        Trabajador,
        on_delete=models.CASCADE,
        related_name='proyectos_asignados',
        verbose_name='Trabajador'
    )

    # Año del proyecto (para histórico multi-año)
    anio = models.IntegerField(
        verbose_name='Año',
        help_text='Año del proyecto (ej: 2024, 2025)',
        db_index=True
    )

    # Tipos de proyectos (checkboxes en Excel)
    administrativo = models.BooleanField(
        default=False,
        verbose_name='Administrativo'
    )

    construccion_instalaciones = models.BooleanField(
        default=False,
        verbose_name='Construcción de Instalaciones'
    )

    construccion_redes = models.BooleanField(
        default=False,
        verbose_name='Construcción de Redes'
    )

    servicios = models.BooleanField(
        default=False,
        verbose_name='Servicios'
    )

    mantenimiento_redes = models.BooleanField(
        default=False,
        verbose_name='Mantenimiento de Redes'
    )

    # Campos de auditoría
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )

    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['-anio']
        db_table = 'proyectos'
        unique_together = [['trabajador', 'anio']]  # Un trabajador solo puede tener una asignación de proyecto por año

    def __str__(self):
        proyectos_activos = []
        if self.administrativo:
            proyectos_activos.append('Administrativo')
        if self.construccion_instalaciones:
            proyectos_activos.append('Construcción Instalaciones')
        if self.construccion_redes:
            proyectos_activos.append('Construcción Redes')
        if self.servicios:
            proyectos_activos.append('Servicios')
        if self.mantenimiento_redes:
            proyectos_activos.append('Mantenimiento Redes')

        proyectos_str = ', '.join(proyectos_activos) if proyectos_activos else 'Sin proyectos'
        return f"{self.trabajador.nombre_completo} - {proyectos_str} ({self.anio})"
```

---

### C) Modificar `cronograma/models.py`

**AGREGAR** el campo `anio` al modelo existente. Encuentra la línea donde está el campo `trabajador` y agrega el campo `anio` justo después:

```python
# Año del cronograma (extraído del campo mes, para facilitar búsquedas)
anio = models.IntegerField(
    verbose_name='Año',
    help_text='Año del cronograma (se extrae del campo mes)',
    db_index=True
)
```

También **MODIFICA** el `Meta` para agregar índice por año:

```python
class Meta:
    verbose_name = 'Cronograma'
    verbose_name_plural = 'Cronogramas'
    ordering = ['-mes']
    db_table = 'cronograma'
    unique_together = [['trabajador', 'mes']]
    indexes = [
        models.Index(fields=['trabajador', 'anio']),
        models.Index(fields=['anio', 'mes']),
    ]
```

Y **MODIFICA** el método `save()` para auto-calcular el año:

```python
def save(self, *args, **kwargs):
    # Auto-calcular el año desde el campo mes
    if self.mes:
        self.anio = self.mes.year
    super().save(*args, **kwargs)
```

---

## 🔧 PASO 2: Crear y Aplicar Migraciones

Ejecuta estos comandos en orden:

```bash
# 1. Crear migraciones
python manage.py makemigrations contratacion
python manage.py makemigrations ingreso
python manage.py makemigrations retiro
python manage.py makemigrations seguridad_social
python manage.py makemigrations proyectos
python manage.py makemigrations cronograma

# 2. Aplicar migraciones
python manage.py migrate
```

**NOTA IMPORTANTE**: Django te preguntará qué hacer con los datos existentes cuando agregues el campo `anio`. Responde:
- Opción: **"Provide a one-off default now"**
- Valor: **2025** (para los datos que ya tienes importados)

---

## 📊 PASO 3: Actualizar Datos Existentes

Después de aplicar las migraciones, ejecuta este script para asignar el año 2025 a todos los datos actuales:

```bash
python manage.py shell
```

Luego ejecuta:

```python
from contratacion.models import Contratacion
from ingreso.models import Ingreso
from retiro.models import Retiro
from seguridad_social.models import SeguridadSocial
from proyectos.models import Proyecto
from cronograma.models import Cronograma

# Actualizar todos los registros existentes a 2025
Contratacion.objects.filter(anio__isnull=True).update(anio=2025)
Ingreso.objects.filter(anio__isnull=True).update(anio=2025)
Retiro.objects.filter(anio__isnull=True).update(anio=2025)
SeguridadSocial.objects.filter(anio__isnull=True).update(anio=2025)
Proyecto.objects.filter(anio__isnull=True).update(anio=2025)
Cronograma.objects.filter(anio__isnull=True).update(anio=2025)

print("✅ Todos los registros actualizados a año 2025")
exit()
```

---

## 📝 PASO 4: Actualizar Comando de Importación

El comando `importar_excel.py` debe aceptar el parámetro `--año`:

**Agregar en `add_arguments`:**

```python
def add_arguments(self, parser):
    parser.add_argument(
        '--año',
        type=int,
        help='Año de los datos a importar (ej: 2024, 2025)',
        default=2025
    )
    # ... otros argumentos existentes
```

**Usar el año en la creación de registros:**

```python
def handle(self, *args, **options):
    año = options['año']

    # ... código de importación ...

    # Al crear Contratacion:
    Contratacion.objects.update_or_create(
        trabajador=trabajador,
        anio=año,  # <-- Agregar esto
        defaults={...}
    )

    # Al crear Ingreso:
    Ingreso.objects.update_or_create(
        trabajador=trabajador,
        anio=año,  # <-- Agregar esto
        defaults={...}
    )

    # Y así para todos los modelos...
```

---

## 📤 PASO 5: Actualizar Comando de Exportación

El comando `exportar_excel.py` debe aceptar el parámetro `--año`:

**Agregar en `add_arguments`:**

```python
def add_arguments(self, parser):
    parser.add_argument(
        '--año',
        type=int,
        help='Año de los datos a exportar (ej: 2024, 2025)',
        default=2025
    )
    # ... otros argumentos existentes
```

**Filtrar por año al obtener datos:**

```python
def handle(self, *args, **options):
    año = options['año']

    # ... código de exportación ...

    for trabajador in trabajadores:
        # Obtener contratación del año específico
        try:
            contratacion = trabajador.contrataciones.get(anio=año)
            # ... escribir datos
        except Contratacion.DoesNotExist:
            pass

        # Igual para todos los otros modelos
```

---

## 🌐 PASO 6: Actualizar API/Views

En `trabajadores/views.py`, los endpoints anidados deben soportar filtrado por año:

**Ejemplo para contratación:**

```python
@action(detail=True, methods=['get', 'post'], url_path='contratacion')
def contratacion(self, request, pk=None):
    trabajador = self.get_object()
    año = request.query_params.get('año', datetime.now().year)

    if request.method == 'GET':
        try:
            # Buscar por año
            contratacion_obj = trabajador.contrataciones.get(anio=año)
            serializer = ContratacionSerializer(contratacion_obj)
            return Response(serializer.data)
        except Contratacion.DoesNotExist:
            return Response(
                {'error': f'No hay contratación para el año {año}'},
                status=status.HTTP_404_NOT_FOUND
            )
```

---

## 🚀 PASO 7: Importar Datos de 2024

Una vez todo esté listo:

```bash
# Importar datos de 2024
python manage.py importar_excel --año 2024 --template "excel/FORMATO_2024.xlsx"

# Importar datos de 2025 (ya los tienes, pero puedes re-importar)
python manage.py importar_excel --año 2025 --template "excel/1. FORMATO RELACION DE PERSONAL_OCTUBRE.xlsx"
```

---

## ✅ Resultado Final

Después de aplicar todos estos cambios:

### Podrás hacer:

```bash
# Importar datos de cualquier año
python manage.py importar_excel --año 2024
python manage.py importar_excel --año 2025
python manage.py importar_excel --año 2026

# Exportar datos de cualquier año
python manage.py exportar_excel --año 2024
python manage.py exportar_excel --año 2025

# Consultar en API por año
GET /api/trabajadores/1/contratacion/?año=2024
GET /api/trabajadores/1/contratacion/?año=2025
```

### Base de datos tendrá:

```
Trabajador ID=1 (Juan Pérez - CC 123456)
  ├─ Contratacion 2024 (Ingeniero, $2.5M)
  ├─ Contratacion 2025 (Supervisor, $3M)
  ├─ Contratacion 2026 (Gerente, $3.5M)  ← NUEVO
  ├─ Ingreso 2024
  ├─ Ingreso 2025
  ├─ Cronograma Enero 2024
  ├─ Cronograma Febrero 2024
  ├─ Cronograma Enero 2025
  ├─ Cronograma Febrero 2025
  └─ ... y así sucesivamente
```

---

## 📌 Notas Importantes

1. **Backup de la base de datos** antes de aplicar migraciones
2. Los trabajadores NO se duplican - solo sus datos relacionados
3. Cada año tiene su propio conjunto de: contratación, ingreso, retiro, seguridad social, proyecto y cronogramas
4. Las relaciones anteriores `trabajador.contratacion` ahora son `trabajador.contrataciones.all()`
5. Para obtener datos de un año específico: `trabajador.contrataciones.get(anio=2025)`

---

**¿Listo para empezar?** 🚀

1. Copia y pega los cambios de los modelos
2. Ejecuta las migraciones
3. Actualiza el año en los datos existentes
4. ¡Empieza a importar 2024!
