import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ShowComponent } from './show/show.component';
import { MoviesComponent } from './movies/movies.component';
import { NewPopularComponent } from './new-popular/new-popular.component';
import { MyListComponent } from './my-list/my-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':id/show',
    component: ShowComponent,
  },
  {
    path: ':id/movies',
    component: MoviesComponent,
  },
  {
    path: ':id/new-popular',
    component: NewPopularComponent,
  },
  {
    path: ':id/my-list',
    component: MyListComponent,
  },
  {
    path: '',
    redirectTo: ':id/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
