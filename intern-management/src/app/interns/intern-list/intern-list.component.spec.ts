import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InternListComponent } from './intern-list.component';
import { InternService } from '../intern.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Intern } from '../intern.model';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InternListComponent', () => {
  let component: InternListComponent;
  let fixture: ComponentFixture<InternListComponent>;
  let internService: jasmine.SpyObj<InternService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let loader: HarnessLoader;

  const mockInterns: Intern[] = [
    { id: 1, name: 'John Doe', age: 20, dateOfBirth: new Date('2003-01-01') },
    { id: 2, name: 'Jane Smith', age: 21, dateOfBirth: new Date('2002-06-15') }
  ];

  beforeEach(async () => {
    const internServiceSpy = jasmine.createSpyObj('InternService', ['getInterns', 'deleteIntern', 'updateIntern']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        InternListComponent,
        NoopAnimationsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: InternService, useValue: internServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    internService = TestBed.inject(InternService) as jasmine.SpyObj<InternService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    
    internService.getInterns.and.returnValue(of(mockInterns));
    
    fixture = TestBed.createComponent(InternListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load interns on init', fakeAsync(() => {
    tick();
    expect(internService.getInterns).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockInterns);
  }));

  it('should show error snackbar when loading fails', fakeAsync(() => {
    internService.getInterns.and.returnValue(throwError(() => new Error('Network error')));
    component.loadInterns();
    tick();
    
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error loading interns',
      'Close',
      { duration: 3000 }
    );
    expect(component.loading).toBeFalse();
  }));

  it('should delete intern and refresh list', fakeAsync(() => {
    internService.deleteIntern.and.returnValue(of(void 0));
    internService.getInterns.and.returnValue(of([mockInterns[1]]));
    
    component.deleteIntern(1);
    tick();

    expect(internService.deleteIntern).toHaveBeenCalledWith(1);
    expect(internService.getInterns).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual([mockInterns[1]]);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Intern deleted successfully',
      'Close',
      { duration: 3000 }
    );
  }));

  it('should update intern and refresh list', fakeAsync(() => {
    const updatedIntern: Intern = { 
      id: 1, 
      name: 'Updated Name', 
      age: 22, 
      dateOfBirth: new Date('2003-01-01') 
    };
    internService.updateIntern.and.returnValue(of(updatedIntern));
    internService.getInterns.and.returnValue(of([updatedIntern, mockInterns[1]]));
    
    component.updateIntern(1, updatedIntern);
    tick();

    expect(internService.updateIntern).toHaveBeenCalledWith(1, updatedIntern);
    expect(internService.getInterns).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Intern updated successfully',
      'Close',
      { duration: 3000 }
    );
  }));

  it('should display error snackbar when update intern fails', fakeAsync(() => {
    const error = new Error('Update failed');
    internService.updateIntern.and.returnValue(throwError(() => error));
    
    component.updateIntern(1, mockInterns[0]);
    tick();
    
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error updating intern: Update failed',
      'Close',
      { duration: 3000 }
    );
    expect(component.loading).toBeTrue();
  }));

  it('should change date format', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    
    const newFormat = 'M/d/yy';
    component.selectedDateFormat = newFormat;
    fixture.detectChanges();
    
    expect(component.selectedDateFormat).toBe(newFormat);
  });

  it('should sort interns by name', () => {
    component.sortByName();
    const sortedNames = component.dataSource.data.map(intern => intern.name);
    expect(sortedNames).toEqual(['Jane Smith', 'John Doe']);
  });

  it('should display table with correct columns and data', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();
    const headerCells = await headerRows[0].getCells();
    
    expect(headerRows.length).toBe(1);
    expect(rows.length).toBe(mockInterns.length);
    expect(headerCells.length).toBe(4);
    
    const headerText = await Promise.all(headerCells.map(cell => cell.getText()));
    expect(headerText).toEqual(['Name', 'Age', 'Date of Birth', 'Actions']);
  });

  it('should show and hide loading indicator', () => {
    // Test showing loader
    component.loading = true;
    fixture.detectChanges();
    let progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeTruthy();

    // Test hiding loader
    component.loading = false;
    fixture.detectChanges();
    progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeFalsy();
  });
});