import { Component } from '@angular/core';
import { ProgressService } from '../../../service/progress/progress.service';
import { Router } from '@angular/router';
import { FisiologicoComponent } from '../fisiologico/fisiologico.component';
import { DataService } from '../../../service/data/data.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
@Component({
  selector: 'app-cognitivo',
  standalone: true,
  imports: [FisiologicoComponent, HeaderComponent, FooterComponent],
  templateUrl: './cognitivo.component.html',
  styleUrl: './cognitivo.component.css',
})
export class CognitivoComponent {
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

  testFisiologico() {
    this.getData(this.data);
    this.completeIndexTest();
    this.router.navigateByUrl(
      `${this.data.codigo_estudiante}/test/fisiologico`
    );
  }

  completeIndexTest() {
    this.pogressService.markPartAsCompleted('cognitivo');
  }
}
