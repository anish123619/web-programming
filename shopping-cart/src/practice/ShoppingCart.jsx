import { useState } from 'react';

const items = [
  { id: 1, name: '커피', price: 4500 },
  { id: 2, name: '샌드위치', price: 7000 },
  { id: 3, name: '물', price: 1000 },
];

function ShoppingCart() {
  // Object state: item id -> quantity
  const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0 });

  function change(id, amount) {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + amount),
    }));
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0
  );

  return (
    <main className="counter-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name} — {item.price.toLocaleString()}원</span>
            <span className="counter-qty">
              <button onClick={() => change(item.id, -1)}>−</button>
              {quantities[item.id]}
              <button onClick={() => change(item.id, 1)}>+</button>
            </span>
          </li>
        ))}
      </ul>
      <p><strong>Total: {total.toLocaleString()}원</strong></p>
    </main>
  );
}

export default ShoppingCart;