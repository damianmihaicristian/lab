import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { InternAddComponent } from './intern-add.component';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NameValidatorDirective } from '../../shared/validators/name.validator';

describe('InternAddComponent', () => {
  let component: InternAddComponent;
  let fixture: ComponentFixture<InternAddComponent>;
  let internService: jasmine.SpyObj<InternService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const internServiceSpy = jasmine.createSpyObj('InternService', ['addIntern']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: {} } });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatCardModule,
        MatIconModule,
        MatNativeDateModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        InternAddComponent
      ],
      providers: [
        { provide: InternService, useValue: internServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InternAddComponent);
    component = fixture.componentInstance;
    internService = TestBed.inject(InternService) as jasmine.SpyObj<InternService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add intern successfully', () => {
    const intern: Intern = 
    { 
      id: 1, 
      name: 'John Doe',
      age: 20,
      dateOfBirth: new Date('2000-01-01') 
    };
    component.intern = intern;

    internService.addIntern.and.returnValue(of(intern));
    router.navigate.and.stub();
    snackBar.open.and.stub();

    component.addIntern();

    expect(internService.addIntern).toHaveBeenCalledWith(intern);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should handle error when adding intern', () => {
    const intern: Intern = 
    { 
      id: 2, 
      name: 'Joh1n Doe',
      age: 20,
      dateOfBirth: new Date('2000-01-01') 
    };
    component.intern = intern;

    internService.addIntern.and.returnValue(throwError(() => new Error('Error')));
    snackBar.open.and.stub();

    component.addIntern();

    expect(internService.addIntern).toHaveBeenCalledWith(intern);
  });
});
