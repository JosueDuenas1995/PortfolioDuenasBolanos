# PortfolioDuenasBolanos
My New Portfolio Powered by Oracle OCI

## Despliegue de mi Portafolio en Oracle Cloud Infrastructure (OCI)

### Resumen del Proyecto
Desplegué mi portafolio web personal en una instancia de Oracle Cloud (Always Free Tier) usando una arquitectura simple pero profesional: frontend estático + backend en FastAPI para el formulario de contacto, servido con Nginx como proxy inverso.

### Stack Tecnológico
- **Frontend:** HTML5, CSS3, Bootstrap 5.3.3 (diseño responsive + modo oscuro)
- **Backend:** Python + FastAPI + Pydantic
- **Infraestructura:** Oracle Cloud Infrastructure (VM Ubuntu), Nginx, Systemd
- **Otros:** SMTP para envío de correos del formulario de contacto

### Proceso de Desarrollo

**1. Infraestructura en OCI**
- Creé una instancia Compute Ubuntu en la Free Tier de Oracle Cloud.
- Configuré las Security Lists abriendo los puertos 80 y 443.
- Acceso únicamente por SSH con llaves.

**2. Backend con FastAPI**
- Desarrollé un endpoint `POST /api/contact` con validación de datos usando Pydantic.
- Implementé el envío de correos mediante `smtplib` (SMTP con TLS).
- Credenciales sensibles guardadas en variables de entorno (archivo `.env`).

**3. Frontend e integración**
- Maquetación responsive con Bootstrap.
- Envío del formulario con Fetch API (async/await) sin recargar la página.

**4. Despliegue en producción**
- Nginx configurado como proxy inverso hacia Uvicorn (puerto 8000).
- Servicio gestionado con Systemd (`Restart=always`) para alta disponibilidad.
- Archivos estáticos servidos desde `/var/www/portfolio-frontend`.

### Seguridad implementada
- CORS restringido solo al dominio de producción.
- Credenciales fuera del código (variables de entorno).
- Validación estricta de datos de entrada con Pydantic.
- Servicio de backend corriendo como servicio de sistema con reinicio automático.

### Desafíos y aprendizajes
(Aquí agrega 2-3 problemas reales que tuviste y cómo los solucionaste)

### Enlaces
- Sitio en vivo: www.danielbolanos.com
