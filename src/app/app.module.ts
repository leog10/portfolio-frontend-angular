import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CirclesModule } from './circles/circles.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CirclesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
