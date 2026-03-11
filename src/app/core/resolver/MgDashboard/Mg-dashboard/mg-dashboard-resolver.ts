import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ManagerService } from '../../../services/manager-dashboard/manager-service';
import { forkJoin } from 'rxjs';

export const mgDashboardResolver: ResolveFn<any> = () => {
  

  const managerService = inject(ManagerService);

  return forkJoin({
    tasks: managerService.getTasks(),
    attendance : managerService.getTeamAttendance(),
    employees : managerService.getEmployees()
  })
};
