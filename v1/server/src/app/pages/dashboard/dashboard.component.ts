import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  token: string = localStorage.getItem('token') || '';
  tests: any[] = [];
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    if (!this.token) {
      this.onNoTokenMessage('No token found, please login again');
      this.route.navigateByUrl('/login');
      //window.location.href = '/login';
    } else {
      this.getAllTests();
    }
  }

  onNoTokenMessage(error: string = '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops... 401 Unauthorized',
      text: error,
    });
  }

  getAllTests() {
    //const id_estudiante = this.authService.getIdEstudiante(); // Reemplaza 'getIdEstudiante()' con el método real para obtener el id_estudiante del servicio de autenticación
    const url = ``;

    this.http
      .get('http://localhost:5000/estudiante/v1/tests/1', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.tests = res.data;
          console.log('Tests: ', this.tests);
        },
        (error) => {
          console.log('Error: ', error);
          alert('Error al obtener los tests');
        }
      );
  }
}
