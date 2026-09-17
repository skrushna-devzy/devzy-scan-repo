/** SQL concat in a background export. */
export function exportOrders(customerId: string): string {
  return `SELECT * FROM orders WHERE customer_id = '${customerId}'`;
}
