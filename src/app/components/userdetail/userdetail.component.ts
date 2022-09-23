import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/model/Task';
import { Project } from 'src/app/model/Project';
import { ProjectList } from 'src/app/model/ProjectList';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  user? : string;
  projects? : Project[];
  projectLists: ProjectList[] = [];

  ngOnInit(): void {
    this.routeListener();
  }

  routeListener(){
    this.route.paramMap.subscribe(params => {
      this.user = params.get('user')!;
      this.getProjectsByUser(this.user!);
    })
  }

  getProjectsByUser(user: string) {
    
    this.apiService.getProjectsByUser(user).subscribe({
      next: (val: any) => { 
        if (val){
          this.projects = val;
          this.createProjectLists();
       }
       else {
        alert("Error: 404 No content")
       }
       },
      error: (err: HttpErrorResponse) => { console.log("failed"); },
      complete: () => {}     
  });
  }

  createProjectLists(){

  for (var p of this.projects!) {

    var hours = 0;
    var members: string[] = [];
    for (var t of p.task){
      hours =+ t.task_hours;
      for (var m of t.member){
        members.push(m.member_name);
      }
    }

    var mNames = '';
    let removeDuplicates = [...new Set(members)];
    for (var s of removeDuplicates){
      mNames = mNames + s + ' ';
    }

    var proj : ProjectList = {
      project_name: p.project_name,
      member: mNames,
      estimated_hours: hours
    };

    this.projectLists?.push(proj);
    
  }
  }

}
