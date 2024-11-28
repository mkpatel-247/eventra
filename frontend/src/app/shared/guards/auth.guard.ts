import { CanActivateFn } from '@angular/router';
import { getLocalStorage } from '../common/function';
import { TOKEN } from '../constant/keys.constant';

export const authGuard: CanActivateFn = (route, state) => {
  return getLocalStorage(TOKEN) ? true : false;
};
