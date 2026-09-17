import { createHash } from 'node:crypto';

/** MD5 password hash. */
export function hashPassword(password: string): string {
  return createHash('md5').update(password).digest('hex');
}
