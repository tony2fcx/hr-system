import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MgProfileService } from '../../../services/MgProfileService/mg-profile-service';

export const managerProfileUpdateResolver: ResolveFn<any> = () => {
  

  const service = inject(MgProfileService);

  return service.getOwnProfile();
};
