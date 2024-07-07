import { EvaluarPacienteComponent } from './../../../components/evaluar-paciente/evaluar-paciente.component';
import { Subscription } from 'rxjs';
import { PacienteService } from './../../../services/paciente.service';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Historial_e } from '../../../models/historial';
import { DeacoderService } from '../../../services/deacoder.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { DetalleDiagnosticoComponent } from '../../../components/detalle-diagnostico/detalle-diagnostico.component';
import { EvaluacionDocComponent } from '../../../components/evaluacion-doc/evaluacion-doc.component';
import { HeadMapComponent } from '../../../components/head-map/head-map.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-tests-realizados',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './visualizar-tests-realizados.component.html',
  styleUrl: './visualizar-tests-realizados.component.css',
})
export class VisualizarTestsRealizadosComponent {
  displayedColumns: string[] = [
    'position',
    'paciente',
    'test',
    'fecha',
    'diagnostico general',
    'detalle diagnosticos',
    'evaluacion',
    'evaluar',
  ];
  dataSource = new MatTableDataSource<Historial_e>();
  data?: Historial_e[];
  elementSelected: Historial_e | null = null;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private deacoderService: DeacoderService
  ) {
    this.getPacienteHistorial();
  }

  openDialog() {
    const dialogData = new MatDialogConfig();
    dialogData.data = { ...this.dataSource.data };
    console.log('Dialog data:', dialogData.data);

    this.dialog.open(HeadMapComponent, dialogData);
  }

  getPacienteHistorial(): void {
    this.pacienteService.getHistorialByIdTests().subscribe(
      (response: Historial_e[]) => {
        this.dataSource.data = response.map((item) => ({
          ...item,
          // Añadir el campo 'diagnostico general' con el último diagnóstico
          'diagnostico general': this.obtenerUltimoDiagnostico(
            item.diagnosticos
          ),
        }));
        this.dataSource.paginator = this.paginator;
        this.data = response;
        console.log('Historial del paciente:', this.dataSource.data);
        console.log('Historial del paciente:', response);
      },
      (error) => {
        console.error('Error al obtener el historial del paciente:', error);
      }
    );
  }

  abrirDetalleEvaluacion(codigoHistorialTest: string, element: Historial_e): void {
    if (element.estado === "evaluado") {
      this.dialog.open(EvaluacionDocComponent, {
        data: {
          codigoHistorialTest: codigoHistorialTest
        }
      });
    }
    else {
      Swal.fire({
        title: 'Mensaje',
        text: 'Este test no se ha evaluado todavia',
        icon: 'info',
      });
    }
  }

  abrirDetalleDiagnostico(element: Historial_e): void {
    this.dialog.open(DetalleDiagnosticoComponent, {
      data: {
        puntajes: element.puntajes,
        diagnosticos: element.diagnosticos,
        secciones: element.secciones,
      },
    });
  }

  evaluar(element: Historial_e): void {
    if (element.estado === "no evaluado") {
      const dataa = localStorage.getItem('data');
      console.log('element:', element);
      if (dataa) {
        const decodedToken: any = this.deacoderService.decrypt(dataa);
        console.log('decodedToken:', decodedToken);
        const codigoEspecialista = decodedToken.especialista.codigo_especialista;
        console.log('codigoEspecialista:', codigoEspecialista);
  
        this.dialog.open(EvaluarPacienteComponent, {
          data: {
            codigoHistorialTest: element.codigo_historial_test,
            codigoEspecialista: codigoEspecialista,
            paciente: element,
          },
        });
      } else {
        console.error('Token no encontrado');
      }
    } else {
      Swal.fire({
        title: 'Mensaje',
        text: 'Este test ya se ha evaluado',
        icon: 'info',
      });
    }
  }
  

  obtenerUltimoDiagnostico(diagnosticos: string): string {
    if (!diagnosticos) return '';
    const diagnosArray = diagnosticos.split(',');
    return diagnosArray[diagnosArray.length - 1].trim();
  }

}
