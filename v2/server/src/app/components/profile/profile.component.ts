import { Component, computed, Input, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DeacoderService } from '../../services/deacoder.service';
import { Paciente, Especialista } from '../../models/profile'; // Importa Paciente y Especialista
import { ProfileGestionService } from '../../services/profile-gestion.service'
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})


export class ProfileComponent {
  type?: string;
  personaType?: string;
  sidenavCollapsed = signal(false);
  dataDecrypt?: any;
  user?: Paciente | Especialista | any; // Acepta los tipos Paciente y Especialista
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }

  constructor(
    private router: Router,
    private deacoder: DeacoderService,
    private profileGestionService: ProfileGestionService // Inyecta el servicio
  ) {
    this.initializeProfile();
  }

  // Método para inicializar el perfil
  initializeProfile() {
    this.dataDecrypt = this.deacoder.decrypt(localStorage.getItem('data'));
    this.type = localStorage.getItem('userType') || undefined;
    this.user = this.dataDecrypt;

    if (!this.type) {
      console.log('No userType found in localStorage');
    } else {
      this.personaType = localStorage.getItem('personaType') || undefined;
      if (!this.personaType) {
        this.router.navigate(['/auth/logout']);
      } else {
        if (this.personaType === 'paciente') {
          this.user = this.user.paciente;
          this.loadPacienteData(this.user.codigo_paciente);
        } else if (this.personaType === 'especialista') {
          this.user = this.user.especialista;
          this.loadEspecialistaData(this.user.codigo_especialista);
        } else {
          this.user = this.user.administrador;
        }
      }
    }

    console.log('User:', this.user);
  }

  loadPacienteData(codigo_paciente: string) {
    this.profileGestionService.getDatosPaciente(codigo_paciente).subscribe(
      (paciente: Paciente) => {
        this.user = { ...this.user, ...paciente };
        console.log('Paciente Data:', this.user);
      },
      (error) => {
        console.error('Error fetching paciente data:', error);
      }
    );
  }

  loadEspecialistaData(codigo_especialista: string) {
    this.profileGestionService.getDatosEspecialista(codigo_especialista).subscribe(
      (especialista: Especialista) => {
        this.user = { ...this.user, ...especialista };
        console.log('Especialista Data:', this.user);
      },
      (error) => {
        console.error('Error fetching especialista data:', error);
      }
    );
  }
}