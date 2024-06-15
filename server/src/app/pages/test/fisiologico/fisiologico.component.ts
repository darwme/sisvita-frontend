import { Component } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { DataService } from '../../../service/data/data.service';
import { MotorComponent } from '../motor/motor.component';
@Component({
  selector: 'app-fisiologico',
  standalone: true,
  imports: [MotorComponent, HeaderComponent, FooterComponent],
  templateUrl: './fisiologico.component.html',
  styleUrl: './fisiologico.component.css',
})
export class FisiologicoComponent {
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

  testMotor() {
    this.getData(this.data);
    this.completeIndexTest();
    this.router.navigateByUrl(`${this.data.codigo_estudiante}/test/motor`);
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('fisiologico');
  }
}
