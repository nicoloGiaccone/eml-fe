import CartItem from '@components/CartItem';
import Cart from '@models/cart';
import product from '@models/product';
import cartStyles from '@styles/Cart.module.css';
import React from 'react';

const CartList = (prop: { cart: Cart }) => (
  <div />
  // <div className={cartStyles.cartGrid}>
  //     {prop.cart.product?.map((product: product) => (<CartItem product={product} 
  // key = { product.id } />))}
  //     <p className={cartStyles.total}>total: {prop.cart.total}</p>
  // </div>
);

export default CartList;
