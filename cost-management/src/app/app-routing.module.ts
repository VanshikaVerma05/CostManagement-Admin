import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneraladminsectionComponent } from './components/generaladminsection/generaladminsection.component';
import { UserAccessComponent } from './components/user-access/user-access.component';

const routes: Routes = [
  { path: '',            component: GeneraladminsectionComponent },
  { path: 'user-access', component: UserAccessComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
