/*import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarPages {

}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.pages.html',
  styleUrls: ['./navbar.pages.css'],
  imports: [CommonModule] 
})
export class NavbarPages { 
  logoUrl = 'assets/images/logo.png';

  constructor() { }
}
