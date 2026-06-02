CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  display_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pickup_option TEXT NOT NULL CHECK (pickup_option IN ('asap', 'scheduled')),
  notes TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL,
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  payment_status TEXT NOT NULL DEFAULT 'test_unpaid',
  order_status TEXT NOT NULL DEFAULT 'new' CHECK (
    order_status IN ('new', 'preparing', 'ready', 'completed')
  ),
  stripe_checkout_session_id TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
