# 📚 Guía de API - Postman Collection

Sistema de Gestión de Recursos Humanos - Documentación de Endpoints

**Base URL:** `http://localhost:8000`

---

## 🔐 AUTENTICACIÓN

### 1. Login (Obtener Tokens)

```http
POST /api/auth/login/
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "username": "admin",
    "password": "tu_contraseña"
}
```

**Respuesta (200 OK):**
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "is_superuser": true,
        "is_staff": true
    }
}
```

**Nota:** Guarda el token `access` para usarlo en las peticiones autenticadas.

---

### 2. Obtener Usuario Actual

```http
GET /api/auth/user/
Authorization: Bearer {access_token}
```

**Respuesta (200 OK):**
```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "is_superuser": true,
    "is_staff": true
}
```

---

### 3. Logout

```http
POST /api/auth/logout/
Authorization: Bearer {access_token}
```

**Respuesta (200 OK):**
```json
{
    "message": "Logout exitoso. Elimina los tokens del cliente."
}
```

---

## 👥 TRABAJADORES

### 4. Listar Todos los Trabajadores

```http
GET /api/trabajadores/
Authorization: Bearer {access_token}
```

**Query Params (opcionales):**
- `?tipo=CC` - Filtrar por tipo de documento
- `?search=Juan` - Buscar por nombre/apellido/número
- `?ordering=-fecha_nacimiento` - Ordenar

**Respuesta (200 OK):**
```json
[
    {
        "id": 1,
        "tipo": "CC",
        "numero": "1234567890",
        "nombre_completo": "Juan Pérez García",
        "fecha_nacimiento": "1990-05-15",
        "fecha_expedicion_cedula": "2008-03-20",
        "primer_nombre": "Juan",
        "segundo_nombre": "Carlos",
        "primer_apellido": "Pérez",
        "segundo_apellido": "García",
        "fecha_creacion": "2024-01-15T10:30:00Z",
        "fecha_actualizacion": "2024-01-15T10:30:00Z"
    }
]
```

---

### 5. Crear Trabajador

```http
POST /api/trabajadores/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "tipo": "CC",
    "numero": "1234567890",
    "fecha_expedicion_cedula": "2008-03-20",
    "fecha_nacimiento": "1990-05-15",
    "primer_apellido": "Pérez",
    "segundo_apellido": "García",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos"
}
```

**Respuesta (201 Created):**
```json
{
    "id": 142,
    "tipo": "CC",
    "numero": "1234567890",
    "nombre_completo": "Juan Carlos Pérez García",
    "fecha_nacimiento": "1990-05-15",
    "fecha_expedicion_cedula": "2008-03-20",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos",
    "primer_apellido": "Pérez",
    "segundo_apellido": "García",
    "fecha_creacion": "2024-12-28T12:00:00Z",
    "fecha_actualizacion": "2024-12-28T12:00:00Z"
}
```

---

### 6. Obtener Trabajador por ID

```http
GET /api/trabajadores/{id}/
Authorization: Bearer {access_token}
```

**Ejemplo:**
```http
GET /api/trabajadores/1/
```

---

### 7. Actualizar Trabajador (Completo)

```http
PUT /api/trabajadores/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "tipo": "CC",
    "numero": "1234567890",
    "fecha_expedicion_cedula": "2008-03-20",
    "fecha_nacimiento": "1990-05-15",
    "primer_apellido": "Pérez",
    "segundo_apellido": "García",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos"
}
```

---

### 8. Actualizar Trabajador (Parcial)

```http
PATCH /api/trabajadores/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "primer_nombre": "Juan Pablo"
}
```

---

### 9. Eliminar Trabajador

```http
DELETE /api/trabajadores/{id}/
Authorization: Bearer {access_token}
```

**Respuesta (204 No Content)**

---

### 10. Obtener Datos Completos del Trabajador

Incluye todas las relaciones (contratación, ingreso, retiro, etc.)

```http
GET /api/trabajadores/{id}/datos_completos/
Authorization: Bearer {access_token}
```

**Respuesta (200 OK):**
```json
{
    "id": 1,
    "tipo": "CC",
    "numero": "1234567890",
    "nombre_completo": "Juan Carlos Pérez García",
    "contratacion": {
        "id": 1,
        "tipo_contrato": "OL",
        "cargo": "Ingeniero",
        "salario_contratado": "2500000.00"
    },
    "ingreso": {
        "id": 1,
        "fecha_ingreso": "2024-01-15"
    },
    "retiro": null,
    "seguridad_social": {
        "id": 1,
        "eps": "SURA",
        "arl": "POSITIVA"
    },
    "proyectos": {
        "id": 1,
        "administrativo": false,
        "construccion_redes": true
    },
    "cronogramas": [
        {
            "id": 1,
            "mes": "2025-01-01",
            "municipio_ejecucion": "MONTERIA",
            "dias_laborados": 30
        }
    ]
}
```

---

## 📄 CONTRATACIÓN

### 11. Ver Contratación del Trabajador

```http
GET /api/trabajadores/{id}/contratacion/
Authorization: Bearer {access_token}
```

**Respuesta (200 OK):**
```json
{
    "id": 1,
    "trabajador": 1,
    "tipo_contrato": "OL",
    "cargo": "Ingeniero Eléctrico",
    "salario_contratado": "2500000.00",
    "municipio_base": "MONTERIA",
    "fecha_inicio_contrato": "2024-01-15",
    "fecha_final_contrato": "2024-12-31",
    "fecha_creacion": "2024-01-15T10:30:00Z",
    "fecha_actualizacion": "2024-01-15T10:30:00Z"
}
```

---

### 12. Crear Contratación para Trabajador

```http
POST /api/trabajadores/{id}/contratacion/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "tipo_contrato": "OL",
    "cargo": "Ingeniero Eléctrico",
    "salario_contratado": 2500000,
    "municipio_base": "MONTERIA",
    "fecha_inicio_contrato": "2024-01-15",
    "fecha_final_contrato": "2024-12-31"
}
```

**Tipos de Contrato:**
- `OL` - Obra o labor
- `TF` - Término fijo
- `TI` - Término indefinido
- `PS` - Prestación de servicios

**Respuesta (201 Created)**

---

### 13. Actualizar Contratación

```http
PUT /api/trabajadores/{id}/contratacion/
PATCH /api/trabajadores/{id}/contratacion/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON para PATCH):**
```json
{
    "salario_contratado": 2800000
}
```

