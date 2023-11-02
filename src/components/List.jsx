/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { bar_items } from "./barItems";
import CopyableOrderText from "./CopyableOrderText";

function List() {
  const [order, setOrder] = useState([]);
  const [flashItemId, setFlashItemId] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

  const addItemToOrder = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    const updatedOrder = existingItem
      ? order.map((orderItem) => (orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem))
      : [...order, { ...item, quantity: 1 }];
    setOrder(updatedOrder);
    setFlashItemId(item.id);
    setTimeout(() => setFlashItemId(null), 300);
  };

  const removeItemFromOrder = (itemToRemove) => {
    const updatedOrder = itemToRemove.quantity === 1
      ? order.filter((item) => item.id !== itemToRemove.id)
      : order.map((orderItem) => (orderItem.id === itemToRemove.id ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem));
    setOrder(updatedOrder);
  };

  const clearOrder = () => { setOrder([]) }
  const calculateTotal = () =>
    order.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));
    if (savedOrder) setOrder(savedOrder);
  }, []);
  useEffect(() => {localStorage.setItem("order", JSON.stringify(order))}, [order]);

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8 px-4 md:px-32 flex flex-col items-center font-nunito">
      <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold bg-gradient-to-br from-amber-700 to-yellow-400 
          bg-clip-text text-transparent mb-8 text-center h-fit w-fit py-2 px-0 sm:p-2 md:mt-8 lg:mt-12">
        Calcolatore ordini per il bar
      </h1>

      {/* NAVIGATION */}
      <div className="text-center mb-6"> {/* equal space */}
        <button
          title="Menu" role="button" aria-label="Menu" type="button"
          className={`mr-4 font-roboto-mono uppercase px-6 py-[.675rem] rounded-md ${
            showMenu
              ? "bg-gradient-to-br from-amber-700 to-yellow-400"
              : "bg-gradient-to-br from-neutral-700 to-neutral-400"
          } shadow-md shadow-black text-white font-semibold transition
            duration-200 ease-out`}
          onClick={() => setShowMenu(true)}
        >
          Menù
        </button>
        <button
          title="Ordine" role="button" aria-label="Ordine" type="button"
          className={` font-roboto-mono uppercase px-6 py-[.675rem] rounded-md ${
            showMenu
              ? "bg-gradient-to-br from-neutral-700 to-neutral-400"
              : "bg-gradient-to-br from-amber-700 to-yellow-400"
          } shadow-md shadow-black text-white font-semibold transition 
            duration-200 ease-out`} 
          onClick={() => setShowMenu(false)}
        >
          Ordine
        </button>
      </div>

      <div className="rounded-md bg-[#303030] shadow-md shadow-black 
          my-2 lg:my-4 py-0 px-2 w-full flex flex-col justify-center items-center
          min-h-[150px] min-w-[33%] md:max-w-3xl">
        <div className="gap-4 w-full max-w-3xl">
          {showMenu ? (
            <div className="min-h-screen mt-4 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mt-5">Menù</h2>
              <ul className="mt-2 px-2 md:px-3">
                {bar_items.map((item, index) => (
                  <div key={item.id}>
                    {(index === 0 || item.id === 10 || item.id === 14) && (
                      <h2 className="text-xl font-bold mt-6 lg:mt-8">
                        {item.id === 1 ? "Panini" : item.id === 10 ? "Altri Panini" : "Menù Pranzo"}
                      </h2>
                    )}
                    <li
                      className={`my-2 flex flex-row justify-between items-center rounded-md border-solid border-[1px] shadow-neutral-900 shadow-md ${
                        flashItemId === item.id ? "border-[#47ff47]" : "border-neutral-400"
                      } transition duration-200 ease-out`}
                    >
                      <div className="p-2">
                        <p>{item.name}</p>
                        <div className="flex-row flex">
                          <p className="text-neutral-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex justify-between p-2">
                        <div className="mr-1 pt-2">
                          <p className="font-roboto-mono">€{item.price.toFixed(2)}</p>
                        </div>
                        <div>
                        <button className="h-10 w-10 flex items-center justify-center" onClick={() => addItemToOrder(item)} title="Aggiungi" role="button" aria-label="Aggiungi" type="button">
                          <FaSquarePlus className="text-3xl" />
                        </button>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div className="">
              <div className="flex flex-col justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">Ordine</h2>
                </div>
                <div className="flex justify-between w-full mt-3 pt-3 border-t-[1px] border-solid border-neutral-500">
                  <p className="text-xl font-medium font-roboto-mono">
                    Totale: €{calculateTotal().toFixed(2)}
                  </p>
                  <button title="Clear" role="button" aria-label="Clear" type="button"
                    className="border-solid border-[1px] border-neutral-400 rounded-md px-2 py-1 shadow-neutral-900 shadow-md"
                    onClick={() => clearOrder()}
                  > Clear </button>
                </div>
              </div>
              <ul>
                {order.map((item, index) => (
                  <li className="my-2 flex justify-between rounded-md border-solid border-[1px] border-neutral-400 shadow-neutral-900 shadow-md"
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
                        <button className="h-10 w-10 flex items-center justify-center" onClick={() => removeItemFromOrder(item)} title="Togli" role="button" aria-label="Togli" type="button">
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
      {showMenu ? null : <CopyableOrderText order={order} />}
    </div>
  );
}

export default List;