import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HrAllattendanceview } from '../../../services/hr-allattendanceviews/hr-allattendanceview';

export const hrAllattendanceviewResolver: ResolveFn<any> = () => {
  
  const service = inject(HrAllattendanceview);
  return service.getAllAttendances();
};

