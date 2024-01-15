import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostelPage } from './hostel.page';

const routes: Routes = [
  {
    path: '',
    component: HostelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostelPageRoutingModule {}
