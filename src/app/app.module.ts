import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { CKEditorModule } from 'ng2-ckeditor';
import { NgxEchartsModule } from 'ngx-echarts';

import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TypesComponent } from './components/layout/types/types.component';
import { ArticlesComponent } from './components/layout/articles/articles.component';
import { ArticleComponent } from './components/layout/article/article.component';
import { QuestionsComponent } from './components/layout/questions/questions.component';
import { TypecompComponent } from './components/common/typecomp/typecomp.component';
import { DatecompComponent } from './components/common/datecomp/datecomp.component';
import { UsersComponent } from './components/layout/users/users.component';
import { TagsComponent } from './components/layout/tags/tags.component';
import { PasswordComponent } from './components/layout/password/password.component';
import { TipsComponent } from './components/layout/tips/tips.component';
import { StatisticsComponent } from './components/layout/statistics/statistics.component';
import { DaterangecompComponent } from './components/common/daterangecomp/daterangecomp.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    TypesComponent,
    ArticlesComponent,
    ArticleComponent,
    TypecompComponent,
    DatecompComponent,
    QuestionsComponent,
    UsersComponent,
    TagsComponent,
    PasswordComponent,
    TipsComponent,
    StatisticsComponent,
    DaterangecompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    CKEditorModule,
    NgxEchartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
