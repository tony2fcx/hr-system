import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Hrservice } from '../../../services/hr-dashboard/hrservice';
import { forkJoin } from 'rxjs';

export const hrdashboardResolver: ResolveFn<any> = () => {
  
  const hrService = inject(Hrservice);

  return forkJoin({
    employees: hrService.getEmployees(),
    managers: hrService.getManagers(),
    attendance: hrService.getAttendance(),
  })
};
