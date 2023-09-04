import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  myUser : User|undefined;
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.userId)
      let response = await this.usersService.getById(id)
      this.myUser = response;
    })
  }

  async deleteUser(id:number|undefined){
    if (id!=undefined)
    {
      let response = await this.usersService.delete(id)
        if (response.id){
          alert("El usuario ha sido ha sido borrado correctamente.")
        } else {
          alert("Ha ocurrido un error intentelo de nuevo más tarde")
        }
    }
  }
}
