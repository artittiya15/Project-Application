import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- NgModel lives here
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosComponent, TodoEditDialog } from './todos/todos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MovieShopComponent } from './movie-shop/movie-shop.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MovieManageComponent,
  MovieSetPriceDialog,
} from './movie-manage/movie-manage.component';
import { MatDrawer } from '@angular/material/sidenav';

const appRoutes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todolist', component: TodosComponent },
  { path: 'movie-manage', component: MovieManageComponent },
  { path: 'movie-shop', component: MovieShopComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoEditDialog,
    MovieShopComponent,
    MovieManageComponent,
    MovieSetPriceDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    MatDrawer
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
