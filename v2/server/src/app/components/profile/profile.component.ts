import { Component, computed, Input, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { DeacoderService } from '../../services/deacoder.service';

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
  type?: string;
  personaType?: string;
  sidenavCollapsed = signal(false);
  dataDecrypt?: any;
  user?: any;
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value);
  }

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

  }
}