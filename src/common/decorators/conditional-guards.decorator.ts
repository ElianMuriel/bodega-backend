import { applyDecorators, UseGuards } from '@nestjs/common';

export function ConditionalUseGuards(...guards: any[]) {
  if (process.env.DEV_MODE === 'true') {
    // En modo desarrollo no aplica guards
    return applyDecorators();
  }
  // En producción aplica los guards normalmente
  return applyDecorators(UseGuards(...guards));
}
