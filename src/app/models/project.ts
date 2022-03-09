export class Project {
    id?: number;
    name: string;
    projectImg: string;
    description: string;
    startTime: string;
    endTime: string;

    constructor(name: string, projectImg: string, description: string, startTime: string, endTime: string) {
        this.name = name;
        this.projectImg = projectImg;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
