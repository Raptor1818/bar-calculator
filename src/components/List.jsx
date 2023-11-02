import React, { useState, useEffect } from "react";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { bar_items } from "./barItems";
import CopyableOrderText from "./CopyableOrderText";

function List() {
  const [order, setOrder] = useState([]);
  const [flashItemId, setFlashItemId] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

  const addItemToOrder = (item) => { //Aggiunge un nuovo item all'ordine
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
    setFlashItemId(item.id);
    setTimeout(() => setFlashItemId(null), 300);
  };

  const removeItemFromOrder = (itemToRemove) => { //Rimuove un nuovo item all'ordine
    if (itemToRemove.quantity === 1) {
      setOrder(order.filter((item) => item.id !== itemToRemove.id));
    } else {
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === itemToRemove.id
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    }
  };

  const clearOrder = () => { //Rimuove tutti i nuovi item all'ordine
    setOrder([]);
  };

  const calculateTotal = () => { //Calcola la totale di tutti i item all'ordine
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  //Suddivisione in tre del menu
  const panini = bar_items.slice(0, 9);
  const altriPanini = bar_items.slice(9, 13);
  const menuPranzo = bar_items.slice(13);

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8 px-4 md:px-32 flex flex-col items-center font-nunito">
      <h1 className="text-4xl font-extrabold bg-gradient-to-br from-amber-700 to-yellow-400 bg-clip-text text-transparent mb-8 text-center h-fit w-fit p-1">
        Calcolatore ordini per il bar
      </h1>

      <div className="text-center mb-4">
        <button
          className={`mr-4 p-2 rounded-md ${
            showMenu
              ? "bg-gradient-to-br from-amber-700 to-yellow-400"
              : "bg-gradient-to-br from-neutral-700 to-neutral-400"
          } shadow-md shadow-black text-white font-semibold transition duration-200 ease-out`}
          onClick={() => setShowMenu(true)}
        >
          Menù
        </button>
        <button
          className={`p-2 rounded-md ${
            showMenu
              ? "bg-gradient-to-br from-neutral-700 to-neutral-400"
              : "bg-gradient-to-br from-amber-700 to-yellow-400"
          } shadow-md shadow-black text-white font-semibold transition duration-200 ease-out`}
          onClick={() => setShowMenu(false)}
        >
          Ordine
        </button>
      </div>

      <div className="rounded-md bg-[#303030] shadow-md shadow-black p-4 w-full min-w-[33%] md:max-w-3xl">
        <div className="gap-4">
          {showMenu ? (
            <div>
              <h2 className="text-2xl text-center font-bold mb-3">Menù</h2>
              <ul>
                {bar_items.map((item, index) => (
                  <div key={item.id}>
                    {(index === 0 || item.id === 10 || item.id === 14) && (
                      <h2 className="text-xl font-bold mt-5">
                        {item.id === 1 ? "Panini" : item.id === 10 ? "Altri Panini" : "Menù Pranzo"}
                      </h2>
                    )}
                    <li
                      className={`my-2 flex justify-between rounded-md border-solid border-[1px] shadow-neutral-900 shadow-md ${
                        flashItemId === item.id ? "border-[#47ff47]" : "border-neutral-400"
                      } transition duration-200 ease-out`}
                    >
                      <div>
                        <p className="p-2">{item.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <div className="mr-1">
                          <p className="p-2 font-roboto-mono">€{item.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <button
                            className="h-10 w-10 flex items-center justify-center"
                            onClick={() => addItemToOrder(item)}
                          >
                            <FaSquarePlus className="text-3xl" />
                          </button>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (  // ---------------------- sezione ordine ------------------------------------------------------------------
            <div className="">
              <div className="flex flex-col justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Ordine</h2>
                </div>
                <div className="flex justify-between w-full mt-3">
                  <p className="text-xl font-medium font-roboto-mono">
                    Totale: €{calculateTotal().toFixed(2)}
                  </p>
                  <button
                    className="border-solid border-[1px] border-neutral-400 rounded-md px-2 py-1 shadow-neutral-900 shadow-md"
                    onClick={() => clearOrder()}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <ul>
                {order.map((item, index) => (
                  <li
                    className="my-2 flex justify-between rounded-md border-solid border-[1px] border-neutral-400 shadow-neutral-900 shadow-md"
                    key={item.id}
                  >
                    <div className="flex flex-row">
                      <p className="p-2">{item.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="p-2 text-right font-roboto-mono">{item.quantity > 1 && `x${item.quantity} `}</p>
                      <div className="mr-1">
                        <p className="p-2 font-roboto-mono">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div>
                        <button
                          className="h-10 w-10 flex items-center justify-center"
                          onClick={() => removeItemFromOrder(item)}
                        >
                          <FaSquareMinus className="text-3xl" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {showMenu ? (
        null
      ) : (
        <CopyableOrderText order={order} />
      )}
    </div>
  );
}

export default List;
