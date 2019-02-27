import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './modules/users/pages/list-users/list-users.component';
import { ListAlbumsComponent } from './modules/users/pages/list-albums/list-albums.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: ListUsersComponent,
    pathMatch: 'full'
  },
  {
    path: 'albums/:id',
    component: ListAlbumsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
