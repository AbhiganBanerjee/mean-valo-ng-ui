import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RegisterAck from '../contracts/RegisterAck';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  //Inject the HttpClient 
  constructor(private http:HttpClient) { }

  //Add a method to load Agents based on url
  GetAgents(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  //Add a method to load AgentTypes
  GetAgentsTypes(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  //Add a method to load the Maps based on path 
  LoadMaps(url:string):Observable<any>{
    return this.http.get<any>(url);
  }

  //Add a method to get all the countries
  GetAllCountries(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  //Add a method to get all the Users
  GetAllUsers(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  //Add a POST mode method to accecpt JSON data to be inserted in DB
  //This will return a RegisterAck contract object with a Code field
  RegUser(url:string, obj:any):Observable<RegisterAck>{
    return this.http.post<RegisterAck>(url,obj);
  }

  //Create a GET Mode request method to get all Arsenal
  GetAllArsenal(url:string):Observable<any[]>{
    return this.http.get<any[]>(url);
  }
}
