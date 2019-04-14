import { Pagination, PaginatedResult } from './../../_models/Pagination';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../models/user';


@Component({
  selector: 'app-memberList',
  templateUrl: './memberList.component.html',
  styleUrls: ['./memberList.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private altertify: AlertifyService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
  this.route.data.subscribe(data=>{
    this.users = data['users'].result;
    this.pagination = data['users'].pagination;
  })


  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      },
      err => {
        this.altertify.error(err);
      }
    );
  }
}
