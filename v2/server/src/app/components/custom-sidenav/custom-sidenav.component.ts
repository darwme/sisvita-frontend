import { Component, computed, Input, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { DeacoderService } from '../../services/deacoder.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  type?: string;
  personaType?: string;
  sidenavCollapsed = signal(false);
  dataDecrypt?: any;
  user?: any;
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }
  @Input({ required: true }) typeOf?: any;
  menuItems = signal<MenuItem[]>([]);

  constructor(private router: Router, private deacoder: DeacoderService) {
    this.onDecrypt();
  }

  ngOnInit() {
    this.onDecrypt();
  }

  onDecrypt() {
    this.dataDecrypt = this.deacoder.decrypt(localStorage.getItem('data'));
    this.type = localStorage.getItem('userType') || undefined;
    this.user = this.dataDecrypt;

    if (!this.type) {
      console.log('No userType found in localStorage');
    } else {
      this.personaType = localStorage.getItem('personaType') || undefined;
      if (!this.personaType) {
        this.router.navigate(['/auth/logout']);
      } else if (this.personaType === 'paciente') {
        this.user = this.user.paciente;
      } else if (this.personaType === 'especialista') {
        this.user = this.user.especialista;
      } else {
        this.user = this.user.administrador;
      }
    }

    console.log('User:', this.user);

    this.getDashboardLink(this.personaType || '');
  }

  getDashboardLink(usertype: string) {
    if (usertype === 'paciente') {
      this.type = 'paciente';
      this.menuItems.set([
        {
          icon: 'account_circle',
          label: 'Profile',
          route: 'paciente/profile',
        },
        {
          icon: 'dashboard',
          label: 'Dashboard',
          route: 'paciente',
        },
        {
          icon: 'alarm',
          label: 'Realizar Test',
          route: 'paciente/realizar-test',
        },
        {
          icon: 'book',
          label:"Visualizar tests",
          route:'paciente/visualizar-test-realizado',
        },
        {
          icon: 'logout',
          label: 'Logout',
          route: '/auth/logout',
        },
      ]);
    } else if (usertype === 'especialista') {
      this.type = 'especialista';
      this.menuItems.set([
        {
          icon: 'account_circle',
          label: 'Profile',
          route: 'especialista/profile',
        },
        {
          icon: 'book',
          label: 'Visualizar Tests',
          route: 'especialista/visualizar-tests-realizados',
        },
        {
          icon: 'appointment',
          label: 'Agendar Cita',
          route: '/especialista/agendar-cita',
        },
        {
          icon: 'communication',
          label: 'Comunicar con Paciente',
          route: '/especialista/comunicar-paciente',
        },
        {
          icon: 'logout',
          label: 'Logout',
          route: '/auth/logout',
        },
      ]);
    } else if (usertype === 'admin') {
      this.type = 'administrador';
      this.menuItems.set([
        {
          icon: 'manage-specialist',
          label: 'Gestionar Especialista',
          route: '/admin/gestionar-especialista',
        },
        {
          icon: 'manage-tests',
          label: 'Gestionar Tests',
          route: '/admin/gestionar-tests',
        },
        {
          icon: 'manage-patients',
          label: 'Gestionar Pacientes',
          route: '/admin/gestionar-pacientes',
        },
        {
          icon: 'settings',
          label: 'Settings',
          route: '/admin/settings',
        },
        {
          icon: 'logout',
          label: 'Logout',
          route: '/auth/logout',
        },
      ]);
    }
  }

  profilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));
}
