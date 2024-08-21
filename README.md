# Prueba Marvel

## Autor

Sheila Moro Herrero

## Descripción

Este proyecto está construido con React v18.3.1 y sigue una estructura organizada por funcionalidades, donde cada carpeta agrupa los archivos relacionados con un módulo específico. Esta estructura facilita la mantenibilidad y escalabilidad del código.

## Dependencias

El proyecto utiliza las siguientes dependencias principales:
  * __react-dom__ v18.3.1
  * __axios__ v1.7.4
  * __cypress__ v13.13.3

### Instalación de las dependencias

Para instalar las dependencias del proyecto, sigue estos pasos:

Abre una terminal, navega hasta la raíz del proyecto y ejecuta uno de los siguientes comandos:
```
npm install
```
o
```
yarn install
```

Esto descargará e instalará todas las dependencias necesarias para ejecutar y desarrollar el proyecto.

## Ejecución de la aplicación

El proyecto puede ejecutarse en dos modos diferentes: __desarrollo__ y __producción__.

### Modo Desarrollo

En el modo desarrollo, los assets se sirven sin minimizar para facilitar la depuración. Para iniciar la aplicación en este modo:

Navega a la raíz del proyecto en tu terminal y ejecuta uno de los siguientes comandos:
```
npm start
```
o
```
yarn start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

### Modo Producción

En el modo producción, los assets se concatenan y minimizan para optimizar el rendimiento. Para compilar la aplicación en modo producción:

Desde la raíz del proyecto, ejecuta uno de los siguientes comandos:
```
npm run build
```
o
```
yarn run build
```

Esto generará una carpeta __`build`__ que contiene los archivos estáticos listos para ser servidos.

#### Servir la Aplicación en Modo Producción:
Se puede servir la aplicación compilada usando un servidor estático. Para ello:

Instala el paquete __`serve`__ globalmente:
```
npm install -g serve
```
o
```
yarn global add serve
```

Sirve la aplicación con el siguiente comando:
```
serve -s build
```
Ahora, la aplicación estará disponible para su uso en modo producción.

## Pruebas
### Pruebas Unitarias
Las pruebas unitarias se han implementado para verificar el funcionamiento individual de cada componente. 
Para ejecutar estas pruebas:

Desde la raíz del proyecto, ejecuta uno de los siguientes comandos:
```
npm test
```
o
```
yarn test
```

### Pruebas de Integración
Además de las pruebas unitarias, se han implementado pruebas de integración para garantizar el correcto funcionamiento de la aplicación en su conjunto. 
Estas pruebas simulan el comportamiento del usuario y han sido configuradas para usar respuestas mockeadas del API, acelerando su ejecución.
Para ejecutar las pruebas de integración:

Inicia la aplicación en modo desarrollo:
```
npm start
```
o
```
yarn start
```

Ejecuta las pruebas de integración con el siguiente comando:
```
npm run e2e
```
o
```
yarn run e2e
```
