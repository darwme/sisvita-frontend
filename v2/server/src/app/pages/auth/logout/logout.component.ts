import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private dataService: DataService, private route: Router) {}

  redirectTologin() {
    this.route.navigate(['/auth/login']);
  }

  cerrarSesion() {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('personaType');
    this.dataService.setData(null);
    this.redirectTologin();
  }
}
