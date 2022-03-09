import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonaComponent } from './new-persona.component';

describe('NewPersonaComponent', () => {
  let component: NewPersonaComponent;
  let fixture: ComponentFixture<NewPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
