import { Component, Input, OnInit, Output } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../../login/login.component';
import { DataService } from '../../../service/data/data.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, HttpClientModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  dato: any = {};
  estudiante = new Estudiante();

  constructor(
    private pogressService: ProgressService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    this.dato = this.dataService.datoEstudiante$;
  }

  ngOnInit(): void {
    this.dato.subscribe((data: any) => {
      this.dato = data;
      this.estudiante = this.dato;
    });
  }

  test() {
    this.completeIndexTest();
    this.router.navigateByUrl('/test/cognitivo');
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('index');
  }
}

export class Estudiante {
  id_estudiante!: number;
  id_usuario!: number;
  token!: string;
  carrera_profesional!: string;
  codigo_estudiante!: string;
  usuario: Usuario = new Usuario();
}

export class Usuario {
  nombre!: string;
  apellido!: string;
  email!: string;
  estado_civil!: string;
  fecha_nacimiento!: string;
  sexo: string = '';
  tipo_usuario!: string;
}
