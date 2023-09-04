import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl:string ="https://peticiones.online/api/users"
  constructor(private httpClient:HttpClient) { }

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}`))
  }

  getById(id:number): any{
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl+"/"+id))
  }

  create(newUser:User){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, newUser, httpOptions ))
  }

  update(updatedUser:User){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return lastValueFrom(this.httpClient.put<User>(this.baseUrl+'/'+updatedUser.id, updatedUser, httpOptions ))
  }
  delete(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    }
    return lastValueFrom(this.httpClient.delete<User>(this.baseUrl+'/'+id, httpOptions ))
  }


}
