import { AlertService } from './../../_services/alert.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Photo } from './../../models/Photo';
import { UserService } from './../../_services/user.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { IPhoto } from '../../_models/IPhoto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() Photos: IPhoto[];
@Output() getMemberPhotoChange = new EventEmitter<string>();

 uploader: FileUploader;
 hasBaseDropZoneOver: false;
baseUrl = environment.apiUrl;
currentMain:IPhoto;

  constructor(private authServive:AuthenticationService, 
    private userSvc:UserService,
     private alertSvc:AlertService,
     private alertify:AlertifyService) { }

  ngOnInit() {
    this.InitializeUploader();
  }

   fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  InitializeUploader() {
    this.uploader = new FileUploader({
      url : this.baseUrl + 'users/' + this.authServive.decodedToken.nameid + '/photos',
      authToken : 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType : ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item , response , status , headers) =>{
     const res:IPhoto = JSON.parse(response);
     const photo:IPhoto = {
       id : res.id,
       url : res.url,
       dateAdded : res.dateAdded,
       description: res.description,
       isMain : res.isMain,
       userId : res.userId
     };
     this.Photos.push(photo);
     if(photo.isMain){
      this.authServive.changeMemberPhoto(photo.url);
      this.authServive.currentUser.photoUrl =photo.url;
      localStorage.setItem('user', JSON.stringify(this.authServive.currentUser));
     }
    }
  }

  setMainPhoto(photo:IPhoto){
    this.userSvc.setMainPhoto(this.authServive.decodedToken.nameid, photo.id).subscribe(()=>{
      this.currentMain = this.Photos.filter(p=>p.isMain ===true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authServive.changeMemberPhoto(photo.url);
      this.authServive.currentUser.photoUrl =photo.url;
      localStorage.setItem('user', JSON.stringify(this.authServive.currentUser));
     // this.getMemberPhotoChange.emit(photo.url);
    }, () => {
        console.log('could not set to main');
      });
  }

  deletePhoto(id:number){
    this.alertify.confirm('Suppresion de photo','Are you sure you want to delete this photo?', ()=>{
      this.userSvc.deletePhoto(this.authServive.decodedToken.nameid, id).subscribe(()=>{
        this.Photos.splice(this.Photos.findIndex(p => p.id === id), 1);
        this.alertify.success('photo ' + id + ' has been deleted');
    }, error =>{
      this.alertify.error('Failed to delete the photo');
    });
    }); 
    // if ( action == true) {
      
    // }
  }
}
