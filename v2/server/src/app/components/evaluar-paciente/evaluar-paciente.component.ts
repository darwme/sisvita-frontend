import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Historial } from '../../models/historial';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluacionService } from '../../services/evaluacion.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluar-paciente',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './evaluar-paciente.component.html',
  styleUrl: './evaluar-paciente.component.css',
})
export class EvaluarPacienteComponent implements OnInit {
  puntaje: string | undefined;
  evaluarForm: FormGroup;
  codigo_historial: string = '';
  codigo_especialista: string = '';

  constructor(
    private evaluacionService: EvaluacionService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder
  ) {
    console.log('datoz recibidoz en evalur paciente: ', this.data);
    this.puntaje = this.obtenerUltimoDiagnostico(this.data.paciente.puntajes);
    this.codigo_historial = this.data.codigoHistorialTest || '';
    this.codigo_especialista = this.data.codigoEspecialista || '';
    this.evaluarForm = this._formBuilder.group({
      fundamento_cientifico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      descripcion_tratamiento: ['', Validators.required],
      comunicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  obtenerUltimoDiagnostico(puntajes: string): string {
    if (!puntajes) return '';
    const diagnosArray = puntajes.split(',');
    return diagnosArray[diagnosArray.length - 1].trim();
  }

  onEvaluarTest(): void {
    console.log('evaluar test');
    console.log('form value: ', this.evaluarForm.value);
    this.evaluacionService
      .postEnviarEvaluacion(
        this.evaluarForm.value,
        this.codigo_especialista,
        this.codigo_historial
      )
      .subscribe({
        next: (res) => {
          console.log('res: ', res);
        },
        error: (error) => {
          console.log('error: ', error);
          Swal.close();
          this.onErrorMessage(error.error.message);
        },
        complete: () => {
          Swal.close();
          this.onSuceessfulRegister();
        },
      });
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
