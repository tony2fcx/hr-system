import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HrProfileService } from '../../../services/hrProfileService/hrprofile-service';


export const hrProfileUpdateResolver: ResolveFn<any> = () => {
  

  const service = inject(HrProfileService)

  return service.getOwnProfile();
};
