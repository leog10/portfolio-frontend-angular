export class Project {
    id?: number;
    name: string;
    img: string;
    description: string;
    startTime: string;
    endTime: string;

    constructor(name: string, img: string, description: string, startTime: string, endTime: string) {
        this.name = name;
        this.img = img;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
