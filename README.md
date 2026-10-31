# Plataforma Educativa Didáctica

Plataforma web interactiva orientada al aprendizaje mediante actividades lúdicas para estudiantes de preprimaria y primaria. El proyecto combina juegos educativos, registro de estudiantes y consulta del progreso académico desde una interfaz sencilla y adaptada a distintos tamaños de pantalla.

## ¿Qué es el proyecto?

La aplicación ofrece un espacio educativo digital donde los estudiantes pueden practicar conceptos básicos mediante minijuegos. La navegación está organizada por nivel escolar y cada actividad cuenta con instrucciones, puntuación, retroalimentación y una opción para reiniciar o volver al menú.

Además de la experiencia de aprendizaje, la plataforma permite registrar estudiantes y consultar los resultados almacenados mediante una API externa.

## Funcionalidades principales

- Registro de estudiantes mediante nombre y edad.
- Navegación entre las secciones de inicio, preprimaria, primaria y reporte.
- Selección de actividades según el nivel escolar.
- Puntuación acumulada durante los juegos.
- Mensajes de acierto y error para orientar al estudiante.
- Modal de finalización para los juegos completados.
- Reinicio individual de cada actividad.
- Consulta de registros de progreso educativo.
- Diseño responsive para pantallas grandes y dispositivos móviles.
- Uso de tipografías locales y recursos gráficos propios.

## Actividades educativas

### Preprimaria

La sección de preprimaria contiene actividades enfocadas en el reconocimiento visual, la orientación espacial y la memoria:

- **Reconocer figuras geométricas:** el estudiante identifica la figura solicitada entre diferentes opciones.
- **Juego espacial:** se responde si un objeto se encuentra arriba, debajo, dentro, fuera, cerca, lejos o al lado de otro elemento.
- **Juego de memoria:** se buscan pares de animales utilizando cartas interactivas.

### Primaria

La sección de primaria contiene actividades relacionadas con el razonamiento matemático:

- **Tablas de multiplicar:** se selecciona el resultado correcto de una multiplicación.
- **Suma de quebrados:** espacio destinado a la práctica de operaciones con fracciones.
- **Multiplicación con decimales:** espacio destinado a la práctica de multiplicaciones decimales.

Los juegos que ya cuentan con una dinámica completa muestran un modal al alcanzar el objetivo establecido y permiten comenzar nuevamente la actividad o regresar al menú.

## Secciones de la aplicación

| Ruta           | Sección     | Descripción                                          |
| -------------- | ----------- | ---------------------------------------------------- |
| `/`            | Inicio      | Registro de estudiantes mediante nombre y edad.      |
| `/preprimaria` | Preprimaria | Selección de juegos para estudiantes de preprimaria. |
| `/primaria`    | Primaria    | Selección de juegos matemáticos para primaria.       |
| `/reporte`     | Reporte     | Consulta de los registros de progreso educativo.     |

## Integración con la API

La aplicación se comunica con un backend mediante peticiones HTTP. La dirección base puede configurarse mediante la variable de entorno `VITE_API_URL`; si no se proporciona, el proyecto utiliza una dirección de respaldo definida en las vistas que requieren conexión.

Las operaciones principales son:

- Registro de estudiantes.
- Consulta de reportes educativos.

La interfaz utiliza los datos recibidos por la API para registrar estudiantes y mostrar la tabla de reportes educativos.

## Tecnologías utilizadas

- **React:** construcción de la interfaz y manejo del estado de los juegos.
- **React Router:** navegación entre las secciones de la aplicación.
- **Vite:** entorno de desarrollo y compilación del frontend.
- **JavaScript:** lógica de interacción, validaciones y consumo de la API.
- **CSS:** diseño visual, responsive, animaciones y estilos de los juegos.
- **SVG:** ilustraciones de animales utilizadas en el juego de memoria.
- **Fuentes locales:** Fredoka para títulos y Andika para el contenido general.

## Organización del proyecto

```text
proyecto-desarrolloweb-frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── svg/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── preprimaria/
│   │   │   ├── JuegoEspacial.jsx
│   │   │   ├── JuegoFiguras.jsx
│   │   │   └── JuegoMemoria.jsx
│   │   └── primaria/
│   │       ├── JuegoMultiplicarDecimales.jsx
│   │       ├── JuegoSumaQuebrados.jsx
│   │       └── JuegoTablasMultiplicar.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Preprimaria.jsx
│   │   ├── Primaria.jsx
│   │   └── Reporte.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── animales.txt
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Estructura de la interfaz

`App.jsx` concentra la composición general de la aplicación. Incluye la barra de navegación, el sistema de rutas, el contenido de cada página y el pie de página.

La carpeta `pages` contiene las vistas principales. La carpeta `components` agrupa elementos reutilizables de la interfaz y los juegos separados por nivel escolar. Los recursos visuales y tipográficos se encuentran dentro de `src/assets`.

## Diseño y experiencia de usuario

La interfaz utiliza una presentación visual amigable y orientada a estudiantes. Los títulos emplean una tipografía redondeada, mientras que el contenido utiliza una fuente legible. Los colores diferencian acciones principales, respuestas correctas, errores y botones de navegación.

Los juegos incorporan estados visuales para cartas descubiertas, respuestas, puntuación, finalización y reinicio. El diseño también contempla la adaptación a pantallas pequeñas mediante reglas responsive.

## Estado actual

La plataforma cuenta con navegación funcional, registro de estudiantes, consulta de reportes y juegos interactivos para preprimaria y primaria. Algunas actividades de primaria mantienen su estructura visual y de navegación como base para incorporar posteriormente su dinámica matemática completa.

El proyecto está organizado para que nuevas actividades puedan añadirse como componentes independientes sin modificar la estructura general de navegación.
