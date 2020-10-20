import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

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
  // bootstrap: [AppComponent],
  entryComponents: [AngularElementComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap(): void {
    customElements.define(
      'angular-element',
      createCustomElement(AngularElementComponent, { injector: this.injector }),
    );
  }
}
