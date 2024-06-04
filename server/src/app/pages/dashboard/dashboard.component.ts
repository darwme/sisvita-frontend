import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tests: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllTests();
  }

  getAllTests() {
    //const id_estudiante = this.authService.getIdEstudiante(); // Reemplaza 'getIdEstudiante()' con el método real para obtener el id_estudiante del servicio de autenticación
    const url = ``;

    this.http
      .get('https://sisvita-backend-gow8.onrender.com/estudiante/v1/tests/1')
      .subscribe(
        (res: any) => {
          this.tests = res.data;
        },
        (error) => {
          console.log('Error: ', error);
          alert('Error al obtener los tests');
        }
      );
  }
}
