import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvaluacionService } from '../../services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion';
import { CommonModule } from '@angular/common'; // Importa CommonModule si es necesario

@Component({
  selector: 'app-evaluacion-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion-doc.component.html',
  styleUrl: './evaluacion-doc.component.css'
})


export class EvaluacionDocComponent {
  user?: Evaluacion| any; // Acepta los tipos Paciente y Especialista
  datos?: Evaluacion| any;
  constructor(
    private evaluacionService: EvaluacionService,
    @Inject(MAT_DIALOG_DATA) public data: { codigoHistorialTest: string }
  ) {
    this.loadEvaluacionData(this.data.codigoHistorialTest);
  }

  private loadEvaluacionData(codigoHistorialTest: string): void {
    this.evaluacionService.getEvaluacionTest(codigoHistorialTest).subscribe(
      (evaluacion: Evaluacion) => {
        this.user = { ...this.user, ...evaluacion };
        this.datos = this.user[0]
      },
      (error) => {
        console.error('Error al obtener la evaluación:', error);
      }
    );
  }

  getLastDiagnosis(diagnosticos: string): string {
    if (!diagnosticos) return '';

    // Separar los diagnósticos por coma y eliminar espacios adicionales
    const diagnosArray = diagnosticos.split(',').map(diag => diag.trim());

    // Obtener el último diagnóstico
    const lastDiagnosis = diagnosArray[diagnosArray.length - 1];

    return lastDiagnosis;
  }



}