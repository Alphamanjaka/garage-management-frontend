import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEmployeComponent } from './template-employe.component';

describe('TemplateEmployeComponent', () => {
  let component: TemplateEmployeComponent;
  let fixture: ComponentFixture<TemplateEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
