import { useState } from 'react';
import products from './products';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
  const [cart, setCart] = useState([]);

  function handleAdd(product) {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function handleChangeQty(id, change) {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter(item => item.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1>My Shop</h1>
      <ProductList products={products} onAdd={handleAdd} />
      <Cart items={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} />
    </div>
  );
}

export default App;