import { MemberListResolver } from './_resolvers/member-list.resolver';
import { AlertifyService } from './_services/alertify.service';
import { MemberComponent } from './member/member.component';
import { AuthGuard } from './_guard/auth.guard';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppConfig } from './app.config';
import { AlertService } from './_services/alert.service';
import { HttpModule } from '@angular/http';
import { AlertComponent } from './directives/alert.component';
import { FacebookloginComponent } from './login/facebooklogin.component';
import { FacebookModule } from 'ngx-facebook';
import { AdvertComponent } from './advert/advert.component';
import { AnnonceslistComponent } from './advert/annonceslist.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {  ErrorInterceptorProvider} from './_services/error.interceptor';
import {  HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, PaginationModule } from 'ngx-bootstrap';
import { AdvertCardComponent } from './advert/advert-card/advert-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdvertDetailComponent } from './advert/advert-detail/advert-detail.component';
import { MemberResolver } from './_resolvers/member.resolver';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './member/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UserService } from './_services/user.service';
import { MemberListComponent } from './member/memberList/memberList.component';
import { MemberCardComponent } from './member/member-card/member-card.component';
import {TimeAgoPipe} from 'time-ago-pipe';

export function tokenGetter(){
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    FacebookloginComponent,
    AdvertComponent,
    AnnonceslistComponent,
    AdvertCardComponent,
    AdvertDetailComponent,
    MemberComponent,
    PhotoEditorComponent,
    MemberListComponent,
    MemberCardComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FacebookModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:33119'],
        blacklistedRoutes: ['localhost:33119/api/account']
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    AppConfig,
    AlertService,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    MemberResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
