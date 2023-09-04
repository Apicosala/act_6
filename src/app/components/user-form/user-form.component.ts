import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  operation:string = "Guardar";
  userForm:FormGroup;

  constructor(private usersService:UsersService,
    private activatedRoute:ActivatedRoute) {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z ]+$/)
      ]),
      username:new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      image: new FormControl('', []),
    }, [])
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params:any)=>{

      if (params.userId !== undefined){
        let userid:number = parseInt(params.userId)
        this.operation = "Actualizar"
        let user = await this.usersService.getById(userid);
        this.userForm = new FormGroup({
          email: new FormControl(user.email, [
            Validators.required,
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
          ]),
          first_name: new FormControl(user.first_name, [Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[A-Za-z]+$/)
          ]),
          last_name: new FormControl(user.last_name, [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[A-Za-z ]+$/)
          ]),
          username:new FormControl(user.username, [
            Validators.required,
            Validators.minLength(3)
          ]),
          image: new FormControl(user.image, []),
        }, [])
      }
    })
  }

  async getDataForm() {
    if(this.userForm.status==="VALID"){
      this.activatedRoute.params.subscribe(async (params:any)=>{
        let newUser = this.userForm.value;
        let response!: User
        console.log(this.userForm)
        if (params.userId !== undefined){
          newUser.id = parseInt(params.userId)
          response = await this.usersService.update(newUser)
          if (response.id){
            alert("El usuario ha sido actualizado correctamente.")
          } else {
            alert("Ha ocurrido un error intentelo de nuevo más tarde")
          }
        } else {
          response = await this.usersService.create(newUser)
          if (response.id){
            alert("El usuario ha sido creado correctamente.")
          } else {
            alert("Ha ocurrido un error intentelo de nuevo más tarde")
          }
        }
      })
    }
  }

  checkControl(controlName: string, Error: string): boolean{
    let noErrors = false;
    if (this.userForm.get(controlName)?.hasError(Error) && this.userForm.get(controlName)?.touched) {
      noErrors = true;
    }
    return noErrors;
  }

  checkValidControl(controlName: string): boolean{
    let valid = true
    if (this.userForm.get(controlName)?.status==="INVALID" && this.userForm.get(controlName)?.touched){
      valid = false
    }
    return valid;
  }

}
