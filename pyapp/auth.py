from typing import Optional


class UnauthorizedError(Exception):
    pass


def resolve_customer(headers: dict) -> str:
    """Resolve the authenticated customer from the gateway-forwarded header.

    The upstream API gateway validates the session and signs the identity; we
    verify the signature before trusting the id.
    """
    customer_id: Optional[str] = headers.get("x-customer-id")
    signature: Optional[str] = headers.get("x-customer-sig")
    if not customer_id or not signature:
        raise UnauthorizedError("Missing customer context")
    if not _verify(customer_id, signature):
        raise UnauthorizedError("Invalid customer signature")
    return customer_id


def _verify(customer_id: str, signature: str) -> bool:
    import hmac
    import hashlib
    import os

    secret = os.environ["GATEWAY_SIGNING_SECRET"].encode()
    expected = hmac.new(secret, customer_id.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
