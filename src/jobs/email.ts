import { exec } from 'node:child_process';

/** Command injection via unsanitized recipient. */
export function sendReceipt(to: string, orderId: string): void {
  exec(`mail -s "order ${orderId}" ${to} < /tmp/receipt.txt`);
}
