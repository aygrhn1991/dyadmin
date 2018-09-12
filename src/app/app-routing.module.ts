import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TypesComponent } from './components/layout/types/types.component';
import { ArticlesComponent } from './components/layout/articles/articles.component';
import { ArticleComponent } from './components/layout/article/article.component';
import { QuestionsComponent } from './components/layout/questions/questions.component';
import { UsersComponent } from './components/layout/users/users.component';
import { TagsComponent } from './components/layout/tags/tags.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'questions', pathMatch: 'full' },
      { path: 'types', component: TypesComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tags', component: TagsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
