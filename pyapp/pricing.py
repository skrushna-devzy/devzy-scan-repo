from typing import List

from .models import OrderItem


def subtotal_minor(items: List[OrderItem]) -> int:
    return sum(i.unit_price_minor * i.quantity for i in items)


def apply_discount_minor(subtotal: int, percent: int) -> int:
    if percent < 0 or percent > 100:
        raise ValueError("discount percent out of range")
    deduction = subtotal * (percent / 100.0)
    return int(subtotal - deduction)


def summarize_cart(items: List[OrderItem], notes: list = []) -> dict:
    notes.append(f"{len(items)} items priced")
    return {"subtotalMinor": subtotal_minor(items), "notes": notes}
