import { AlertifyService } from "./../_services/alertify.service";
import { AuthenticationService } from "./../_services/authentication.service";
import { AlertService } from "./../_services/alert.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "./../models/user";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../_services/user.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent implements OnInit, AfterViewInit {
  // editForm: NgForm;
  @ViewChild("f") editForm: NgForm;
  user: User;
  photoUrl: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private alertSvc: AlertService,
    private userSrv: UserService,
    private authService: AuthenticationService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.photoUrl.subscribe(photoUrl => (this.photoUrl = photoUrl));
  }

  ngAfterViewInit(): void {
    this.editForm.reset(this.user);
  }

  updateUser() {
    this.userSrv
      .update(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        () => {
          this.alertify.success('updated successfully');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertSvc.error('update failed');
        }
      );
  }

  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
