# Resumen de Cambios Realizados

## Cambios y Mejoras Realizadas en la API de Usuarios

### 1. Implementación de JWT para Autenticación
- **Propósito**: Mejorar la seguridad de la API mediante la autenticación basada en tokens.
- **Implementación**: Se añadieron los módulos `@nestjs/jwt` y `@nestjs/passport`, y se configuraron las estrategias de autenticación JWT y Local.
- **Beneficios**: Proporciona una capa adicional de seguridad y permite la autenticación segura de los usuarios.

### 2. Configuración de Variables de Entorno
- **Propósito**: Manejar de forma segura las configuraciones sensibles y mejorar la gestión de entornos.
- **Implementación**: Se creó un archivo `.env` con configuraciones como `DB_TYPE`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`, `DB_SYNCHRONIZE`, `DB_ENTITIES`, `DB_DROP_SCHEMA`, y `JWT_SECRET`.
- **Beneficios**: Mejora la seguridad y flexibilidad al mantener las configuraciones fuera del código fuente.

### 3. Ajustes en el Módulo de Autenticación (`auth.module.ts`)
- **Cambio**: Se configuró el módulo de autenticación para usar la variable de entorno `JWT_SECRET`.
- **Beneficio**: Permite la configuración dinámica del secreto JWT, mejorando la seguridad.

### 4. Creación de Guardianes de Autenticación (`jwt-auth.guard.ts` y `local-auth.guard.ts`)
- **Propósito**: Proteger las rutas de la API que requieren autenticación.
- **Implementación**: Se crearon los guardianes `JwtAuthGuard` y `LocalAuthGuard` para manejar la autenticación JWT y Local.
- **Beneficios**: Asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas.

### 5. Ajustes en el Controlador `UserController`
- **Cambio**: Se protegieron las rutas sensibles usando `@UseGuards(JwtAuthGuard)`.
- **Beneficio**: Mejora la seguridad al restringir el acceso a usuarios autenticados.

### 6. Ejemplo de Archivo `.env`
- **Propósito**: Proporcionar un ejemplo de configuración de variables de entorno.
- **Ejemplo**:
    ```plaintext
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=postgres
    DB_SYNCHRONIZE=true
    DB_ENTITIES=dist/**/*.entity{.ts,.js}
    DB_DROP_SCHEMA=true
    JWT_SECRET=mi_secreto_es_un_gato_negro_con_orejas_de_papel
    ```

### 7. Resumen de Beneficios Generales
- **Seguridad**: Implementa autenticación basada en tokens y maneja de forma segura las configuraciones sensibles.
- **Flexibilidad**: Permite configuraciones dinámicas a través de variables de entorno.
- **Proteger Rutas**: Asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas.
- **Manejo de Errores**: Proporciona mensajes de error más claros y evita que el servidor se bloquee.
- **Simplicidad**: Hace que el código sea más fácil de mantener y entender.

## Cómo Comprobar el Funcionamiento con Insomnia

### 1. Crear un Nuevo Usuario
- **Ruta**: `POST /user/register`
- **Body**:
    ```json
    {
      "name": "Carlos Gimenez",
      "email": "carlos.gimenez@ejemplo.com",
      "password": "ContraseñaSegura123",
      "isActive": true
    }
    ```
- **Descripción**: Esta ruta permite registrar un nuevo usuario.

### 2. Iniciar Sesión
- **Ruta**: `POST /auth/login`
- **Body**:
    ```json
    {
      "email": "carlos.gimenez@ejemplo.com",
      "password": "ContraseñaSegura123"
    }
    ```
- **Descripción**: Esta ruta permite iniciar sesión y obtener un token JWT.
- **Resultado Esperado**: 
    ```json
    {
      "access_token": "tu_token_jwt"
    }
    ```

### 3. Probar Rutas Protegidas
- **Agregar el Token JWT**: En Insomnia, configura el encabezado `Authorization` con el valor `Bearer tu_token_jwt` obtenido del inicio de sesión.
- **Ruta**: `GET /user`
- **Descripción**: Esta ruta obtiene todos los usuarios. Debe estar protegida y requerir un token JWT válido.

    - **Headers**:
        ```json
        {
          "Authorization": "Bearer tu_token_jwt"
        }
        ```

### 4. Actualizar un Usuario
- **Ruta**: `PUT /user/:id`
- **Body**:
    ```json
    {
      "name": "Nuevo Nombre",
      "email": "nuevo.email@ejemplo.com",
      "isActive": false
    }
    ```
- **Descripción**: Actualiza los detalles de un usuario específico. Requiere un token JWT válido.

### 5. Eliminar un Usuario
- **Ruta**: `DELETE /user/:id`
- **Descripción**: Elimina un usuario específico. Requiere un token JWT válido.




Falta comprobar el funcionamiento adecuado de las rutas y agregar redis, luego testing y por ultimo swagger
