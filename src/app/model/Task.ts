import { Member } from "./Member";

export interface Task {
    id: string,
	task_name: string,
    task_hours: number,
    project_name : string,
    member : Member[]
}