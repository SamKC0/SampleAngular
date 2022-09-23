import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/Project';
import { Task } from 'src/app/model/Task';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  projects? : Project[];
  selectedProject? : Project;
  
  ngOnInit(): void {
    this.getProjectsList();
  }

  
  // get all projects
  getProjectsList() {
      this.apiService.getProjectsList().subscribe({
        next: (val) => { 
          this.projects = val; 
        },
        error: (err: HttpErrorResponse) => { console.log(err.status) },
        complete: () => {console.log("comlete") }     
    });
    }

  //get specific project
  getProjectDetails(name: string) {
    
    this.apiService.getProjectTasks(name).subscribe({
      next: (val: any) => { 
        if (val){
          this.selectedProject = val[0];
         }
       else {
        alert("Error: 404 No content")
       }
       },
      error: (err: HttpErrorResponse) => { console.log("failed"); },
      complete: () => {}     
  });
  }

  // selected project to display
  selectProject( name: string) {
    this.getProjectDetails(name); }
 
}
