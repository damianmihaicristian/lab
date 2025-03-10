import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternUpdateComponent } from './intern-update.component';

describe('InternUpdateComponent', () => {
  let component: InternUpdateComponent;
  let fixture: ComponentFixture<InternUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
