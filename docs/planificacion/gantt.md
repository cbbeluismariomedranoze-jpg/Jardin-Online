# Diagrama de Gantt (plan referencial)

Este cronograma representa el orden y las dependencias de trabajo, no fechas reales. Ajustar los periodos cuando el equipo confirme su calendario.

```mermaid
gantt
    title Jardín Online — planificación por hitos
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    section Análisis y diseño
    Actores, alcance y requisitos :done, a1, 2026-09-01, 10d
    Modelado UML y UWE            :done, a2, after a1, 15d
    section Desarrollo
    Catálogo y carrito            :done, b1, 2026-09-26, 20d
    Ventas y pedidos              :done, b2, after b1, 20d
    Panel de Administración       :b3, after b2, 20d
    section Calidad y entrega
    Pruebas y seguridad           :c1, after b3, 10d
    Estandarización GitHub        :c2, after c1, 5d
```

**Importante:** las fechas incluidas son una representación provisional para que Mermaid pueda dibujar el Gantt; no constituyen fechas confirmadas del equipo. Reemplazarlas por el calendario real antes de presentar.
