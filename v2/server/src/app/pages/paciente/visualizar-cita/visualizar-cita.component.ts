import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-visualizar-cita',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './visualizar-cita.component.html',
  styleUrl: './visualizar-cita.component.css',
})
export class VisualizarCitaComponent {}
