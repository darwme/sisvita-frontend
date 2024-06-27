import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

// Define la interfaz para los datos del test realizado
export interface TestRealizado {
  id: number;
  test: string;
  fecha_realizada: Date;
  puntajes: number;
  diagnosticos: string;
}

const ELEMENT_DATA: TestRealizado[] = []; // Inicializa los datos según la interfaz TestRealizado


@Component({
  selector: 'app-visualizar-test-realizado',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './visualizar-test-realizado.component.html',
  styleUrl: './visualizar-test-realizado.component.css'
})
export class VisualizarTestRealizadoComponent {
  displayedColumns: string[] = ['id', 'test', 'fecha_realizada', 'puntajes', 'diagnosticos'];
  dataSource = ELEMENT_DATA;
}
