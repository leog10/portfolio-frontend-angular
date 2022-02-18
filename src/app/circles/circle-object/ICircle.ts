export interface ICircle {
    id?: number | undefined;
    current: number;
    max: number;
    radius: number;
    semicircle: boolean;

    stroke: number;
    rounded: boolean;
    responsive: boolean;
    clockwise: boolean;
    color: string;
    background: string;
    duration: number;
    animation: string;
    animationDelay: number;

    title: string;
  }