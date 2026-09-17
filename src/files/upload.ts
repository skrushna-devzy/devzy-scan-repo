import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Path traversal via unsanitized filename. */
export function saveUpload(filename: string, body: Buffer): void {
  const dest = join('/var/data/uploads', filename);
  writeFileSync(dest, body);
}
