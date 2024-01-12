import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HallrecordPage } from './hallrecord.page';

const routes: Routes = [
  {
    path: '',
    component: HallrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HallrecordPageRoutingModule {}
