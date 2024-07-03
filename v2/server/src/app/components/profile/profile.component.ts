import { Component, computed, Input, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Paciente } from '../../models/profile';
import { Especialista } from '../../models/profile';
import { DeacoderService } from '../../services/deacoder.service';
import { ProfileGestionService } from '../../services/profile-gestion.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})


export class ProfileComponent {
  @Input() collapsed: boolean = false;
  user: any; // Puede ser Paciente, Especialista o Administrador

  constructor(
    private router: Router, 
    private profileService: ProfileGestionService,
    private deacoder: DeacoderService
  ) {
    this.onDecrypt(); // Llama a onDecrypt al construir el componente
  }

  onDecrypt(): void {
    // Descifra los datos almacenados en localStorage
    const dataDecrypt = this.deacoder.decrypt(localStorage.getItem('data'));
    const personaType = localStorage.getItem('personaType');
    const codigoPaciente = localStorage.getItem('codigo_paciente');
    const codigoEspecialista = localStorage.getItem('codigo_especialista');


    if (personaType === 'paciente' && codigoPaciente) {
      this.profileService.getDatosPaciente(codigoPaciente).subscribe(
        (data: Paciente) => {
          this.user = data;
          console.log('Datos del Paciente:', this.user);
        }
      );
    } else if (personaType === 'especialista' && codigoEspecialista) {
      this.profileService.getDatosEspecialista(codigoEspecialista).subscribe(
        (data: Especialista) => {
          this.user = data;
          console.log('Datos del Especialista:', this.user);
        },
      );
    } else (personaType === 'administrador') {
      // Asignar los datos del administrador directamente desde los datos descifrados
      this.user = dataDecrypt.administrador;
      console.log('Datos del Administrador:', this.user);
    } 
  }
}