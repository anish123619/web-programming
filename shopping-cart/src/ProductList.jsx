function ProductList({ products, onAdd }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price.toLocaleString()}원</p>
          <button onClick={() => onAdd(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;