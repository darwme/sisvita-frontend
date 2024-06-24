import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from '../../../../components/nav/nav.component';
import { LogoComponent } from '../../../../components/logo/logo.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NavComponent,
    LogoComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
