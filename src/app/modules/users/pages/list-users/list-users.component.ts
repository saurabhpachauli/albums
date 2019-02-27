import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersList;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(result => {
      this.usersList = result;
    });
  }

  getAlbums(user) {
    this.router.navigate([`/albums/${user.id}`]);
  }

}
