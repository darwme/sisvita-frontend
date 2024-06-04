import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

enum Tipo_usuario {
  Estudiante = 'estudiante',
  Especialista = 'especialista',
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: Login;
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: Router) {
    this.loginObj = new Login('', '', Tipo_usuario.Estudiante);
  }

  onLogin() {
    this.http
      .post(
        'https://sisvita-backend-gow8.onrender.com/auth/v1/login',
        this.loginObj
      )
      .subscribe({
        next: (res: any) => {
          console.log('Response from server: ', res);
          if (res.status === 200) {
            alert('Login Success');
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.route.navigateByUrl('/dashboard');
          } else {
            this.errorMessage = res.message || 'Login Failed';
            alert('Login Failed: ' + this.errorMessage);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error: ', err);
          this.errorMessage =
            err.error.message || 'Error al loguear el usuario';
          alert('Login Failed: ' + this.errorMessage);
        },
      });
  }
}
export class Login {
  email: string = '';
  clave: string = '';
  tipo_usuario: Tipo_usuario = Tipo_usuario.Estudiante;

  constructor(
    email: string = '',
    clave: string = '',
    tipo_usuario: Tipo_usuario
  ) {
    this.email = email;
    this.clave = clave;
    this.tipo_usuario = tipo_usuario;
  }
}
