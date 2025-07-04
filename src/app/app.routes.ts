import { Routes } from '@angular/router';
import { AgregarComicComponent } from './pages/agregar-comic/agregar-comic.component';
import { EditarComicComponent } from './pages/editar-comic/editar-comic.component';
import { ListarComicComponent } from './pages/listar-comic/listar-comic.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-comic'
  },
  {
    path: 'agregar-comic',
    component: AgregarComicComponent
  },
  {
    path: 'editar-comic/:id',
    component: EditarComicComponent
  },
  {
    path: 'listar-comic',
    component: ListarComicComponent
  },
  {
    path: '**',
    redirectTo: 'listar-comic'
  }
];
