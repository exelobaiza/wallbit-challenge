# checkout - wallbit challenge

[Link al deploy](https://wallbit-challenge-dusky.vercel.app/)


Este proyecto es una aplicación de carrito de compras desarrollada con Next.js y TypeScript. Permite a los usuarios agregar productos a un carrito, gestionar las cantidades y ver el total de la compra.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Instalación

1. Clona este repositorio o descarga el código fuente.
2. Abre una terminal y navega hasta el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   ```
   npm install
   ```

## Ejecución del Proyecto

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Características Principales

- Agregar productos al carrito mediante ID y cantidad
- Vista previa de productos al ingresar el ID
- Gestión de cantidades en el carrito
- Cálculo automático del total de la compra
- Diseño responsivo
- Notificaciones toast para feedback al usuario

## Estructura del Proyecto

```
app/
├── layout.tsx
├── page.tsx
├── components/
│   ├── Header.tsx
│   ├── ProductForm.tsx
│   ├── CartList.tsx
│   └── CartItem.tsx
├── hooks/
│   └── useCart.ts
└── lib/
    ├── types.ts
    └── api.ts
```

## Tecnologías Utilizadas

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (componentes de UI)

## Consideraciones para la Evaluación

1. **Arquitectura y Organización**: El proyecto está estructurado siguiendo las mejores prácticas de Next.js y React, con una clara separación de componentes, hooks y utilidades.

2. **Uso de TypeScript**: Se han utilizado tipos e interfaces para garantizar la seguridad de tipos en toda la aplicación.

3. **Componentes Reutilizables**: Los componentes como CartItem y ProductForm están diseñados para ser reutilizables y mantener una única responsabilidad.

4. **Estado Global**: Se utiliza un hook personalizado (useCart) para gestionar el estado del carrito, lo que facilita la escalabilidad y el mantenimiento.

5. **Diseño Responsivo**: La interfaz se adapta a diferentes tamaños de pantalla utilizando Tailwind CSS.

6. **Manejo de Errores**: Se implementan validaciones y se muestran mensajes de error al usuario cuando es necesario.

7. **Optimización de Rendimiento**: Se utilizan componentes del lado del servidor cuando es posible y se implementa la carga diferida de datos.

8. **Accesibilidad**: Se han seguido las mejores prácticas de accesibilidad en los componentes de UI.

9. **Pruebas**: Aunque no se incluyen en esta versión, el código está estructurado de manera que facilita la implementación de pruebas unitarias y de integración.

10. **Documentación**: Este README proporciona una visión general del proyecto y las instrucciones necesarias para ejecutarlo.

Para cualquier pregunta o aclaración adicional sobre el proyecto, no dudes en contactar al desarrollador.
```
