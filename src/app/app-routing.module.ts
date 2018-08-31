import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuestionsComponent } from './components/layout/questions/questions.component';
import { ArticlesComponent } from './components/layout/articles/articles.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'questions', pathMatch: 'full' },
      { path: 'questions', component: QuestionsComponent },
      { path: 'articles', component: ArticlesComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
