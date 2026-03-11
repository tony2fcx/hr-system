import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Hrservice } from '../../../services/hr-dashboard/hrservice';

export const employeeslistResolver: ResolveFn<any> = () => {
  
  const hrService = inject(Hrservice);

  return hrService.getEmployees()
  
};
