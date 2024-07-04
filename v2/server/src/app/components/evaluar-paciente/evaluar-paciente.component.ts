import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-evaluar-paciente',
  standalone: true,
  imports: [ MatTableModule ],
  templateUrl: './evaluar-paciente.component.html',
  styleUrl: './evaluar-paciente.component.css'
})
export class EvaluarPacienteComponent {

}