---

### 14. Eliminar Contratación

```http
DELETE /api/trabajadores/{id}/contratacion/
Authorization: Bearer {access_token}
```

---

## 📥 INGRESO

### 15. Ver Ingreso del Trabajador

```http
GET /api/trabajadores/{id}/ingreso/
Authorization: Bearer {access_token}
```

---

### 16. Crear Ingreso

```http
POST /api/trabajadores/{id}/ingreso/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "fecha_ingreso": "2024-01-15",
    "examen_ingreso": "2024-01-10",
    "fecha_entrega_epp": "2024-01-15",
    "fecha_entrega_dotacion": "2024-01-15"
}
```

---

### 17. Actualizar Ingreso

```http
PATCH /api/trabajadores/{id}/ingreso/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "fecha_entrega_epp": "2024-01-20"
}
```

---

### 18. Eliminar Ingreso

```http
DELETE /api/trabajadores/{id}/ingreso/
Authorization: Bearer {access_token}
```

---

## 📤 RETIRO

### 19. Ver Retiro del Trabajador

```http
GET /api/trabajadores/{id}/retiro/
Authorization: Bearer {access_token}
```

---

### 20. Crear Retiro

```http
POST /api/trabajadores/{id}/retiro/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "fecha_retiro": "2024-12-31",
    "fecha_liquidacion": "2025-01-05",
    "valor_liquidacion": 3500000,
    "fecha_examen_retiro": "2024-12-30"
}
```

---

### 21. Actualizar Retiro

