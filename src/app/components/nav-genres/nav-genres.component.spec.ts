import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavGenresComponent } from './nav-genres.component';

describe('NavGenresComponent', () => {
  let component: NavGenresComponent;
  let fixture: ComponentFixture<NavGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavGenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
