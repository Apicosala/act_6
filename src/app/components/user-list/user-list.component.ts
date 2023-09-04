import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers !: User[];
  total_pages!: number;
  currentPage!:number;

  constructor(private usersService: UsersService) { }
  async ngOnInit(): Promise<void> {
    try{
      let response = await this.usersService.getAll();
      this.total_pages = response.total_pages
      this.arrUsers = response.data;
    } catch(err){
      console.error(err)
    }
  }

  async gotoPage(page:number = 1){
    try {
      let response = await this.usersService.getAll(page)
      this.currentPage = response.page;
      this.arrUsers = response.data;
      this.total_pages = response.total_pages;
    } catch (err) {
      console.log(err)
    }

  }

}
