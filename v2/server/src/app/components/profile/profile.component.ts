import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeacoderService } from '../../services/deacoder.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  type?: string;
  personaType?: string;
  dataDecrypt?: any;
  user?: any;

  constructor(private router: Router, private deacoder: DeacoderService) {
    this.onDecrypt();
  }

  ngOnInit() {
    this.onDecrypt();
  }

  onDecrypt() {
    const encryptedData = localStorage.getItem('data');
    if (encryptedData) {
      this.dataDecrypt = this.deacoder.decrypt(encryptedData);
    }

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
