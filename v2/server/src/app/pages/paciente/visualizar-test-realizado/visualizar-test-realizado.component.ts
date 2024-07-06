import { Subscription } from 'rxjs';
import { PacienteService } from './../../../services/paciente.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Historial } from '../../../models/historial';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { DetalleDiagnosticoComponent } from '../../../components/detalle-diagnostico/detalle-diagnostico.component';
import { EvaluacionDocComponent } from '../../../components/evaluacion-doc/evaluacion-doc.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-visualizar-test-realizado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './visualizar-test-realizado.component.html',
  styleUrls: ['./visualizar-test-realizado.component.css']  
})


export class VisualizarTestRealizadoComponent {
  token: any = {};
  displayedColumns: string[] = ['position', 'test', 'fecha', 'hora', 'diagnostico', 'evaluacion'];
  dataSource = new MatTableDataSource<Historial>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {
    // Intentar obtener el token del almacenamiento local
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Decodificar el token solo si existe
      this.token = jwtDecode(storedToken);

      if (this.token && typeof this.token.sub === 'number') {
        const id_usuario = this.token.sub;
        this.getPacienteHistorial(id_usuario);
      } else {
        console.warn('El token no contiene un "sub" válido.');
      }
    } else {
      // Manejo del caso donde el token no está presente
      console.warn('No se encontró un token en el almacenamiento local.');
    }
  }

  getPacienteHistorial(id: number): void {
    this.pacienteService.getHistorialByIdTest(id).subscribe(
      (response) => {
        this.dataSource.data = response; // Asigna los datos obtenidos al dataSource
        this.dataSource.paginator = this.paginator; // Configura el paginador después de recibir los datos
      },
      (error) => {
        console.error('Error al obtener el historial del paciente:', error);
        // Manejo de errores según sea necesario
      }
    );
  }

  abrirDetalleEvaluacion(codigoHistorialTest: string, element: Historial): void {
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


  abrirDetalleDiagnostico(element: Historial): void {
    console.log(element);
    this.dialog.open(DetalleDiagnosticoComponent, {
      data: {
        puntajes: element.puntajes,
        diagnosticos: element.diagnosticos,
        secciones: element.secciones
      }
    });
  }
}