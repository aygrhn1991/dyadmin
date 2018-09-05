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

import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TypesComponent } from './components/layout/types/types.component';
import { ArticlesComponent } from './components/layout/articles/articles.component';
import { ArticleComponent } from './components/layout/article/article.component';
import { QuestionsComponent } from './components/layout/questions/questions.component';

import { TypecompComponent } from './components/common/typecomp/typecomp.component';
import { DatecompComponent } from './components/common/datecomp/datecomp.component';
import { UsersComponent } from './components/layout/users/users.component';

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    CKEditorModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
