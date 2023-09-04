import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() myUser!: User
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }
  async deleteUser(id: number){
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
