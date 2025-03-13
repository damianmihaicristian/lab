import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InternUpdateComponent } from './intern-update.component';
import { InternService } from '../intern.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Intern } from '../intern.model';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('InternUpdateComponent', () => {
  let component: InternUpdateComponent;
  let fixture: ComponentFixture<InternUpdateComponent>;
  let internService: jasmine.SpyObj<InternService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const internServiceSpy = jasmine.createSpyObj('InternService', ['getIntern', 'updateIntern']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        InternUpdateComponent,
        RouterTestingModule,
        NoopAnimationsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatNativeDateModule,
        FormsModule
      ],
      providers: [
        { provide: InternService, useValue: internServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InternUpdateComponent);
    component = fixture.componentInstance;
    internService = TestBed.inject(InternService) as jasmine.SpyObj<InternService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);

    const mockIntern = {
      id: 1,
      name: 'John Doe',
      age: 25,
      dateOfBirth: new Date('2000-01-01')
    };
    internService.getIntern.and.returnValue(of(mockIntern));
    internService.updateIntern.and.returnValue(of(mockIntern));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load intern details on init', fakeAsync(() => {
    const intern: Intern = { id: 1, name: 'John Doe', age: 25, dateOfBirth: new Date('2000-01-01') };
    internService.getIntern.and.returnValue(of(intern));

    component.ngOnInit();
    tick();

    expect(internService.getIntern).toHaveBeenCalledWith(1);
    expect(component.intern).toEqual(intern);
  }));

  it('should handle error when loading intern details', fakeAsync(() => {
    internService.getIntern.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();
    tick();

    expect(snackBar.open).toHaveBeenCalledWith('Error loading intern details', 'Close', { duration: 3000 });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  it('should update intern details', fakeAsync(() => {
    const intern: Intern = { id: 1, name: 'John Doe', age: 25, dateOfBirth: new Date('2000-01-01') };
    component.intern = intern;
    internService.updateIntern.and.returnValue(of(intern));

    component.updateIntern();
    tick();

    expect(internService.updateIntern).toHaveBeenCalledWith(1, intern);
    expect(snackBar.open).toHaveBeenCalledWith('Intern updated successfully', 'Close', { duration: 3000 });
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  it('should handle error when updating intern details', () => {
    const intern: Intern = { id: 1, name: 'John Doe', age: 25, dateOfBirth: new Date('2000-01-01') };
    component.intern = intern;
    internService.updateIntern.and.returnValue(throwError('Error'));

    component.updateIntern();

    expect(snackBar.open).toHaveBeenCalledWith('Error updating intern', 'Close', { duration: 3000 });
  });
});
