import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RouteguardService } from './services/routeguard.service';
import { LayoutComponent } from './components/layout/layout.component';
import { TypesComponent } from './components/layout/types/types.component';
import { ArticlesComponent } from './components/layout/articles/articles.component';
import { ArticleComponent } from './components/layout/article/article.component';
import { QuestionsComponent } from './components/layout/questions/questions.component';
import { UsersComponent } from './components/layout/users/users.component';
import { TagsComponent } from './components/layout/tags/tags.component';
import { PasswordComponent } from './components/layout/password/password.component';
import { TipsComponent } from './components/layout/tips/tips.component';
import { StatisticsComponent } from './components/layout/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'questions', pathMatch: 'full' },
      { path: 'types', component: TypesComponent, canActivate: [RouteguardService] },
      { path: 'articles', component: ArticlesComponent, canActivate: [RouteguardService] },
      { path: 'article/:id', component: ArticleComponent, canActivate: [RouteguardService] },
      { path: 'questions', component: QuestionsComponent, canActivate: [RouteguardService] },
      { path: 'users', component: UsersComponent, canActivate: [RouteguardService] },
      { path: 'tags', component: TagsComponent, canActivate: [RouteguardService] },
      { path: 'password', component: PasswordComponent, canActivate: [RouteguardService] },
      { path: 'tips', component: TipsComponent, canActivate: [RouteguardService] },
      { path: 'statistics', component: StatisticsComponent, canActivate: [RouteguardService] }
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
