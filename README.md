# AngularElements
[Tutorial Angular Elements](https://www.moldeointeractive.com.ar/blog/moldeo-interactive-1/post/implementar-angular-elements-635#:~:text=Una%20de%20las%20herramientas%20que,con%20o%20sin%20otros%20frameworks.)

[Tutorial Angular Elements 6 Pasos](https://enmilocalfunciona.io/crea-tu-primer-componente-con-angular-elements-en-6-pasos/)

## Instalando dependencias
### Añadimos la librería de Angular Elements al proyecto:
```bash
ng add @angular/elements
```

### Archivo polyfills,js
Otro detalle interesante, que no tiene que ver con Angular Elements, pero que nos ayudará a que nuestro proyecto de Angular tenga mejor compatibilidad con los navegadores, es el archivo src/polyfills.js. En este caso, como queremos que el componente que vamos a generar tenga una compatibilidad alta, vamos a proceder a descomentar todas las dependencias de dicho fichero y a instalar estas dos, que se nos indica en el mismo:

```ts
import 'classlist.js';
import 'web-animations-js';
import 'zone.js/dist/zone';
import 'document-register-element';
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_on_property = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];
(window as any).__Zone_enable_cross_context_check = true;

```
### Instalamos dependencias necesarias requeridas en el archivo polyfills
```
npm install --save classlist.js
```

```
npm install --save web-animations-js
```

```
npm install --save document-register-element@1.8.1
```

## Configurando Angular Elements
Una vez que tenemos instalado y configurado adecuadamente nuestro proyecto Angular y hemos añadido las dependencias necesarias, vamos a proceder a crear nuestro primer componente reutilizable.

Para ello deberemos ir a app.module.ts, que es el fichero inicial donde podemos gestionar importaciones del proyecto (entre otras cosas) y vamos a añadirle en la parte superior con los otros import:

```ts
import { Injector } from '@angular/core';  
import { createCustomElement } from '@angular/elements';
```
Estos dos elementos nos permitirán inyectar el componente que deseamos reutilizar dentro de la propiedad createCustomElement.

Aquí traemos a Injector del @angular/core y a la función createCustomElement de @angular/elements, la cual se encargará de crear nuestro WebComponent. A continuación necesitaremos configurar el @NgModule para indicarle que nuestro componente forma parte del array entryComponents.

Deberemos cambiar la propiedad bootstrap del módulo, por un entrycomponents. Esto es debido, a que dicha propiedad nos indica qué componente debe ejecutar al cargar la aplicación y lo sustituiremos por la propiedad, que tantas veces usamos para modales y otros componentes que deseamos reutilizar dentro de la aplicación en otros módulos, así es como debería quedar:

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [AppComponent]
})
```

Luego, donde declaramos la clase de AppModule, le añadiremos el contenido donde definiremos el componente, para indicarle que necesita compilarlo en un WebComponent:

```ts
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AppComponent, { injector });
    customElements.define('angular-element', el);
  }

  ngDoBootstrap(): void {}
}
```

La función createCustomElement convierte nuestro componente de Angular en un WebComponent, sin embargo -como puede verse en el bloque de arriba- este debe guardarse en una constante para ser usado posteriormente.

Luego de esto, se llama a la función define de customElements la cual lleva dos parámetros: un selector y un WebComponent (el que acabamos de crear). El selector será el nombre de la tag que llevará nuestro WebComponent, y lleva siempre un guión que separe dos palabras para así distinguirse de las tags de HTML5.

Una de las diferencias que tiene solamente un custom element, con un web component es el shadow DOM. En algunos tutoriales para utilizar Angular Elements, nos recomiendan que indiquemos a Angular que se use Shadow DOM. Esto se haría, añadiendo dicha propiedad al componente:

Necesitamos simplemente encapsular nuestro componente de Angular, para eso nos dirigimos al app.component.ts e importamos lo siguiente:

```ts
import { ViewEncapsulation } from '@angular/core';
```

Lo vamos a agregar al decorador, el cual nos tiene que quedar de la siguiente manera:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
```

Esto va a encapsular todo lo que contenga nuestro componente (HTML, CSS y JS) en un solo archivo de JavaScript, necesario para utilizar el sistema más simple de implementación en nuestro HTML donde irá nuestro WebComponent.

Todo lo que incluyan en su app.component.html y app.component.css (y por supuesto su archivo TS) será lo que componga su WebComponent (y por supuesto pueden utilizar variables tipo Input o Output para crear atributos y listener en su WebComponent, pero eso es material para otra entrada).

## Compilación

Antes de ejecutar nuestro build y es concatenar todos los archivos de JavaScript que va a generar el compilado en un solo archivo de JavaScript, a fin de hacerlo más práctico para su utilización.

Lamentablemente, Angular aún no incluye una flag que lo haga automáticamente, pero siempre podemos hacer un simple script que nos lo haga. Para eso vamos a instalar las siguientes dependencias:

```sh
npm i --save-dev fs-extra concat
```

Primero, deberemos crear un fichero con un script, que luego lanzaremos para unificar todos los js y CSS en sólo un fichero cada uno.

Creamos un fichero con el nombre elements-build.js, en la ruta base, con este contenido:

```js
const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
  './dist/<NOMBRE-DEL-PROYECTO>/runtime.js',
  './dist/<NOMBRE-DEL-PROYECTO>/polyfills.js',
  './dist/<NOMBRE-DEL-PROYECTO>/main.js',
  ]
  await fs.ensureDir('elements')
  await concat(files, 'elements/angular-elements.js');
  //await fs.copyFile('./dist/<NOMBRE-DEL-PROYECTO>/styles.css', 'elements/styles.css')
  //await fs.copy('./dist/<NOMBRE-DEL-PROYECTO>/assets/', 'elements/assets/' )
})()
```

Donde dice <NOMBRE-DEL-PROYECTO> debemos reemplazarlo por el nombre de nuestro proyecto de Angular (el nombre de la carpeta root, frecuentemente). Esto va a generar un archivo angular-elements.js en una carpeta nueva llamada elements.

Las últimas dos líneas que están comentadas hay que utilizarlas solo si se utilizan styles globales (no recomendable) o assets (tampoco recomendable) respectivamente.

### Build
Para poder crear el build, deberemos ir a package.json y crear un nuevo script:

```js
"build:elements": "ng build --prod --output-hashing none && node elements-build.js"
```

### Testeamos el Angular Element
Si revisamos las carpetas de nuestro proyecto, podremos ver como en la carpeta dist, se ha creado el compilado normal del proyecto. Pero la que nos interesa, es la carpeta elements. En esta carpeta, está nuestro custom element.

Dentro de la carpeta nos encontraremos dos ficheros, uno con todo el javascript unificado y el otro con el CSS unificado.

Para poderlo testear, necesitaremos crear un index.html y añadir nuestro custom element. Lo más rápido, es ir a dicha carpeta y crearlo. En dicho archivo, añadiremos este contenido:

```html
<!doctype html>  
<html lang="es">

<head>  
    <meta charset="utf-8">
    <title>Angular Elements</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>  
    <cejs-elements></cejs-elements>
    <script type="text/javascript" src="angular-elements.js"></script>
</body>

</html> 
```

Ahora, para cargar nuestra aplicación con nuestro custom element, nos bastaría con levantar un servidor que ejecutase dicho html.

En este caso, lo vamos a hacer con static server. Instalamos esta dependencia, en el caso de que no la tengamos:

```sh
npm -g install http-server
```

Una vez instalada, nos vamos a la carpeta donde tenemos la web sencilla y levantamos el servidor:

```sh
cd elements  
http-server
```
