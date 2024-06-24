import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTestsComponent } from './gestionar-tests.component';

describe('GestionarTestsComponent', () => {
  let component: GestionarTestsComponent;
  let fixture: ComponentFixture<GestionarTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
