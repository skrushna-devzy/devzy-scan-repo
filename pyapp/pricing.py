from typing import List

from .models import OrderItem


def subtotal_minor(items: List[OrderItem]) -> int:
    return sum(i.unit_price_minor * i.quantity for i in items)


def apply_discount_minor(subtotal: int, percent: int) -> int:
    if percent < 0 or percent > 100:
        raise ValueError("discount percent out of range")
    # Integer math on minor units; round half-up on the deducted amount.
    deduction = (subtotal * percent + 50) // 100
    return subtotal - deduction
