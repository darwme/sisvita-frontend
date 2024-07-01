import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableDataSource


export interface DetalleDiagnostico {
  seccion: string;
  puntaje: number | null;
  diagnostico: string | null;
}

@Component({
  selector: 'app-detalle-diagnostico',
  standalone: true,
  imports: [ MatTableModule ],
  templateUrl: './detalle-diagnostico.component.html',
  styleUrl: './detalle-diagnostico.component.css'
})


export class DetalleDiagnosticoComponent {
  detallesDiagnostico: DetalleDiagnostico[] = [];
  displayedColumns: string[] = ['seccion', 'puntaje', 'diagnostico'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.detallesDiagnostico = this.transformarDatos();
  }

  transformarDatos(): DetalleDiagnostico[] {
    const detalles: DetalleDiagnostico[] = [];
    const secciones = this.data.secciones.split(',');
    const puntajes = this.data.puntajes.split(',');
    const diagnosticos = this.data.diagnosticos.split(',');

    for (let i = 0; i < secciones.length; i++) {
      detalles.push({
        seccion: secciones[i].trim(),
        puntaje: puntajes[i] ? parseFloat(puntajes[i].trim()) : null,
        diagnostico: diagnosticos[i] ? diagnosticos[i].trim() : null
      });
    }

    if (puntajes.length > secciones.length) {
      const puntajeGeneral = parseFloat(puntajes[puntajes.length - 1].trim());
      const diagnosticoGeneral = diagnosticos[diagnosticos.length - 1].trim();
      detalles.push({
        seccion: 'General',
        puntaje: puntajeGeneral,
        diagnostico: diagnosticoGeneral
      });
    }

    return detalles;
  }
}