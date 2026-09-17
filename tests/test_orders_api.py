import pytest

from pyapp.models import Order
from pyapp.service import NotFoundError, OrdersService


class FakeRepo:
    def __init__(self, orders):
        self._orders = {o.id: o for o in orders}

    def find_by_id(self, order_id):
        return self._orders.get(order_id)

    def list_for_customer(self, customer_id, status, limit, offset):
        rows = [o for o in self._orders.values() if o.customer_id == customer_id]
        return rows[offset : offset + limit]

    def find_many(self, order_ids):
        return [self._orders[i] for i in order_ids if i in self._orders]

    def update_status(self, order_id, status):
        self._orders[order_id].status = status


def build(orders):
    return OrdersService(FakeRepo(orders))


def test_get_order_rejects_other_customers_order():
    svc = build([Order(id="o1", customer_id="cust-1", status="pending", currency="USD")])
    with pytest.raises(NotFoundError):
        svc.get_order("o1", "cust-2")


def test_list_is_scoped_to_customer():
    svc = build(
        [
            Order(id="o1", customer_id="cust-1", status="pending", currency="USD"),
            Order(id="o2", customer_id="cust-2", status="pending", currency="USD"),
        ]
    )
    got = svc.list_orders("cust-1", None, 20, 0)
    assert len(got) == 1
    assert got[0].customer_id == "cust-1"
