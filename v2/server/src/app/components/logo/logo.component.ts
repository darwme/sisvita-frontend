import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  public logo = '../../assets/logo.png';
  public alt = 'Logo';

  getLogo() {
    console.log(this.logo);
    return this.logo;
  }
}
