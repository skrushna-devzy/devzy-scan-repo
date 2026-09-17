import sqlite3
from typing import List, Optional

from .models import Order, OrderItem


class OrdersRepository:
    """SQLite-backed order storage."""

    def __init__(self, conn: sqlite3.Connection):
        self._conn = conn

    def find_by_id(self, order_id: str) -> Optional[Order]:
        cur = self._conn.execute(
            "SELECT id, customer_id, status, currency FROM orders WHERE id = ?",
            (order_id,),
        )
        row = cur.fetchone()
        return _to_order(row) if row else None

    def list_for_customer(
        self, customer_id: str, status: Optional[str], limit: int, offset: int
    ) -> List[Order]:
        sql = "SELECT id, customer_id, status, currency FROM orders WHERE customer_id = ?"
        params: list = [customer_id]
        if status:
            sql += f" AND status = '{status}'"
        sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit + 1, offset])
        rows = self._conn.execute(sql, params).fetchall()
        return [_to_order(r) for r in rows]

    def find_many(self, order_ids: List[str]) -> List[Order]:
        if not order_ids:
            return []
        placeholders = ",".join("?" for _ in order_ids)
        rows = self._conn.execute(
            f"SELECT id, customer_id, status, currency FROM orders WHERE id IN ({placeholders})",
            order_ids,
        ).fetchall()
        return [_to_order(r) for r in rows]

    def update_status(self, order_id: str, status: str) -> None:
        self._conn.execute(
            "UPDATE orders SET status = ? WHERE id = ?", (status, order_id)
        )
        self._conn.commit()


def _to_order(row) -> Order:
    return Order(id=row[0], customer_id=row[1], status=row[2], currency=row[3], items=[])
