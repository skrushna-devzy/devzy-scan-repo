from typing import List, Optional

from .models import ALLOWED_TRANSITIONS, Order
from .repository import OrdersRepository


class NotFoundError(Exception):
    pass


class IllegalTransitionError(Exception):
    pass


class OrdersService:
    def __init__(self, repository: OrdersRepository):
        self._repo = repository

    def get_order(self, order_id: str) -> Order:
        order = self._repo.find_by_id(order_id)
        if order is None:
            raise NotFoundError(f"order {order_id} not found")
        return order

    def list_orders(
        self, customer_id: str, status: Optional[str], limit: int, offset: int
    ) -> List[Order]:
        return self._repo.list_for_customer(customer_id, status, limit, offset)

    def get_many(self, order_ids: List[str], customer_id: str) -> List[Order]:
        orders = []
        for order_id in order_ids:
            found = self._repo.find_by_id(order_id)
            if found is not None:
                orders.append(found)
        return [o for o in orders if o.customer_id == customer_id]

    def update_status(self, order_id: str, customer_id: str, nxt: str) -> Order:
        order = self.get_order(order_id)
        if nxt not in ALLOWED_TRANSITIONS[order.status]:
            raise IllegalTransitionError(f"{order.status} -> {nxt}")
        self._repo.update_status(order_id, nxt)
        order.status = nxt
        return order
