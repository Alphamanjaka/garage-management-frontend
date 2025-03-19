import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeManagementComponent } from './employe-management.component';

describe('EmployeManagementComponent', () => {
  let component: EmployeManagementComponent;
  let fixture: ComponentFixture<EmployeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
