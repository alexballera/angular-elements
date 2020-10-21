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
import './zone-flags';
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



