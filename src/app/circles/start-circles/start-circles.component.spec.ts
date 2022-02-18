import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCirclesComponent } from './start-circles.component';

describe('StartCirclesComponent', () => {
  let component: StartCirclesComponent;
  let fixture: ComponentFixture<StartCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCirclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
