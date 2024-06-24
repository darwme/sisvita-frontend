import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IndexComponent } from '../test/index/index.component';
import Swal from 'sweetalert2';
import { DataService } from '../../service/data/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, IndexComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  data: any = {};
  loginObj: Login;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: Router,
    private dataService: DataService
  ) {
    this.loginObj = new Login();
  }

  getData(data: any) {
    this.dataService.setData(data);
    console.log(data);
  }

  onSuccessfulLogin() {
    Swal.fire({
      title: 'Good job!',
      text: 'You are logged in!',
      icon: 'success',
    });
  }

  onErrorMessage(error: string = '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }

  onLogin() {
    this.http
      .post('http://localhost:5000/auth/v1/login', this.loginObj)
      .subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.getData(res.data);
            this.onSuccessfulLogin();
            localStorage.setItem('token', res.data.token);
            this.data = res.data;
            console.log(this.data);
            this.route.navigateByUrl(`${res.data.codigo_estudiante}/test`);
          } else {
            this.errorMessage = res.message || 'Login Failed';
            this.onErrorMessage(res.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.error;
          this.onErrorMessage(this.errorMessage);
        },
      });
  }
}
export class Login {
  email: string = '';
  clave: string = '';

  constructor(email: string = '', clave: string = '') {
    this.email = email;
    this.clave = clave;
  }
}
