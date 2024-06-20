import { HttpClient } from '@angular/common/http';
import { Test } from '../../models/test';
import { Seccion } from '../../models/seccion';
import { Pregunta } from '../../models/pregunta';
import { Situacion } from '../../models/situacion';
import { Opcion } from '../../models/opcion';
import { Rango } from '../../models/rango';
import { TestService } from '../../services/test.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardHeader } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  step = signal(0);
  testForm: FormGroup;
  jsonFile: any;
  tests: Test[] = [];
  opciones: Opcion[] = [];
  rangos: Rango[] = [];
  secciones: Seccion[] = [];
  situaciones: Situacion[] = [];
  preguntas: Pregunta[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private testService: TestService,
    private http: HttpClient
  ) {
    this.testForm = new FormGroup({
      nombre: new FormControl(''),
      secciones: new FormControl({
        descripcion: new FormControl(''),
        situaciones: new FormControl({
          descripcion: new FormControl(''),
          preguntas: new FormControl({
            descripcion: new FormControl(''),
          }),
        }),
      }),
      opciones: new FormControl({
        descripcion: new FormControl(''),
        valor_opcion: new FormControl(''),
      }),
    });
  }

  ngOnInit() {
    this.getTest();
    //this.loadJson();
  }

  seccionarDatosTests() {
    this.tests.forEach((test) => {
      this.secciones = test.secciones;
      this.secciones.forEach((seccion) => {
        this.situaciones = seccion.situaciones;
        this.situaciones.forEach((situacion) => {
          this.preguntas = situacion.preguntas;
        });
      });
    });
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

  getTest(): void {
    this.testService.getTestsAdmin().subscribe(
      (result: any) => {
        this.tests = result;
        console.log('Tests: ', this.tests);
        console.log('Tests: ', this.tests[0].nombre);
        console.log('Tests: ', this.tests[0], this.tests[1]);
        console.log('Secciones: ', this.secciones);
        this.seccionarDatosTests();
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
  /*
  loadJson() {
    this.http.get('../../assets/test-info.json').subscribe(
      (data) => {
        this.jsonFile = data;
        console.log(this.jsonFile);
        const dataTest = this.jsonFile.test;
        if (typeof dataTest !== 'undefined' && !Array.isArray(dataTest)) {
          this.tests = Object.keys(dataTest).map((key: string) => {
            console.log('test: ', `${key}`, dataTest[key]);
            return dataTest[key];
          });
          console.log('test is an object: ', this.tests);
        } else {
          console.log('test is not an object');
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
*/
  getTestName(test: Test): string {
    return test.nombre;
  }
}
