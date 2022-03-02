export class Education {
    id?: number;
    school: string;
    title: string;
    img: string;
    career: string;
    startTime: string;
    endTime: string;
    location: string;

    constructor(school: string, title: string, img: string, career: string, startTime: string, endTime: string, location: string) {
        this.school = school;
        this.title = title;
        this.img = img;
        this.career = career;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
}
