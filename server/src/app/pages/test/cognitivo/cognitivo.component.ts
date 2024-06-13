import { Component } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cognitivo',
  standalone: true,
  imports: [],
  templateUrl: './cognitivo.component.html',
  styleUrl: './cognitivo.component.css',
})
export class CognitivoComponent {
  constructor(
    private pogressService: ProgressService,
    private router: Router
  ) {}

  testFisiologico() {
    this.completeIndexTest();
    this.router.navigateByUrl('/test/fisiologico');
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('cognitivo');
  }
}
