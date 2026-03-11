import { ResolveFn } from '@angular/router';
import { ManagerOurTeamView } from '../../../services/ManagerOurTeamView/manager-our-team-view';
import { inject } from '@angular/core';

export const managerOwnTeamViewResolver: ResolveFn<any> = () => {
  

  const managerTeamService = inject(ManagerOurTeamView)

  return managerTeamService.getOurTeamEmployee();

  
};
