import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Historial } from '../../models/historial';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

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
  pacienteForm: FormGroup | undefined;
  tratamientoForm?: FormGroup | undefined;
  recomendacionesForm?: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('datoz recibidoz en evalur paciente: ', this.data);
    this.puntaje = this.obtenerUltimoDiagnostico(this.data.paciente.puntajes);
  }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      dni: [{ value: '', disabled: true }, Validators.required],
      edad: [{ value: '', disabled: true }, Validators.required],
      sexo: [{ value: '', disabled: true }, Validators.required],
    });

    this.tratamientoForm = this.fb.group({
      descripcion: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });

    this.recomendacionesForm = this.fb.group({
      recomendaciones: ['', Validators.required],
    });
  }

  obtenerUltimoDiagnostico(puntajes: string): string {
    if (!puntajes) return '';
    const diagnosArray = puntajes.split(',');
    return diagnosArray[diagnosArray.length - 1].trim();
  }
}
