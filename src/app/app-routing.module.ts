import { CityComponent } from './city/city.component';
import { DepartmentComponent } from './department/department.component';
import { RegionComponent } from './region/region.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegionComponent },
  { path: 'regions/:code/departements', component: DepartmentComponent },
  { path: 'departements/:code/communes', component: CityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
