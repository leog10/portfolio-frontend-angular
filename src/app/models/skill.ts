export class Skill {
    id?: number;
    current: number;
    max: number;
    radius: number;
    semicircle: boolean;
    stroke: number;
    rounded: boolean;
    clockwise: boolean;
    color: string;
    background: string;
    duration: number;
    animation: string;
    animationDelay: number;
    title: string;

    constructor(
        current: number, 
        max: number, 
        radius: number, 
        semicircle: boolean, 
        stroke: number, 
        rounded: boolean, 
        clockwise: boolean, 
        color: string, 
        background: string,
        duration: number,
        animation: string,
        animationDelay: number,
        title: string
        ) {
            this.current = current;
            this.max = max;
            this.radius = radius;
            this.semicircle = semicircle;
            this.stroke = stroke;
            this.rounded = rounded;
            this.clockwise = clockwise;
            this.color = color;
            this.background = background;
            this.duration = duration;
            this.animation = animation;
            this.animationDelay = animationDelay;
            this.title = title;

    }
  }