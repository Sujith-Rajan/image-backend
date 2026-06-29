import { SetMetadata } from '@nestjs/common';

// 🔑 metadata key (used by RolesGuard)
export const ROLES_KEY = 'role';

// 🎯 decorator
export const Roles = (...role: string[]) => SetMetadata(ROLES_KEY, role);