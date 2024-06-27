import { HttpClient } from '@angular/common/http';
import { Test } from '../../models/test';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { MatExpansionModule } from '@angular/material/expansion';

import { jwtDecode } from 'jwt-decode';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DeacoderService } from '../../services/deacoder.service';
import { RespuestasSeccion } from '../../models/respuestas_seccion';
import { reduce } from 'rxjs';
import { Response, seccionb } from '../../models/seccion-b';

@Component({
  selector: 'app-tests',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatDividerModule,
    ScrollingModule,
    MatListModule,
    MatCardModule,
    CommonModule,
    RouterOutlet,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardActions,
    MatCardModule,
    MatRadioModule,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent implements OnInit {
  step = 0;
  isLinear = false;
  tests!: Test[];
  testSelected?: Test;
  testSend?: Test;
  acciones: string[] = ['Paciente', 'Especialista', 'Tests'];
  isOptionsSelecteded: boolean[] = [];
  indiceSeccionActual: number = 0;
  user?: any;
  sendResponse: RespuestasSeccion[] = [];
  respuestas: any[] = [];
  contadorRespuestas: number[] = [];
  testsForm: FormGroup;
  token: any;
  deacoderToken: any;
  preguntasz: number[] = [];
  seccion: seccionb = {} as seccionb;
  secciones_b: seccionb[] = [];
  respuesta_b: Response = {} as Response;

  constructor(
    private testService: TestService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private deacoder: DeacoderService
  ) {
    this.getTest();
    this.formBuilder = new FormBuilder();
    this.testsForm = this.formBuilder.group({
      secciones: this.formBuilder.array([]),
    });
    this.token = localStorage.getItem('token');
    this.deacoderToken = jwtDecode(this.token || '');
    console.log('Tests desde constructor: ', this.tests);
    this.user = deacoder.decrypt(localStorage.getItem('data'));
    console.log('User: ', this.user ?? 'User is undefined');
  }

  ngOnInit() {}

  onSelectionChange(
    valor_seleccionado: any,
    testIndex: number,
    seccionIndex: number,
    situacionIndex: number,
    preguntaIndex: number
  ) {
    const personaType = localStorage.getItem('personaType');
    let id_usuario = '';
    if (personaType === 'paciente' || 'mixto') {
      id_usuario = this.user?.paciente?.persona?.usuario?.id_usuario;
    }
    if (personaType === 'especialista') {
      id_usuario = this.user?.especialista?.persona.usuario?.id_usuario;
    }

    const respuesta = {
      respuesta: valor_seleccionado,
      id_test: testIndex,
      id_seccion: seccionIndex,
      id_situacion: situacionIndex,
      id_pregunta: preguntaIndex,
      id_usuario: id_usuario,
    };

    this.preguntasz.push(valor_seleccionado);

    console.log('Seccionz: ', this.preguntasz);

    const indiceExistente = this.respuestas.findIndex(
      (r) =>
        r.id_seccion === seccionIndex &&
        r.id_test === testIndex &&
        r.id_situacion === situacionIndex &&
        r.id_pregunta === preguntaIndex &&
        r.id_usuario === id_usuario
    );

    if (indiceExistente !== -1) {
      this.respuestas[indiceExistente] = respuesta;
    } else {
      this.respuestas.push(respuesta);
    }
    console.log('Respuestas: ', this.respuestas);
    console.log('respuestas length', this.respuestas.length);
    console.log(
      'cantidad de preguntas por seccion:',
      this.contadorRespuestas[this.step]
    );
  }

  validateSeccion(step: number) {
    const respuestasContestadas = this.respuestas.length;
    const respuestasTotales = this.contadorRespuestas[step];
    if (respuestasContestadas === respuestasTotales) {
      return true;
    }
    return false;
  }

  // Método para agregar una respuesta al array de respuestas
  agregarRespuesta(
    valor_seleccionado: any,
    testIndex: number,
    seccionIndex: number,
    situacionIndex: number,
    preguntaIndex: number
  ) {
    const personaType = localStorage.getItem('personaType');
    let id_usuario = '';
    if (personaType === 'paciente' || 'mixto') {
      id_usuario = this.user?.paciente?.persona?.usuario?.id_usuario;
    }
    if (personaType === 'especialista') {
      id_usuario = this.user?.especialista?.persona.usuario?.id_usuario;
    }
    this.respuestas.forEach((respuesta) => {
      respuesta.id_usuario = id_usuario;
    });

    const respuesta = {
      respuesta: valor_seleccionado,
      id_test: testIndex,
      id_seccion: seccionIndex,
      id_situacion: situacionIndex,
      id_pregunta: preguntaIndex,
      id_usuario: id_usuario,
    };

    this.respuestas.push(respuesta);
    console.log('Respuestas: ', this.respuestas);
  }

  // Método para filtrar y agrupar respuestas por id_test, id_seccion e id_usuario
  filtrarRespuestas(id_test: number, id_seccion: number) {
    const personaType = localStorage.getItem('personaType');
    let id_usuario = '';
    if (personaType === 'paciente' || 'mixto') {
      id_usuario = this.user?.paciente?.persona?.usuario?.id_usuario;
    }
    if (personaType === 'especialista') {
      id_usuario = this.user?.especialista?.persona.usuario?.id_usuario;
    }

    const respuestas = this.respuestas
      .filter(
        (respuesta) =>
          respuesta.id_test === id_test &&
          respuesta.id_seccion === id_seccion &&
          respuesta.id_usuario === id_usuario
      )
      .map((respuesta) => {
        return respuesta.respuesta;
      });

    console.log('Respuestas filtradas: ', respuestas);

    const respuestasSeccion = {
      id_test: id_test,
      id_seccion: id_seccion,
      id_usuario: id_usuario,
      respuestas: respuestas,
    };

    console.log('Respuestas filtradas: ', respuestasSeccion);

    this.sendResponse.push(respuestasSeccion);

    console.log('Respuestas agrupadas: ', this.sendResponse);
  }

  contarPreguntasPorSeccion(testSelected: Test): number[] {
    const resultado: number[] = [];
    if (testSelected) {
      testSelected.secciones.forEach((seccion, index) => {
        let contadorPreguntas = 0;

        seccion.situaciones.forEach((situacion) => {
          contadorPreguntas += situacion.preguntas.length;
        });

        // Almacenar el número de preguntas en el índice correspondiente a la sección
        resultado[index] = contadorPreguntas;
      });
    }

    console.log('Contador de preguntas por sección: ', resultado);
    return resultado;
  }

  setStep(index: number) {
    this.step = index;
    this.indiceSeccionActual = index;
  }

  getTest(): void {
    this.testService.getTestsAdmin().subscribe(
      (result: any) => {
        this.tests = result;
        console.log('Tests de backend: ', this.tests);
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

  prevStep() {
    if (this.step > 0) {
      this.indiceSeccionActual = this.step - 1;
      this.step--;
    }
  }

  nextStep(id_test: number, id_seccion: number, last_seccion: number) {
    console.log('Step: ', this.step, 'last-seccion: ', last_seccion);
    const preg = this.preguntasz;
    this.preguntasz = [];
    const isValid = this.validateSeccion(this.step);
    if (isValid) {
      this.filtrarRespuestas(id_test, id_seccion);

      this.secciones_b.push({
        id_seccion: id_seccion,
        respuestas: preg,
      });
      console.log('Secciones b: ', this.secciones_b);

      this.respuestas.length = 0;
      console.log('Respuestas reseteadas: ', this.respuestas);

      this.step++;

      //const token = this.deacoder.decrypt(localStorage.getItem('token'));
      //console.log('Token: ', token);
      const id_usuario = this.user?.paciente?.persona?.usuario?.id_usuario;
      console.log('Id usuario: ', id_usuario);

      if (this.step === last_seccion) {
        this.respuesta_b = {
          id_test: id_test,
          secciones: this.secciones_b,
        };
        console.log('Respuesta b: ', this.respuesta_b);
        const respuesta = this.respuesta_b;
        this.send(respuesta, id_usuario);
        this.respuesta_b = {} as Response;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe responder todas las preguntas de la sección',
      });
    }
  }

  send(respuestas: Response, id_usuario: number) {
    console.log('Respuestas a enviar: ', respuestas);
    this.testService.postResponse(respuestas, id_usuario).subscribe(
      (result: any) => {
        console.log('Test enviado: ', result);
        Swal.fire({
          icon: 'success',
          title: 'Test enviado',
          text: 'Gracias por responder el test',
        });
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el test',
          text: err.error.message,
        });
      }
    );
  }

  getTotalSituaciones(test: Test): number {
    let totalSituaciones = 0;
    test.secciones.forEach((seccion) => {
      totalSituaciones += seccion.situaciones.length;
    });
    return totalSituaciones;
  }

  getTotalPreguntas(test: Test): number {
    this.tests?.length;
    let totalPreguntas = 0;
    test.secciones.forEach((seccion) => {
      seccion.situaciones.forEach((situacion) => {
        totalPreguntas += situacion.preguntas.length;
      });
    });
    this.isOptionsSelecteded.length = totalPreguntas;
    this.isOptionsSelecteded.fill(false);
    return totalPreguntas;
  }

  getTestSelected(test: Test) {
    const testRedirect = (this.testSelected = test);
    console.log('Test selected: ', testRedirect);
    if (this.testSelected) {
      this.contadorRespuestas = this.contarPreguntasPorSeccion(
        this.testSelected as Test
      );
    }
    console.log('Ahora: ', this.contadorRespuestas);
  }

  onSuceessfulRegister() {
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
    });
  }
}
