import { Component } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fisiologico',
  standalone: true,
  imports: [],
  templateUrl: './fisiologico.component.html',
  styleUrl: './fisiologico.component.css',
})
export class FisiologicoComponent {
  constructor(
    private pogressService: ProgressService,
    private router: Router
  ) {}

  testMotor() {
    this.completeIndexTest();
    this.router.navigateByUrl('/test/motor');
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('fisiologico');
  }
}
