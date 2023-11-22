import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookhallPage } from './bookhall.page';

const routes: Routes = [
  {
    path: '',
    component: BookhallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookhallPageRoutingModule {}
