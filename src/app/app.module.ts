import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { AngularElementComponent } from './components/angular-element/angular-element.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
  const el = createCustomElement(AppComponent, { injector });
  customElements.define('angular-element', el);
}

ngDoBootstrap(): void {}
}
