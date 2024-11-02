import { useState } from "react";

import Header from "./components/Header";
import { db } from "./data/db";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";

function App() {
  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    console.log("diste click");
    //Verificar si existe la item en el cartito
    const guitarExist = cart.findIndex((Element) => Element.id === item.id);

    if (guitarExist >= 0) {
      //Si ya existe producto en el cart
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
  return (
    <>
      <Header key={cart.id} cart={cart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitar
              key={guitarra.id}
              guitarra={guitarra}
              setCart={setCart}
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
