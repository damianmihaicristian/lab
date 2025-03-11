import { RouterModule, Routes } from '@angular/router';
import { InternListComponent } from './interns/intern-list/intern-list.component';
import { InternAddComponent } from './interns/intern-add/intern-add.component';
import { InternUpdateComponent } from './interns/intern-update/intern-update.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: InternListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: InternAddComponent },
  { path: 'update/:id', component: InternUpdateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
