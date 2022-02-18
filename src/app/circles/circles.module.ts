import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirclesComponent } from './circles.component';
import { StartCirclesComponent } from './start-circles/start-circles.component';
import { CircleComponent } from './circle/circle.component';
import { CircleService } from './services/circle/circle.service';
import { Circle } from './circle-object/Circle';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: StartCirclesComponent, pathMatch: 'full'},
  {path: 'edicion', component: CirclesComponent}
]


@NgModule({
  declarations: [
    CirclesComponent,
    StartCirclesComponent,
    CircleComponent
  ],
  providers: [CircleService, Circle],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RoundProgressModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    CirclesComponent,
    StartCirclesComponent,
    CircleComponent
  ]
})
export class CirclesModule { }
