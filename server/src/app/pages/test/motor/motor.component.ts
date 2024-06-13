import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ProgressService } from '../../../service/progress/progress.service';

@Component({
  selector: 'app-motor',
  standalone: true,
  imports: [],
  templateUrl: './motor.component.html',
  styleUrl: './motor.component.css',
})
export class MotorComponent {
  constructor(
    private pogressService: ProgressService,
    private router: Router
  ) {}

  testEnd() {
    this.completeIndexTest();
    this.router.navigateByUrl('/test/end');
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('motor');
  }
