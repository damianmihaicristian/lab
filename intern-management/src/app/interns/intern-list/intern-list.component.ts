import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSortModule,
    MatOption,
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatTooltipModule,
  ]
})
export class InternListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Intern>([]);
  displayedColumns: string[] = ['name', 'age', 'dateOfBirth', 'actions'];
  loading = false;

  dateFormats = [
    { value: 'EEEE, MMMM d, y', display: 'Monday, June 15, 2015' },
    { value: 'MMM d, y', display: 'Jun 15, 2015' },
    { value: 'M/d/yy', display: '6/15/15' }
  ];
  selectedDateFormat = this.dateFormats[0].value;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private internService: InternService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInterns();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Intern, property: string) => {
      switch(property) {
        case 'dateOfBirth': return item.dateOfBirth ? new Date(item.dateOfBirth).getTime() : 0;
        default: return (item as any)[property];
      }
    };
  }

  loadInterns(): void {
    this.loading = true;
    this.internService.getInterns().subscribe({
      next: (interns) => {
        this.dataSource.data = interns;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading interns', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  deleteIntern(id: number): void {
    this.internService.deleteIntern(id).subscribe(() => {
      this.loadInterns();
      this.snackBar.open('Intern deleted successfully', 'Close', {
        duration: 3000
      });
    });
  }

  updateIntern(id: number, newIntern: Intern): void {
    this.loading = true;
    this.internService.updateIntern(id, newIntern).subscribe({
      next: () => {
        this.loadInterns();
        this.snackBar.open('Intern updated successfully', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Error updating intern: ' + error.message, 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}