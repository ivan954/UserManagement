import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  sub: Subscription = new Subscription();
  users: User[] = [];
  searchText!: String;
  term!: string;

  constructor(private http: HttpClient, private router: Router) {}

  totalLength: any;
  page: number = 1;

  ngOnInit(): void {
    this.sub = this.http
      .get<User[]>('http://localhost:5000/api/users')
      .subscribe((data) => (this.users = data));
      this.totalLength = this.users.length
  }
  search(text: String) {}

  nav() {
    this.router.navigate(['/adduser']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
