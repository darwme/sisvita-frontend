import { Component } from '@angular/core';
import { EndComponent } from '../end/end.component';
import { Router } from '@angular/router';
import { ProgressService } from '../../../service/progress/progress.service';
import { DataService } from '../../../service/data/data.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-motor',
  standalone: true,
  imports: [EndComponent, HeaderComponent, FooterComponent],
  templateUrl: './motor.component.html',
  styleUrl: './motor.component.css',
})
export class MotorComponent {
  data: any = {};
  constructor(
    private pogressService: ProgressService,
    private router: Router,
    private dataService: DataService
  ) {
    this.data = this.dataService.datoEstudiante$;
  }

  getData(data: any) {
    this.dataService.setData(data);
    console.log(data);
  }

  ngOnInit(): void {
    this.data.subscribe((data: any) => {
      this.data = data;
    });
  }

  testEnd() {
    this.getData(this.data);
    this.completeIndexTest();
    this.router.navigateByUrl(`${this.data.codigo_estudiante}/test/end`);
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('motor');
  }
}
