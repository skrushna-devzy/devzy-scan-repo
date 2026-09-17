/** Mass assignment: spreads the whole body onto the user row. */
export function updateUser(id: string, body: Record<string, unknown>): Record<string, unknown> {
  return { id, role: 'user', ...body };
}
