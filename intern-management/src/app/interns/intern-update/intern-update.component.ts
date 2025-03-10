import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-intern-update',
  templateUrl: './intern-update.component.html',
  styleUrls: ['./intern-update.component.css'],
  imports: [MatFormField, MatLabel, RouterModule, MatDatepickerModule]
})
export class InternUpdateComponent implements OnInit {
  intern?: Intern = {} as Intern;

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
          this.router.navigate(['/interns']);
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
          this.router.navigate(['/interns']);
        },
        error: (error) => {
          this.snackBar.open('Error updating intern', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}