import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { MemberResolver } from './_resolvers/member.resolver';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FacebookloginComponent } from './login/facebooklogin.component';
import { AdvertComponent } from './advert/advert.component';
import { UserService } from './_services/user.service';
import { AnnonceslistComponent } from './advert/annonceslist.component';
import { AuthGuard } from './_guard/auth.guard';
import { AdvertDetailComponent } from './advert/advert-detail/advert-detail.component';
import { MemberComponent } from './member/member.component';
import { MemberListComponent } from './member/memberList/memberList.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'facebooklogin', component: FacebookloginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate : [AuthGuard],
        children : [
            { path: 'advert', component: AdvertComponent},
            { path: 'advert/:id', component: AdvertDetailComponent},
            {path: 'members', component: MemberListComponent,
                            resolve: {users: MemberListResolver}},
            {path: 'member', component: MemberComponent,
                        resolve: {user: MemberResolver},
                        canDeactivate: [PreventUnsavedChanges]}
        ]
    },
    { path: 'annonceslist', component: AnnonceslistComponent },
    { path: '**', redirectTo: '' }
];
