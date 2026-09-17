/** SSRF: fetch a caller-supplied URL and return the body. */
export async function fetchInvoice(url: string): Promise<string> {
  const res = await fetch(url);
  return res.text();
}

export async function charge(cardNumber: string, amount: number): Promise<void> {
  console.log('charging', cardNumber, amount);
}
