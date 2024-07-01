import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';

// Define la interfaz Cita
export interface Cita {
  motivo: string;
  fecha_agenda: Date;
  hora: string; 
  estado: string; 
  especialista: string; 
}

const ELEMENT_DATA: Cita[] = []; 

@Component({
  selector: 'app-visualizar-cita',
  standalone: true,
  imports: [RouterOutlet, CommonModule,MatTableModule],
  templateUrl: './visualizar-cita.component.html',
  styleUrl: './visualizar-cita.component.css',
})
export class VisualizarCitaComponent {
  displayedColumns: string[] = ['motivo', 'fecha_agenda', 'hora', 'estado', 'especialista'];
  dataSource = ELEMENT_DATA;
}