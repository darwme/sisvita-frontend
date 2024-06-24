import { Component, Input, signal, OnInit } from '@angular/core';
import { Test } from '../../models/test';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { RespuestaSeleccionada } from '../../models/respuesta-seleccionada';
import { Pregunta } from '../../models/pregunta';
import { Situacion } from '../../models/situacion';
import { Seccion } from '../../models/seccion';
import { RespuestasSeccion } from '../../models/respuestas_seccion';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  step = 0;
  @Input({ required: true }) test?: Test;
  selectedOptions: RespuestaSeleccionada[] = [];
  respuestas: RespuestasSeccion[] = [];

  constructor() {
    console.log('Test: ', this.test);
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    console.log('Before incrementing, step is:', this.step);
    this.step++;
    console.log('After incrementing, step is:', this.step);
  }

  prevStep() {
    this.step--;
  }

  onSelectionChange(valorOpcion: number, seccionId: number, testId: number) {
    const selection: RespuestaSeleccionada = {
      valor_opcion: valorOpcion,
      id_seccion: seccionId,
      id_test: testId,
    };
    console.log('Selection: ', selection);
    this.selectedOptions.push(selection);
    console.log('this.selectedOptions: ', this.selectedOptions);
  }

  groupResponses(): RespuestasSeccion[] {
    const grouped: { [key: string]: RespuestasSeccion } = {};

    this.selectedOptions.forEach((respuesta) => {
      const key = `${respuesta.id_seccion}-${respuesta.id_test}`;
      if (!grouped[key]) {
        grouped[key] = {
          respuestas: [],
          id_seccion: respuesta.id_seccion,
          id_test: respuesta.id_test,
        };
      }
      grouped[key].respuestas.push(respuesta.valor_opcion);
    });
    console.log('Grouped: ', grouped);
    return Object.values(grouped);
  }
}
