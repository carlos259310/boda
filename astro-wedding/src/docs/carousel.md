# Funcionamiento del Carrusel de Galería

Este documento explica cómo funciona el componente de carrusel implementado en la galería del proyecto Astro.

## Características Principales

- **Navegación Intuitiva**: Control mediante flechas laterales y puntos indicadores (dots).
- **Auto-play Dinámico**: Las imágenes cambian automáticamente cada 5 segundos.
- **Pausa Inteligente**: El carrusel se detiene cuando el usuario pasa el ratón por encima (hover), permitiendo apreciar mejor la fotografía.
- **Transiciones Suaves**: Efecto de desvanecimiento (fade) combinado con un sutil zoom (scale) para una experiencia premium.
- **Diseño Responsivo**: Adaptado para dispositivos móviles, tablets y escritorio.

## Estructura del Código

### 1. HTML/Astro (`Gallery.astro`)

El carrusel utiliza una estructura de contenedores:

- `carousel-wrapper`: Define el área visible y contiene los controles.
- `slider-container`: Contiene todas las diapositivas.
- `slide`: Cada imagen individual, posicionada de forma absoluta.

### 2. Lógica JavaScript

La lógica se maneja de la siguiente manera:

- **`updateCarousel(index)`**: Es la función principal que cambia las clases `active` tanto en las diapositivas como en los puntos indicadores.
- **Intervalos**: Se utiliza `setInterval` para el auto-play.
- **Event Listeners**:
  - Clic en flechas: Navega a la siguiente o anterior imagen y reinicia el temporizador de auto-play.
  - Clic en dots: Salta directamente a una imagen específica.
  - Hover: Limpia el intervalo para pausar y lo reinicia al salir.

## Cómo Personalizar

### Cambiar Imágenes

Las imágenes se definen en el "frontmatter" (la parte superior entre `---`) del archivo `Gallery.astro`:

```javascript
const images = [
  { url: "URL_DE_IMAGEN", alt: "Descripción" },
  // more images...
];
```

### Ajustar Velocidad

Para cambiar el tiempo de espera entre imágenes, modifica el valor en la función `startAutoPlay`:

```javascript
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // 5000ms = 5 segundos
}
```

### Cambiar Estilos

Los estilos están encapsulados en la etiqueta `<style>` dentro de `Gallery.astro`, permitiendo modificar colores, tamaños y animaciones sin afectar al resto del sitio.
