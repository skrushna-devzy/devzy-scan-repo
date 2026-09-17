from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class OrderItem:
    sku: str
    name: str
    quantity: int
    unit_price_minor: int


@dataclass
class Order:
    id: str
    customer_id: str
    status: str
    currency: str
    items: List[OrderItem] = []
    discount_percent: Optional[int] = None

    def total_minor(self) -> int:
        return sum(i.unit_price_minor * i.quantity for i in self.items)


ALLOWED_TRANSITIONS = {
    "pending": ("confirmed", "cancelled"),
    "confirmed": ("shipped", "cancelled"),
    "shipped": ("delivered",),
    "delivered": (),
    "cancelled": (),
}
