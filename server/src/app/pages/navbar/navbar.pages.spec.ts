import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPages } from './navbar.pages';

describe('NavbarSimpleComponent', () => {
  let component: NavbarPages;
  let fixture: ComponentFixture<NavbarPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPages]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
