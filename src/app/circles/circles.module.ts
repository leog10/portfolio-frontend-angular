import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirclesComponent } from './circles.component';
import { StartCirclesComponent } from './start-circles/start-circles.component';
import { CircleComponent } from './circle/circle.component';



@NgModule({
  declarations: [
    CirclesComponent,
    StartCirclesComponent,
    CircleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CirclesModule { }
