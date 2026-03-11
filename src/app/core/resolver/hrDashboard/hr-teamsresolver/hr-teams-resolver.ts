import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ManagerAssignService } from '../../../services/hr-manager-teamassign/manager-assign-service';

export const hrTeamsResolver: ResolveFn<any> = () => {
  

  const service = inject(ManagerAssignService)
  return service.getAllTeams();
};
