import { Task } from "./Task"

export interface Project {
    id: string,
	project_name: string,
    task: Task[]
}