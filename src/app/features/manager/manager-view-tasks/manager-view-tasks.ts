import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MgViewTaskService } from '../../../core/services/mgViewTaskService/mg-view-task-service';
import { MgProfileService } from '../../../core/services/MgProfileService/mg-profile-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-manager-view-tasks',
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './manager-view-tasks.html',
  styleUrl: './manager-view-tasks.css',
})
export class ManagerViewTasks {
  

  private route = inject(ActivatedRoute)
  private taskService = inject(MgViewTaskService)
  private router = inject(Router)
  private profileService = inject(MgProfileService)

  tasks = signal<any[]>([])
  originalTasks = signal<any[]>([])
  profile = this.profileService.profileSignal;

  

  sidebarOpen = false;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }


  newTask = {
    title: '',
    description: '',
    deadline: ''
  }


  editTask:any = {
    id:null,
    title:'',
    description:'',
    deadline:''
  }




  constructor(){

    const data = this.route.snapshot.data['viewTasksData']
    this.tasks.set(data)
    this.originalTasks.set(data)
    this.profileService.loadProfile();
  }




  filterTasks(event:any){

    const status = event.target.value

    if(status === 'ALL'){
      this.tasks.set(this.originalTasks())
      return
    }

    const filtered = this.originalTasks()
      .filter(task => task.status === status)

    this.tasks.set(filtered)

  }




  createTask(){

    if(!this.newTask.title || !this.newTask.deadline){
      alert("Title and Deadline required");
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next:(res:any)=>{

        this.tasks.update(tasks => [...tasks,res])
        this.originalTasks.update(tasks => [...tasks,res])

        alert("Task created successfully")

        this.newTask = {
          title:'',
          description:'',
          deadline:''
        }

        const modalEl = document.getElementById('createTaskModal')
        const modal = bootstrap.Modal.getInstance(modalEl)
      
        setTimeout(()=>{
          modal.hide()
        },500)

      },

      error:(err)=>{
        console.error(err)
        alert("Task creation failed")
      }
    })
  }





  openUpdateModal(task:any){

    this.editTask = {
      id:task.id,
      title:task.title,
      description:task.description,
      deadline:task.deadline
    }

    const modal = new bootstrap.Modal(
      document.getElementById('updateTaskModal')
    )

    modal.show()
  }




  updateTask(){

    this.taskService.updateTask(this.editTask.id,this.editTask)
    .subscribe({

      next:(res:any)=>{

        this.tasks.update(tasks => tasks.map(t => t.id === this.editTask.id ? res : t))

        alert("Task updated successfully")

        const modalEl = document.getElementById('updateTaskModal')
        const modal = bootstrap.Modal.getInstance(modalEl)

        modal.hide()

      },

      error:(err)=>{
        console.error(err)
        alert("Update failed")
      }

    })

  }





  deleteTask(id:number){

    const confirmDelete = confirm("Delete this task?");

    if(!confirmDelete) return;

    this.taskService.deleteTask(id).subscribe({

      next: () => {

        this.tasks.update(tasks => tasks.filter(t => t.id !== id));

        alert("Task deleted successfully");

      },

      error: (err) => {

        console.error(err);

        alert("Failed to delete task");

      }

    });

  }


  formatTime(time:string|null){

    if(!time) return '—';

    const date = new Date(time);

    return date.toLocaleDateString([],{
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    })
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
