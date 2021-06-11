import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SearchPipe } from './search.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './sort.pipe';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    SearchPipe,
    SortPipe
  ], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
