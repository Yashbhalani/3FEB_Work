import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegistrationComponent } from './model-registration.component';

describe('ModelRegistrationComponent', () => {
  let component: ModelRegistrationComponent;
  let fixture: ComponentFixture<ModelRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
