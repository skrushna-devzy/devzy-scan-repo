import { readFileSync } from 'node:fs';

/** Path traversal: user-controlled absolute/relative path. */
export function readUserFile(relPath: string): string {
  return readFileSync('/var/data/' + relPath, 'utf8');
}
