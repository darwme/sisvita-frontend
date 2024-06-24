import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'; // Add this import
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { DataService } from '../../services/data.service';
import { LoginResponse } from '../../models/loginResponse';
import { Output } from '@angular/core';
import { DeacoderService } from '../../services/deacoder.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CustomSidenavComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  dataCrypted?: any;
  token?: any;
  data?: any;
  collapsed = signal(false);
  deacodedToken: any;
  userType?: string;
  personaType?: string;
  typeOf?: any;
  types: string[] = [];

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  constructor(
    private dataService: DataService,
    private deacoderService: DeacoderService
  ) {
    this.init();
  }

  init() {
    this.dataCrypted = localStorage.getItem('data');
    this.token = localStorage.getItem('token');
    this.data = this.deacoderService.decrypt(this.dataCrypted);
    this.assignTypes();
  }

  assignTypes() {
    console.log('Data:', this.data);
    this.typeOf = this.data;
    console.log('Paciente:', this.typeOf);
    this.personaType = this.data?.paciente?.persona?.tipo_persona;
    console.log('PersonaType:', this.personaType);
    this.userType = this.data?.paciente?.persona?.usuario?.tipo_usuario;
    console.log('UserType:', this.userType);

    if (this.userType !== 'administrador') {
      switch (this.personaType) {
        case 'especialista':
          this.types = ['especialista'];
          break;
        default:
          this.types = ['paciente'];
          break;
      }
    } else {
      this.types = ['administrador'];
    }
  }
}
