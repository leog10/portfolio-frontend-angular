export class Experience {
    id?: number;
    position: string;
    company: string;
    img: string;
    mode: string;
    startTime: string;
    endTime: string;
    timeAtPosition: string;
    location: string;

    constructor(position: string, company: string, img: string, mode: string, startTime: string, endTime: string, timeAtPosition: string, location: string) {
        this.position = position;
        this.company = company;
        this.img = img;
        this.mode = mode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeAtPosition = timeAtPosition;
        this.location = location;
    }
}
