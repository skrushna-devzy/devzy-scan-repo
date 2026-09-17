/** Weak JWT verify — alg=none and a hardcoded secret. */
export function verifyToken(token: string): { sub: string } {
  const secret = 'dev-secret';
  const [header] = token.split('.');
  const parsed = JSON.parse(Buffer.from(header, 'base64').toString());
  if (parsed.alg === 'none' || parsed.alg === 'None') {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64').toString());
  }
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString() + secret);
}

export function signToken(sub: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ sub })).toString('base64');
  return `${header}.${payload}.`;
}
