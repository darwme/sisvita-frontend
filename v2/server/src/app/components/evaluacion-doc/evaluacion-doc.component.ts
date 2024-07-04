import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableDataSource
import { Historial } from '../../models/historial';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-doc',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './evaluacion-doc.component.html',
  styleUrl: './evaluacion-doc.component.css',
})
export class EvaluacionDocComponent {}
