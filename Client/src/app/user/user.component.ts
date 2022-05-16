import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input()
  user!: User;

  newTask: boolean = true;
  newPost: boolean = true;
  isMouseOver: boolean = false;
  idClicked: boolean = false;
  showCBtn: boolean = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  sub: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  Update(id: String) {
    this.sub = this.http
      .put('http://localhost:5000/api/users/' + id, this.user)
      .subscribe((status) => alert(status));
  }
  Delete(id: String) {
    this.sub = this.http
      .delete('http://localhost:5000/api/users/' + id)
      .subscribe((status) => alert(status));
    location.reload();
  }

  ngOnInit(): void {}

  isComplited(tasks: Object) {
    for (let t of Object.values(tasks)) {
      if (t.Completed == false) {
        return false;
      }
    }
    return true;
  }

  toggle = true;
  status = 'Enable';
  todos() {
    this.idClicked = !this.idClicked;
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
  addTask() {
    this.newTask = !this.newTask;
  }
  addPost() {
    this.newPost = !this.newPost;
  }
  UpdateTasks(id: String, title: String) {
    let temp = {
      Title: title,
      Completed: false,
    };
    this.user.Tasks.push(temp);

    this.sub = this.http
      .put('http://localhost:8000/api/persons/' + id, this.user)
      .subscribe();
    this.newTask = !this.newTask;
  }
  UpdatePost(id: String, title: String, body: String) {
    let temp = {
      Title: title,
      Body: body,
    };
    this.user.Posts.push(temp);

    this.sub = this.http
      .put('http://localhost:8000/api/persons/' + id, this.user)
      .subscribe();
    this.newPost = !this.newPost;
  }

  Completed(tasks: Object) {
    for (let t of Object.values(tasks)) {
      if (t.Completed == false) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  CompleteBtn(comp: String, id: String) {
    for (let t of Object.values(this.user.Tasks)) {
      if (t.Title == comp) {
        t.Completed = true;
        break;
      }
    }
    this.sub = this.http
      .put('http://localhost:8000/api/persons/' + id, this.user)
      .subscribe();
  }
  DeleteTaskBtn(del: String, id: String) {
    const removeIndex = this.user.Tasks.findIndex((item) => item.Title === del);
    this.user.Tasks.splice(removeIndex, 1);

    this.sub = this.http
      .put('http://localhost:8000/api/persons/' + id, this.user)
      .subscribe();
  }
  DeletePostBtn(del: String, id: String) {
    const removeIndex = this.user.Posts.findIndex((item) => item.Title === del);
    this.user.Posts.splice(removeIndex, 1);

    console.log(this.user.Posts);
    this.sub = this.http
      .put('http://localhost:8000/api/persons/' + id, this.user)
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
