import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';

@Component({
  selector: 'app-intern-list',
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class InternListComponent implements OnInit {
  interns: Intern[] = [];
  displayedColumns: string[] = ['name', 'age', 'dateOfBirth', 'actions'];
  loading = false;

  constructor(
    private internService: InternService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInterns();
  }

  loadInterns(): void {
    this.loading = true;
    this.internService.getInterns().subscribe({
      next: (interns) => {
        this.interns = interns;
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
}