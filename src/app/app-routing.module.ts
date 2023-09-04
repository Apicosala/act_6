import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {path:'', pathMatch:"full", redirectTo: 'users'},
  { path:'users', component: UserListComponent},
  { path:'users/:userId', component:UserDetailComponent},
  { path:'update/:userId', component: UserFormComponent},
  { path:"create", component:UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
