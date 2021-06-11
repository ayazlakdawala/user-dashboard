import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchTerm: string = '';

  searchInput = new FormControl();

  sortBy = new FormControl('name');

  users$: Observable<User[]> = this.service.getUsers();

  constructor(private service: UserService) { }

  ngOnInit(): void {
    
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      searchTerm => this.searchTerm = searchTerm
    )
  }

}
