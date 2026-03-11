import { ResolveFn } from '@angular/router';
import { ManagerTeamAttendance } from '../../../services/ManagerTeamAttentance/manager-team-attentance';
import { inject } from '@angular/core';


export const managerTeamAttendanceResolver: ResolveFn<any> = () => {

  const service = inject(ManagerTeamAttendance);
  return service.getMyTeamAllAttendances();
};
