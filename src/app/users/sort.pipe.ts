import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(users: User[], sortBy: 'name' | 'username' | 'email'): User[] {

    if (!users) {
      return [];
    } 

    if (!sortBy) {
      return users;
    }

    return users.sort((usera, userb) => {
        let prop1: string = usera[sortBy].toLowerCase();
        let prop2: string = userb[sortBy].toLowerCase();
        return prop1 < prop2 ? -1 : (prop1 > prop2 ? 1 : 0);
    });
  }

}
