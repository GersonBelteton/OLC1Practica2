import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterfComponent } from './components/interf/interf.component';
import { NavComponent } from './components/nav/nav.component';
import { ErroresComponent } from './components/errores/errores.component';

@NgModule({
  declarations: [
    AppComponent,
    InterfComponent,
    NavComponent,
    ErroresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