```http
PATCH /api/trabajadores/{id}/retiro/
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

### 22. Eliminar Retiro

```http
DELETE /api/trabajadores/{id}/retiro/
Authorization: Bearer {access_token}
```

---

## 🏥 SEGURIDAD SOCIAL

### 23. Ver Seguridad Social del Trabajador

```http
GET /api/trabajadores/{id}/seguridad-social/
Authorization: Bearer {access_token}
```

---

### 24. Crear Seguridad Social

```http
POST /api/trabajadores/{id}/seguridad-social/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "eps": "SURA",
    "fecha_afiliacion_eps": "2024-01-15",
    "caja_compensacion": "COMFACOR",
    "fecha_afiliacion_caja": "2024-01-15",
    "fondo_pension": "PORVENIR",
    "fecha_afiliacion_pension": "2024-01-15",
    "arl": "POSITIVA",
    "riesgo": "III",
    "fecha_afiliacion_arl": "2024-01-15"
}
```

**Opciones de ARL:**
- `POSITIVA`
- `SURA`
- `BOLIVAR`
- `EQUIDAD`
- `LIBERTY`
- `MAPFRE`
- `COLMENA`
- `OTRA`

---

### 25. Actualizar Seguridad Social

```http
PATCH /api/trabajadores/{id}/seguridad-social/
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

### 26. Eliminar Seguridad Social

```http
DELETE /api/trabajadores/{id}/seguridad-social/
Authorization: Bearer {access_token}
```

---

## 🏗️ PROYECTOS

### 27. Ver Proyectos del Trabajador

```http
GET /api/trabajadores/{id}/proyectos/
Authorization: Bearer {access_token}
```

---

### 28. Crear Proyectos

```http
POST /api/trabajadores/{id}/proyectos/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "administrativo": false,
    "construccion_instalaciones": false,
    "construccion_redes": true,
    "servicios": false,
    "mantenimiento_redes": false
}
```

---

### 29. Actualizar Proyectos

```http
PATCH /api/trabajadores/{id}/proyectos/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "construccion_redes": false,
    "mantenimiento_redes": true
}
```

---

### 30. Eliminar Proyectos

```http
DELETE /api/trabajadores/{id}/proyectos/
Authorization: Bearer {access_token}
```

---

## 📅 CRONOGRAMA

### 31. Listar Cronogramas del Trabajador

```http
GET /api/trabajadores/{id}/cronograma/
Authorization: Bearer {access_token}
```

**Query Params (opcionales):**
- `?mes=2025-01` - Filtrar por mes

**Respuesta (200 OK):**
```json
[
    {
        "id": 1,
        "trabajador": 1,
        "mes": "2025-01-01",
        "municipio_ejecucion": "MONTERIA",
        "salario_cotizacion": "2500000.00",
        "dias_laborados": 30,
        "sueldo_devengado": "2500000.00",
        "fecha_creacion": "2024-12-28T10:00:00Z",
        "fecha_actualizacion": "2024-12-28T10:00:00Z"
    },
    {
        "id": 2,
        "trabajador": 1,
        "mes": "2025-02-01",
        "municipio_ejecucion": "LORICA",
        "salario_cotizacion": "2500000.00",
        "dias_laborados": 28,
        "sueldo_devengado": "2333333.33",
        "fecha_creacion": "2024-12-28T10:00:00Z",
        "fecha_actualizacion": "2024-12-28T10:00:00Z"
    }
]
```

---

### 32. Crear Cronograma

```http
POST /api/trabajadores/{id}/cronograma/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "mes": "2025-03-01",
    "municipio_ejecucion": "MONTERIA",
    "salario_cotizacion": 2500000,
    "dias_laborados": 30,
    "sueldo_devengado": 2500000
}
```

**Opciones de Municipio:**
- `MONTERIA`
- `PLANETA_RICA`
- `SAHAGUN`
- `AYAPEL`
- `LORICA`
- `CIENAGA_DE_ORO`
- `CERETE`
- `SAN_PELAYO`
- `COTORRA`
- `TUCHIN`
- `CHIMA`

---

### 33. Actualizar Cronograma Específico

```http
PATCH /api/trabajadores/{id}/cronograma/{cronograma_id}/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "dias_laborados": 25,
    "sueldo_devengado": 2083333.33
}
```

---

### 34. Eliminar Cronograma

```http
DELETE /api/trabajadores/{id}/cronograma/{cronograma_id}/
Authorization: Bearer {access_token}
```

---

## 📊 CONTRATACIONES (Standalone)

### 35. Listar Todas las Contrataciones

```http
GET /api/contrataciones/
Authorization: Bearer {access_token}
```

---

### 36. Crear Contratación (Standalone)

