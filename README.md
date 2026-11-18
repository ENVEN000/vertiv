# UPS Liebert Vertiv Venezuela (sitio estático)

Sitio estático generado con Python para GitHub Pages en **vertiv.enven.org**.

## Estructura
- `content_site.py`: nombre, teléfono, correo, Formspree, ficha de Google (un solo lugar para cambiar datos).
- `content_products.py`, `content_services.py`, `content_zones.py`, `content_guides.py`: contenido.
- `build.py`: generador (`python build.py` crea `dist/`).
- `styles.css`, `main.js`: estilos y comportamiento.
- `og.py`: genera imágenes OG 1200x630 y el logo PNG con Chromium (Playwright).
- `check.py`: revisor de enlaces, títulos, descripciones y JSON-LD.

## Reconstruir
    python build.py
    python og.py      # requiere playwright
    python check.py

Vista previa: abrir `dist/index.html` o `cd dist && python -m http.server 8000`.

## Publicar
Subir el **contenido de `dist/`** a la rama `main` de `ENVEN000/vertiv` (raíz). `CNAME` ya contiene `vertiv.enven.org`.

## DNS (Spaceship)
Registro CNAME: host `vertiv`, valor `enven000.github.io`.
Luego, en GitHub: Settings > Pages > activar "Enforce HTTPS".

## Search Console
Propiedad de dominio `enven.org`, enviar `https://vertiv.enven.org/sitemap.xml` y solicitar indexación de: inicio, /productos/, /servicios/servicio-tecnico-ups-liebert-venezuela/, /servicios/venta-ups-liebert-vertiv/, /productos/liebert-gxt5/ ...
