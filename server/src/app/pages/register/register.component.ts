import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerObj: Register;
  year = new Date().getFullYear();

  constructor(private http: HttpClient, private route: Router) {
    this.registerObj = new Register();
  }

  onSuccessfulRegister() {
    Swal.fire({
      title: 'Good job!',
      text: 'You are registered!',
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

  onRegister() {
    this.http
      .post('http://localhost:5000/auth/v1/register', this.registerObj)
      .subscribe({
        next: (res: any) => {
          if (res.status === 201) {
            this.onSuccessfulRegister();
            this.route.navigateByUrl('/login');
          } else {
            this.onErrorMessage(res.message || 'Register Failed');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.onErrorMessage(err.error.error);
        },
      });
  }
}

export class Register {
  nombre!: string;
  apellido!: string;
  email!: string;
  clave!: string;
  confirm_clave!: string;
  fecha_nacimiento: Date = new Date();
  sexo!: string;
  codigo_estudiante?: number;
  estado_civil: string = 'S';
  tipo_usuario: string = 'estudiante';
  is_admin: boolean = false;
  especialidad?: string;
  carrera_profesional?: string;

  constructor(
    nombre: string = '',
    apellido: string = '',
    email: string = '',
    clave: string = '',
    confirm_clave: string = '',
    fecha_nacimiento: Date = new Date(),
    sexo: string = '',
    codigo_estudiante?: number,
    estado_civil: string = 'S',
    tipo_usuario: string = 'estudiante',
    is_admin: boolean = false,
    especialidad?: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.clave = clave;
    this.confirm_clave = confirm_clave;
    this.fecha_nacimiento = fecha_nacimiento;
    this.sexo = sexo;
    this.codigo_estudiante = codigo_estudiante;
    this.estado_civil = estado_civil;
    this.tipo_usuario = tipo_usuario;
    this.is_admin = is_admin;
    this.especialidad = especialidad;
    this.carrera_profesional = especialidad;
  }
}
