import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarPages } from './pages/navbar/navbar.pages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarPages],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'server';
}
