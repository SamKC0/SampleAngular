import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent
}, 
{
  path: 'user/:user',
  component: UserdetailComponent
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
