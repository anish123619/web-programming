function Cart({ items, onChangeQty, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span className="cart-name">{item.name}</span>
              <span className="cart-qty">
                <button onClick={() => onChangeQty(item.id, -1)}>−</button>
                {item.quantity}
                <button onClick={() => onChangeQty(item.id, 1)}>+</button>
              </span>
              <span className="cart-price">
                {(item.price * item.quantity).toLocaleString()}원
              </span>
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: {total.toLocaleString()}원</strong></p>
    </aside>
  );
}

export default Cart;