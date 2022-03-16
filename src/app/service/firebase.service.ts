import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { PersonaService } from './persona.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private storage: AngularFireStorage, 
    private personaService: PersonaService,
    private projectService: ProjectService
    ) { }

  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;
  file!: File;
  uploadProgress: number[] = [];

  //Upload profile image to firebase storage and wait for the download url.
  //1-Create a unique id
  //2-Create path. E.g.: myusername/profileImg/321654_profilepic.jpg
  //3-Upload to firebase storage in path provided.
  //4-Listen to percentage changes to show progress of upload.
  //5-Wait for upload to finish.
  //6-Get download URL and update the database with the string url.
  async uploadImage(personaId: number, username: string, files: File[], filePath: string) {
    let key = filePath;
    let obj = {
      [key]: ''
    };
    const id = new Date().getTime();    
    const path = `${username}/${filePath}/${id}_${files[0].name}`;
    this.ref = this.storage.ref(path)
    this.file = files[0];
    this.task = this.ref.put(this.file);
    this.task.percentageChanges().subscribe(progress => { this.uploadProgress[0] = progress!});
    await this.task;    
    this.task.snapshotChanges().pipe(
      finalize(() => this.ref.getDownloadURL().subscribe({
        next: imgURL => {
          obj[key] = imgURL;
          this.checkUpdateImgInDatabase(personaId, obj);
        }
      }))
    ).subscribe();
  }

  checkUpdateImgInDatabase(personaId: number, img: Object) {
    if (Object.keys(img)[0] === 'projectImg') {
      this.updateProjectImgInDatabase(personaId, img);
    } else {
      this.updateImgInDatabase(personaId, img);
    }
  }

  //Update project image in database with a string url.
  updateProjectImgInDatabase(id: number, img: Object) {
    this.projectService.updateImg(id, img).subscribe({
      next: res => {
        window.location.reload();
      }
    });    
  }

  //Update persona image in database with a string url.
  updateImgInDatabase(personaId: number, img: Object) {
    this.personaService.updateImg(personaId,img).subscribe({
      next: res => {
        window.location.reload();
      }
    });    
  }
  
  //Call updateImgInDatabase to put an empty string.
  deleteImg(personaId: number, imgURL: string, imgObj: Object) {
    this.deleteImgInStorage(imgURL);
    this.checkUpdateImgInDatabase(personaId, imgObj);    
  }
  
  //Delete image in firebase storage.
  deleteImgInStorage(imgURL: string) {    
    this.storage.refFromURL(`${imgURL}`).delete();
  }
}
