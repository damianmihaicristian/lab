import { Routes } from '@angular/router';
import { InternListComponent } from './interns/intern-list/intern-list.component';
import { InternAddComponent } from './interns/intern-add/intern-add.component';
import { InternUpdateComponent } from './interns/intern-update/intern-update.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'intern', component: InternListComponent },
  { path: 'Intern/add', component: InternAddComponent },
  { path: 'Intern/update/:id', component: InternUpdateComponent },
  { path: '**', redirectTo: 'Interns' }
];
