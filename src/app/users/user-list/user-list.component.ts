import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

/**
 * @author Ayaz Lakdawala
 * @description Component class to display users list.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private _finalUserListSub = new Subject<User[]>();

  private _searchSub = new BehaviorSubject<string>('');

  private _sortBySub = new BehaviorSubject<'name' | 'username' | 'email'>('name');

  private _destroy$ = new Subject<boolean>();

  finalUserList$: Observable<User[]> = this._finalUserListSub.asObservable();

  searchInput = new FormControl();

  sortBy = new FormControl('name');

  users$: Observable<User[]> = this.service.getUsers();

  constructor(private service: UserService) { }

  ngOnInit(): void {

    combineLatest([this.users$, this._searchSub, this._sortBySub]).pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      ([users, searchString, sortBy]) => {

        let finalUserList = users || [];

        //filter users
        if (searchString) {
          finalUserList = this._filterUsers(finalUserList, searchString);
        }

        // sort users
        if (sortBy) {
          finalUserList = this._sortUsers(finalUserList, sortBy);
        }

        this._finalUserListSub.next(finalUserList);
        
      }
    );
    
    // search input on change
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      (searchString) => this._searchSub.next(searchString)
    )

    // sort by on change
    this.sortBy.valueChanges.subscribe(
      (sortBy) => this._sortBySub.next(sortBy)
    )

  }

  /**
   * Function to sort users
   * 
   * @param users user array to sort
   * @param sortBy sort by parameter
   * @returns sorted user array
   */
  private _sortUsers(users: User[], sortBy: 'name' | 'username' | 'email'): User[] {
    return users.sort((usera: User, userb: User) => {
      let prop1: string = usera[sortBy].toLowerCase();
      let prop2: string = userb[sortBy].toLowerCase();
      return prop1 < prop2 ? -1 : (prop1 > prop2 ? 1 : 0);
    });
  }

  private _filterUsers(users: User[], searchString: string) {

    searchString = searchString?.toLowerCase();

    return users.filter(user => {
      return (user.name.toLowerCase().indexOf(searchString) > -1 || user.username.toLowerCase().indexOf(searchString) > -1 || user.email.toLowerCase().indexOf(searchString) > -1);
    });
  }



}
