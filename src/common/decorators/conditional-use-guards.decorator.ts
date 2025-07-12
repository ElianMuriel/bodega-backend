import { applyDecorators, UseGuards } from '@nestjs/common';

export function ConditionalUseGuards(...guards: any[]) {
  if (process.env.DEV_MODE === 'true') {
    return applyDecorators(); // No aplica guards en desarrollo
  }
  return applyDecorators(UseGuards(...guards));
}
