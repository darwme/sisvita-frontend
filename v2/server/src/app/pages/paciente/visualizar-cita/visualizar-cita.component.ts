import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';

// Define la interfaz Cita
export interface Cita {
  motivo: string;
  fecha_agenda: Date;
  hora: string; // Aquí asumo que 'hora' es un string, ya que Angular no tiene un tipo 'Time' directo
  estado: string; // Aquí asumo que 'estado' es un string
  especialista: string; // Aquí asumo que 'especialista' es un string
}

const ELEMENT_DATA: Cita[] = []; // Inicializa los datos según la interfaz Cita
/**
 * @title Basic use of `<table mat-table>`
 */


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