import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnaffectedTaskComponent } from './unaffected-task.component';

describe('UnaffectedTaskComponent', () => {
  let component: UnaffectedTaskComponent;
  let fixture: ComponentFixture<UnaffectedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnaffectedTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnaffectedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
