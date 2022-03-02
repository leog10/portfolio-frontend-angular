export class Experience {
    id?: number;
    positon: string;
    company: string;
    img: string;
    mode: string;
    startTime: string;
    endTime: string;
    timeAtPositon: string;
    location: string;

    constructor(positon: string, company: string, img: string, mode: string, startTime: string, endTime: string, timeAtPositon: string, location: string) {
        this.positon = positon;
        this.company = company;
        this.img = img;
        this.mode = mode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeAtPositon = timeAtPositon;
        this.location = location;
    }
}
