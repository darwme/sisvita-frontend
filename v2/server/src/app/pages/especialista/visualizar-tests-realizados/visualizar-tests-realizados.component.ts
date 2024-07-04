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

@Component({
  selector: 'app-visualizar-tests-realizados',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  templateUrl: './visualizar-tests-realizados.component.html',
  styleUrl: './visualizar-tests-realizados.component.css'
})
export class VisualizarTestsRealizadosComponent {

}
