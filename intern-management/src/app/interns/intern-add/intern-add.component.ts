import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InternService } from '../intern.service';
import { Intern } from '../intern.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ]
})
export class InternAddComponent {
  intern: Intern = new Intern();

  constructor(
    private internService: InternService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  addIntern(): void {
    this.internService.addIntern(this.intern).subscribe({
      next: () => {
        this.snackBar.open('Intern added successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/interns']);
      },
      error: (error) => {
        this.snackBar.open('Error adding intern', 'Close', { duration: 3000 });
      }
    });
  }
}