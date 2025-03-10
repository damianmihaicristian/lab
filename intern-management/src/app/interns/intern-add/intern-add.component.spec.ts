import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternAddComponent } from './intern-add.component';

describe('InternAddComponent', () => {
  let component: InternAddComponent;
  let fixture: ComponentFixture<InternAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
