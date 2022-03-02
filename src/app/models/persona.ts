export class Persona {
    id?: number;
    firstName: string;
    lastName: string;
    position: string;
    location: string;
    aboutMe: string;
    birthday: string;
    backImg: string;
    profileImg: string;

    constructor(firstName: string, lastName: string, position: string, location: string, aboutMe: string, birthday: string, backImg: string, profileImg: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.location = location;
        this.aboutMe = aboutMe;
        this.birthday = birthday;
        this.backImg = backImg;
        this.profileImg = profileImg;
    }
}
