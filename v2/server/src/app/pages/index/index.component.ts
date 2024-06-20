import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './secciones/hero/hero.component';
import { ServiciosComponent } from './secciones/servicios/servicios.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, ServiciosComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {}
