import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardPage } from './dash-board.page';

const routes: Routes = [
  {
    path: '',
    component: DashBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardPageRoutingModule {}
