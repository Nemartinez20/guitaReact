import { useState } from "react";

import Header from "./components/Header";
import { db } from "./data/db";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";

function App() {
  //
  //
  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  function addToCart(item) {
    //Verificar si existe la item en el cartito
    const guitarExist = cart.findIndex((Element) => Element.id === item.id);

    if (guitarExist >= 0) {
      //Si ya existe producto en el cart
      if (cart[guitarExist].quantity >= MAX_ITEM) return; //para que no me agrega mas de 5 elementos
      const updateCart = [...cart]; //tomar una copia del cart
      updateCart[guitarExist].quantity++; //segun el indice del item invrementa la cantidad
      setCart(updateCart); //Se  actualiza la cantidad al state
    } else {
      //Si no existe el producto en el carrito
      const newItem = {
        ...item, //se toma una copia del producto y se agrega nueva propiedad quantity
        quantity: 1, // Establece la cantidad sin modificar el objeto original
      };

      setCart((prevCart) => [...prevCart, newItem]); //Setear el stado de cart
    }
  }

  const eliminarProducto = (id) => {
    const productos = cart.filter((element) => element.id !== id);
    setCart(productos);
    // setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const IncrementarQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  };

  const restarQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  };


  const clearCart = ()=>{
    setCart([]);
  }
  return (
    <>
      <Header
        key={cart.id}
        cart={cart}
        eliminarProducto={eliminarProducto}
        IncrementarQuantity={IncrementarQuantity}
        restarQuantity={restarQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitar
              key={guitarra.id}
              guitarra={guitarra}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
