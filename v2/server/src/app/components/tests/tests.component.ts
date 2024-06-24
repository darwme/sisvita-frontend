import { HttpClient } from '@angular/common/http';
import { Test } from '../../models/test';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TestComponent } from '../test/test.component';
import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-tests',
  standalone: true,

  imports: [
    MatDividerModule,
    ScrollingModule,
    MatListModule,
    MatCardModule,
    CommonModule,
    TestComponent,
    RouterOutlet,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent {
  step = 0;
  isLinear = false;
  tests?: Test[];
  testSelected?: Test;
  acciones: string[] = ['Paciente', 'Especialista', 'Tests'];
  constructor(private testService: TestService, private http: HttpClient) {}

  ngOnInit() {
    this.getTest();
  }

  getTotalSituaciones(test: Test): number {
    let totalSituaciones = 0;
    test.secciones.forEach((seccion) => {
      totalSituaciones += seccion.situaciones.length;
    });
    return totalSituaciones;
  }

  getTotalPreguntas(test: Test): number {
    let totalPreguntas = 0;
    test.secciones.forEach((seccion) => {
      seccion.situaciones.forEach((situacion) => {
        totalPreguntas += situacion.preguntas.length;
      });
    });
    return totalPreguntas;
  }

  goToTestById(id: number) {
    console.log('Go to test: ', id);
  }

  getTestSelected(test: Test) {
    const testRedirect = (this.testSelected = test);
    console.log('Test selected: ', testRedirect);
  }

  getTest(): void {
    this.testService.getTestsAdmin().subscribe(
      (result: any) => {
        this.tests = result;
        console.log('Tests: ', this.tests);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los tests',
          text: err.error.message,
        });
      }
    );
  }
}
