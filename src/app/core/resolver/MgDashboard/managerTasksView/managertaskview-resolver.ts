import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MgViewTaskService } from '../../../services/mgViewTaskService/mg-view-task-service';

export const managertaskviewResolver: ResolveFn<any> = () => {
  

  const taskService = inject(MgViewTaskService)
  return taskService.getTasks()
};

