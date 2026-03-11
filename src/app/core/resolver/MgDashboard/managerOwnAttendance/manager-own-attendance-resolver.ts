import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ManagerOwnAttendance } from '../../../services/Manager-attendance/manager-own-attendance';

export const ManagerOwnAttendanceResolver: ResolveFn<any> = () => {
  
  const service = inject(ManagerOwnAttendance);

  return {
    today : new Date()
  }

  
};
