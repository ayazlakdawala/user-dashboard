import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], searchTerm: string): User[] {

    if (!users) {
      return [];
    } 

    if (!searchTerm) {
      return users;
    }  

    searchTerm = searchTerm?.toLowerCase();

    return users.filter(user => {
      return (user.name.toLowerCase().indexOf(searchTerm) > -1 || user.username.toLowerCase().indexOf(searchTerm) > -1 || user.email.toLowerCase().indexOf(searchTerm) > -1);
    });
  }

}
