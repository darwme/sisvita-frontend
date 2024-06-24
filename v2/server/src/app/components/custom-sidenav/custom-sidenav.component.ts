import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';

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
  sidenavCollapsed = signal(false);
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }
  @Input({ required: true }) typeOf?: any;

  menuItems = signal<MenuItem[]>([]);

  ngOnInit() {
    this.getDashboardLink(this.typeOf?.persona?.tipo_persona || '');
  }

  getDashboardLink(usertype: string) {
    if (usertype === 'paciente') {
      this.type = 'paciente';
      this.menuItems.set([
        {
          icon: 'profile',
          label: 'Profile',
          route: 'paciente/profile',
        },
        {
          icon: 'dashboard',
          label: 'Dashboard',
          route: 'paciente',
        },
        {
          icon: 'logout',
          label: 'Logout',
          route: '/auth/logout',
        },
        {
          icon: 'test',
          label: 'Realizar Test',
          route: 'paciente/realizar-test',
        },
        {
          icon: 'appointment',
          label: 'Visualizar Cita',
          route: 'paciente/visualizar-cita',
        },
      ]);
    } else if (usertype === 'especialista') {
      this.type = 'especialista';
      this.menuItems.set([
        {
          icon: 'test',
          label: 'Visualizar Tests',
          route: 'dashboard/especialista/visualizar-tests',
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
