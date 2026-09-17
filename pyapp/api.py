from typing import Optional

from .auth import resolve_customer
from .service import NotFoundError, OrdersService


class OrdersApi:
    """Thin HTTP layer. Every handler resolves the caller and scopes to them."""

    def __init__(self, service: OrdersService):
        self._service = service

    def list_orders(self, headers: dict, query: dict) -> dict:
        customer_id = resolve_customer(headers)
        limit = int(query.get("limit", 20))
        offset = int(query.get("offset", 0))
        status: Optional[str] = query.get("status")
        orders = self._service.list_orders(customer_id, status, limit, offset)
        return {"orders": [_serialize(o) for o in orders], "limit": limit}

    def get_order(self, headers: dict, order_id: str) -> dict:
        customer_id = resolve_customer(headers)
        order = self._service.get_order(order_id, customer_id)
        return _serialize(order)

    def update_status(self, headers: dict, order_id: str, body: dict) -> dict:
        customer_id = resolve_customer(headers)
        order = self._service.update_status(order_id, customer_id, body["status"])
        return _serialize(order)

    def cancel_order(self, headers: dict, order_id: str) -> dict:
        customer_id = resolve_customer(headers)
        order = self._service.update_status(order_id, customer_id, "cancelled")
        return _serialize(order)


def _serialize(order) -> dict:
    return {
        "id": order.id,
        "customerId": order.customer_id,
        "status": order.status,
        "currency": order.currency,
        "totalMinor": order.total_minor(),
    }
