# Calculadora Aguinaldo(SV)
Calculadora de Aguinaldo basada en las leyes de **El Salvador**  de codigo fuente abierto (puedes colaborar para mejorarla). Esta hecha con tailwindcss para la parte visual y vanilla js (nada de ecmascript ni dependencias) del lado lógico.

## Librerias utilizadas:
* Tailwindcss - https://github.com/tailwindcss/tailwindcss
* PostCSS CLI - https://github.com/postcss/postcss-cli
* Snowflake - https://github.com/pajasevi/CSSnowflakes
* element.classList polyfill - https://vanillajstoolkit.com/polyfills/classlist/
* animate.css - https://github.com/daneden/animate.css
* Código formateado con eslint - https://github.com/eslint/eslint
* Intl polyfill - https://github.com/andyearnshaw/Intl.js/

## Otros elementos utilizados
* íconos de alta calidad en formato SVG - https://undraw.co/search

## Diseño
El diseño esta inspirado en [este dribble shot](https://dribbble.com/shots/6635872-Loan-Calculator) por [Vladimir Gruev](https://dribbble.com/gruev) y ha sido implementado únicamente con tailwindcss, a excepcion de [algunas personalizaciones](/tailwind.config.js) 

## Guias
Antes que nada debes instalar las dependencias corriendo el comando `yarn` o `npm install`

### 1. Para levantar el proyecto en modo producción
* Corre el comando `yarn build` para generar los archivos finales desde el codigo fuente
* El contenido se generará en `public/` y puede ser utilizado como un sitio estático. Puedes visualizarlo de manera local al abrir el archivo `public/index.html` directemente en el navegador o puedes correr `npx serve public` y a partir de ahi puedes visualizar el resultado escribiendo `http://localhost:5000` en tu navegador.

### 2. Para levantar el proyecto en modo desarrollo
* Corre el comando `yarn dev` para visualizar el resultado a travez de la url `http://localhost:5000`
* Corre el comando `yarn build` para generar nuevamente los estilos en caso de ser editados

**Nota:** No se ha integrado un bundler ni nada por estilo, lo que significaria que la fase de desarrollo es manual, cada vez que edites y re-generes los estilos debes actualizar la ventana de tu navegador.

## Para colaborar
### 1. Colaborar sobre el código fuente
Si deseas colaborar con el proyecto, ya sea para una mejora visual o nueva caractarística (aunque es poco probable), lo que debes hacer es:
* Crea un fork del proyecto
* Crea un Pull Request donde detallas el porqué y describes la intención

## 2. Reportar errores / sugerir mejoras
Si deseas reportar un error, hacer una sugerencia o publicar una pregunta, crea una nueva entrada en la pestaña "Issues" 
