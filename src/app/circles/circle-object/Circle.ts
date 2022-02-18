import { ICircle } from "./ICircle";

export class Circle implements ICircle {
    id?: number | undefined;
    current: number = 1;
    max: number = 100;
    radius: number = 80;
    semicircle: boolean = false;

    stroke: number = 25;
    rounded: boolean = true;
    responsive: boolean = false;
    clockwise: boolean = true;
    color: string = '#45ccce';
    background: string = '#eaeaea';
    duration: number = 800;
    animation: string = 'easeOutBounce';
    animationDelay: number = 0;

    title: string = "Ingrese un Titulo";
}
