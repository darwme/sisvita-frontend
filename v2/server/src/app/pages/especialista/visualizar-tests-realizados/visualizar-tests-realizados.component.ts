import { EvaluarPacienteComponent } from './../../../components/evaluar-paciente/evaluar-paciente.component';
import { Subscription } from 'rxjs';
import { PacienteService } from './../../../services/paciente.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Historial_e } from '../../../models/historial';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { DetalleDiagnosticoComponent } from '../../../components/detalle-diagnostico/detalle-diagnostico.component';
import { EvaluacionDocComponent } from '../../../components/evaluacion-doc/evaluacion-doc.component';
@Component({
  selector: 'app-visualizar-tests-realizados',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './visualizar-tests-realizados.component.html',
  styleUrl: './visualizar-tests-realizados.component.css'
})


export class VisualizarTestsRealizadosComponent {
  displayedColumns: string[] = ['position', 'paciente', 'test', 'fecha', 'diagnostico general','detalle diagnosticos', 'estado', 'evaluacion', 'evaluar'];
  dataSource = new MatTableDataSource<Historial_e>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {
    this.getPacienteHistorial();
  }

  getPacienteHistorial(): void {
    this.pacienteService.getHistorialByIdTests().subscribe(
      (response: Historial_e[]) => {
        this.dataSource.data = response.map(item => ({
          ...item,
          // Añadir el campo 'diagnostico general' con el último diagnóstico
          'diagnostico general': this.obtenerUltimoDiagnostico(item.diagnosticos)
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener el historial del paciente:', error);
      }
    );
  }

  abrirDetalleEvaluacion(codigoHistorialTest: string): void {
    this.dialog.open(EvaluacionDocComponent, {
      data: {
        codigoHistorialTest: codigoHistorialTest
      }
    });
  }

  abrirDetalleDiagnostico(element: Historial_e): void {
    this.dialog.open(DetalleDiagnosticoComponent, {
      data: {
        puntajes: element.puntajes,
        diagnosticos: element.diagnosticos,
        secciones: element.secciones
      }
    });
  }

  evaluar(element: Historial_e): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const codigoEspecialista = decodedToken.codigo_especialista;

      this.dialog.open(EvaluarPacienteComponent, {
        data: {
          codigoHistorialTest: element.codigo_historial_test,
          codigoEspecialista: codigoEspecialista
        }
      });
    } else {
      console.error('Token no encontrado');
    }
  }

  obtenerUltimoDiagnostico(diagnosticos: string): string {
    if (!diagnosticos) return '';
    const diagnosArray = diagnosticos.split(',');
    return diagnosArray[diagnosArray.length - 1].trim();
  }
}