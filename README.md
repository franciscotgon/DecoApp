# 🏠 DecoApp - E-Commerce de Decoración

**DecoApp** es una plataforma web full-stack moderna dedicada a la venta de artículos de decoración. El proyecto está construido siguiendo principios de **Clean Architecture** y **CQRS**, garantizando un sistema escalable, mantenible y seguro.

---

## 🛠️ Stack Tecnológico

### Backend (.NET Core 9)
* **Arquitectura:** Clean Architecture (Domain, Application, Infrastructure, WebApi).
* **Patrones:** CQRS con **MediatR**, Repository Pattern, y Global Exception Handling.
* **Seguridad:** Autenticación y Autorización basada en **JWT (JSON Web Tokens)** y **ASP.NET Core Identity**.
* **Base de Datos:** PostgreSQL con **Entity Framework Core** (Code First).
* **Validación:** **FluentValidation** para reglas de negocio robustas.
* **Documentación:** Swagger / OpenAPI.

### Frontend (Next.js 14+)
* **Framework:** Next.js con App Router y TypeScript.
* **Estilos:** Tailwind CSS.
* **Comunicación:** Cliente HTTP personalizado con interceptores para gestión de tokens JWT.
* **Estado/Cookies:** Gestión de sesiones mediante cookies seguras y contextos de React.

---

## 🏗️ Arquitectura del Sistema

El backend se divide en 4 capas principales:
1. **Domain:** Entidades principales, interfaces y lógica de negocio pura.
2. **Application:** Casos de uso, DTOs, validaciones y lógica de comandos/consultas (MediatR).
3. **Infrastructure:** Implementación de persistencia (EF Core), Repositorios y servicios externos (Generación de JWT).
4. **Api:** Controladores RESTful y configuración de middlewares.

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticación y Autorización
* Registro e inicio de sesión de usuarios.
* Gestión de roles mediante Identity: **Admin** (Gestión total) y **Customer** (Compras).
* Interceptores en el frontend para adjuntar automáticamente el token Bearer en peticiones protegidas.

### 📦 Catálogo y Pedidos
* **CRUD de Productos y Categorías:** Gestión completa para administradores.
* **Gestión de Órdenes:** Creación de pedidos, seguimiento de estado (Pendiente, Completado, Cancelado) y visualización por usuario.
* **Seguridad por Rol:** Endpoints administrativos protegidos para prevenir accesos no autorizados.

---

## 🚀 Configuración y Ejecución

### Requisitos previos
* [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js v18+](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
