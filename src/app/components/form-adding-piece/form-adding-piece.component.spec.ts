import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddingPieceComponent } from './form-adding-piece.component';

describe('FormAddingPieceComponent', () => {
  let component: FormAddingPieceComponent;
  let fixture: ComponentFixture<FormAddingPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddingPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddingPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