```http
POST /api/contrataciones/
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
    "trabajador": 1,
    "tipo_contrato": "OL",
    "cargo": "Ingeniero Eléctrico",
    "salario_contratado": 2500000,
    "municipio_base": "MONTERIA",
    "fecha_inicio_contrato": "2024-01-15",
    "fecha_final_contrato": "2024-12-31"
}
```

---

### 37. Obtener Contratación por ID

```http
GET /api/contrataciones/{id}/
Authorization: Bearer {access_token}
```

---

### 38. Actualizar Contratación

```http
PUT /api/contrataciones/{id}/
PATCH /api/contrataciones/{id}/
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

### 39. Eliminar Contratación

```http
DELETE /api/contrataciones/{id}/
Authorization: Bearer {access_token}
```

---

## 📥 EXPORTAR A EXCEL

### 40. Exportar Todos los Trabajadores a Excel

**⭐ SIN AUTENTICACIÓN REQUERIDA**

```http
GET /api/trabajadores/exportar-excel/
```

**Respuesta:**
- Archivo Excel descargable
- Nombre: `RELACION_PERSONAL_EXPORT_YYYYMMDD_HHMMSS.xlsx`
- Formato: Igual al template original
- Incluye: 141 trabajadores con todos sus datos y 12 meses de cronogramas

**Uso en Postman:**
1. Hacer petición GET
2. Clic en "Save Response" → "Save to a file"
3. Guardar con extensión `.xlsx`

**Uso en Frontend (JavaScript):**
```javascript
// Descarga directa
window.location.href = 'http://localhost:8000/api/trabajadores/exportar-excel/';

// O con fetch
fetch('http://localhost:8000/api/trabajadores/exportar-excel/')
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trabajadores.xlsx';
        a.click();
    });
```

---

## 🔧 Configuración de Postman

### Headers Comunes

Para endpoints autenticados, agrega este header:

```
Authorization: Bearer {tu_access_token}
```

### Variables de Entorno (Recomendado)

Crear en Postman:

| Variable | Valor Inicial |
|----------|---------------|
| `base_url` | `http://localhost:8000` |
| `access_token` | (se llenará después del login) |
| `trabajador_id` | `1` |

Uso:
```
{{base_url}}/api/trabajadores/{{trabajador_id}}/
```

### Script Post-Request para Login

En el endpoint de Login, pestaña "Tests", agrega:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("access_token", jsonData.access);
    pm.environment.set("refresh_token", jsonData.refresh);
}
```

Esto guardará automáticamente los tokens para usarlos en otras peticiones.

---

## 📝 Notas Importantes

1. **Autenticación JWT**: La mayoría de endpoints requieren el token `Bearer` en el header `Authorization`
2. **Formato de Fechas**: Usar formato ISO `YYYY-MM-DD` (ej: `2024-01-15`)
3. **IDs Válidos**: Los trabajadores actuales tienen IDs del 1 al 141
4. **Relaciones OneToOne**: Cada trabajador solo puede tener UNA contratación, ingreso, retiro, seguridad social y proyecto
5. **Cronogramas Múltiples**: Un trabajador puede tener múltiples cronogramas (uno por mes)

---

## 🚀 Orden Recomendado para Pruebas

1. ✅ Login (obtener tokens)
2. ✅ Listar trabajadores
3. ✅ Obtener trabajador específico
4. ✅ Crear contratación para trabajador
5. ✅ Crear ingreso para trabajador
6. ✅ Crear cronograma para trabajador
7. ✅ Exportar Excel

---

## 📦 Importar Colección en Postman

Puedes importar esta documentación como colección JSON en Postman.

**Colección:** [Próximamente - Generar archivo JSON de Postman Collection]

---

## 🆘 Solución de Problemas

### Error 401 Unauthorized
- Verifica que estés enviando el header `Authorization: Bearer {token}`
- El token puede haber expirado, haz login nuevamente

### Error 404 Not Found
- Verifica la URL (puede que el ID no exista)
- Asegúrate que el servidor esté corriendo en `http://localhost:8000`

### Error 400 Bad Request
- Revisa el formato del JSON
- Verifica que todos los campos requeridos estén presentes
- Revisa que las fechas estén en formato `YYYY-MM-DD`

---

**Última actualización:** 28 de Diciembre, 2024
**Versión API:** 1.0
