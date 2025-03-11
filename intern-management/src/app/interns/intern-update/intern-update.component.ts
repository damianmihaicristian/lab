import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intern-update',
  templateUrl: './intern-update.component.html',
  styleUrls: ['./intern-update.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class InternUpdateComponent implements OnInit {
  intern: Intern = {
    id: 0,
    name: '',
    age: 0,
    dateOfBirth: new Date()
  };

  constructor(
    private internService: InternService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.internService.getIntern(+id).subscribe({
        next: (intern: Intern) => {
          this.intern = intern;
          if (this.intern.dateOfBirth) {
            this.intern.dateOfBirth = new Date(this.intern.dateOfBirth);
          }
        },
        error: (error) => {
          this.snackBar.open('Error loading intern details', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/intern']);
        }
      });
    }
  }

  updateIntern(): void {
    if (this.intern && this.intern.id) {
      this.internService.updateIntern(this.intern.id, this.intern).subscribe({
        next: () => {
          this.snackBar.open('Intern updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['']);
        },
        error: (error) => {
          this.snackBar.open('Error updating intern', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  
  loadIntern():void{
    this.internService.getIntern(this.intern.id).subscribe({
      next: (intern) => {
        this.intern = intern;
        if (this.intern.dateOfBirth) {
          this.intern.dateOfBirth = new Date(this.intern.dateOfBirth);
        }
      },
      error: (error) => {
        this.snackBar.open('Error loading intern details', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/intern']);
      }
    });
  }
}
