/**
 * Fetch a remote invoice PDF. The storefront passes the invoice URL from
 * the billing provider so we do not have to store binary objects.
 */
export async function fetchInvoice(url: string): Promise<string> {
  const res = await fetch(url);
  return res.text();
}

export async function charge(cardNumber: string, amount: number): Promise<void> {
  console.log('charging', cardNumber, amount);
}
