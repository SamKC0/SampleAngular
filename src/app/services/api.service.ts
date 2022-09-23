import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/Project';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }



  getProjectsList(): Observable<Project[]>{

    return this.http.get<Project[]>(`${environment.API_URL}/api/projectsList`);

  }

  getProjectTasks(name: string): Observable<Project[]>{
    return this.http.get(`${environment.API_URL}/api/projects?name=` + name)
      .pipe(
        map(response => response as Project[])
      )
  }

  getProjectsByUser(user: string): Observable<Project[]>{
    return this.http.get(`${environment.API_URL}/api/user?user=` + user)
      .pipe(
        map(response => response as Project[])
      )
  }

}
