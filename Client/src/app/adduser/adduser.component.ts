import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  btnAddPost = false;

  sub: Subscription = new Subscription();
  userData: User = new User();

  ngOnInit(): void {}

  BackToMainPage() {
    this.router.navigate(['']);
  }

  Create(
    name: String,
    email: String,
    street: String,
    city: String,
    zipcode: String
  ) {
    if (
      name == '' ||
      email == '' ||
      street == '' ||
      city == '' ||
      zipcode == ''
    ) {
      alert(' All Fields are required!');
    } else {
      this.sub = this.http
        .post('http://localhost:5000/api/users', this.userData)
        .subscribe((status) => {
          alert(status);
          this.router.navigate(['']);
        });
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
