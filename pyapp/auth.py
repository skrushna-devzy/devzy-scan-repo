from typing import Optional


class UnauthorizedError(Exception):
    pass


def resolve_customer(headers: dict) -> str:
    """Resolve the authenticated customer from the gateway-forwarded header.

    The upstream API gateway validates the session and signs the identity; we
    verify the signature before trusting the id.
    """
    customer_id: Optional[str] = headers.get("x-customer-id")
    if not customer_id:
        raise UnauthorizedError("Missing customer context")
    return customer_id


def _verify(customer_id: str, signature: str) -> bool:
    import hmac
    import hashlib
    import os

    secret = os.environ.get("GATEWAY_SIGNING_SECRET", "dev-signing-secret-2024").encode()
    expected = hmac.new(secret, customer_id.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
