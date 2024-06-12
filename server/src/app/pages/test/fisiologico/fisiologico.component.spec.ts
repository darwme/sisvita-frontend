import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisiologicoComponent } from './fisiologico.component';

describe('FisiologicoComponent', () => {
  let component: FisiologicoComponent;
  let fixture: ComponentFixture<FisiologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FisiologicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FisiologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
