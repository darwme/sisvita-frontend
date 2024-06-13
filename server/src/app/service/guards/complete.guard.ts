// complete.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProgressService } from '../progress/progress.service';

export const completeGuard: CanActivateFn = (route, state) => {
  const progressService = inject(ProgressService);
  const router = inject(Router);

  const currentPart = route.routeConfig?.path?.split('/')[1];
  const previousPart = getPreviousPart(currentPart || '');

  if (previousPart !== null) {
    console.log(
      'Is previous part completed:',
      progressService.isPartCompleted(previousPart)
    );
  }

  if (previousPart && !progressService.isPartCompleted(previousPart)) {
    const redirectUrl = previousPart ? `/test/${previousPart}` : '/test';
    console.log('Redirecting to:', redirectUrl);
    router.navigateByUrl(redirectUrl);
    return false;
  }

  return true;
};

function getPreviousPart(currentPart: string) {
  switch (currentPart) {
    case 'cognitivo':
      return '';
    case 'fisiologico':
      return 'cognitivo';
    case 'motor':
      return 'fisiologico';
    default:
      return null;
  }
}
