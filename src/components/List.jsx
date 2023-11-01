import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";
import { bar_items } from "./barItems";

function List() {
  const [order, setOrder] = useState([]);
  const [flashItemId, setFlashItemId] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

    // Suddividi gli articoli in tre sezioni
    const panini = bar_items.slice(0, 9); // Dal 1 al 9
    const altriPanini = bar_items.slice(9, 13); // Dal 10 al 13
    const menuPranzo = bar_items.slice(13); // Dal 14 all'ultimo

  const addItemToOrder = (item) => { //Aggiunge un articolo all'ordine
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

  const removeItemFromOrder = (itemToRemove) => { //Rimuove un articolo all'ordine
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

  const clearOrder = () => { //Rimuove tutti gli articoli all'ordine
    setOrder([]);
  };

  const calculateTotal = () => { //Calcola il totale di tutti gli articoli all'ordine
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const groupedOrder = order.reduce((acc, item) => { //Aggiunge tutti gli articoli all'ordine in un array
    const existingItem = acc.find((groupedItem) => groupedItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-br from-amber-700 to-yellow-400 bg-clip-text text-transparent mb-8 text-center h-fit w-fit p-1">
        Calcolatore per il bar
      </h1>

      <div className="text-center mb-4">
        <button
          className={`mr-4 p-2 rounded-md ${
            showMenu
              ? "bg-gradient-to-br from-amber-700 to-yellow-400"
              : "bg-gradient-to-br from-neutral-700 to-neutral-400"
          } shadow-md shadow-black text-white font-semibold transition duration-200ms ease-out`}
          onClick={() => setShowMenu(true)}
        >
          Menu
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
      
      <div className="rounded-md bg-[#303030] shadow-md shadow-black p-4 w-full md:w-1/3">
        <div className="gap-4">
          {showMenu ? (
            <div>
              <h2 className="text-2xl text-center font-bold mb-3">Menù</h2>
              <ul>
                {bar_items.map((item, index) => (
                  <div key={item.id}>
                    {index === 0 || item.id === 10 || item.id === 14 ? (
                      <h2 className="text-xl font-semibold mt-2">
                        {item.id === 1 ? "Panini" : item.id === 10 ? "Altri Panini" : "Menu Pranzo"}
                      </h2>
                    ) : null}
                    <li
                      className={`my-2 flex justify-between rounded-md border-solid border-[1px] shadow-neutral-900 shadow-md ${
                        flashItemId === item.id ? "border-[#47ff47]" : "border-white"
                      } transition duration-200 ease-out`}
                    >
                      <div>
                        <p className="p-2">{item.name}</p>
                      </div>
                      <div className="flex justify-between">
                        <div className="mr-1">
                          <p className="p-2">€{item.price.toFixed(2)}</p>
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
                <div className="flex justify-between w-full mt-2">
                  <p className="text-xl font-semibold">
                    Totale: €{calculateTotal().toFixed(2)}
                  </p>
                  <button
                    className="border-solid border-[1px] rounded-md px-2 py-1 shadow-neutral-900 shadow-md"
                    onClick={() => clearOrder()}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <ul>
                {groupedOrder.map((item) => (
                  <li
                    className="my-2 flex justify-between rounded-md border-solid border-[1px] shadow-neutral-900 shadow-md"
                    key={item.id}
                  >
                    <div className="flex flex-row">
                      <p className="p-2">
                        {item.name}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="p-2 text-right">
                        {item.quantity > 1 && `x${item.quantity} `}
                      </p>
                      <div className="mr-1">
                        <p className="p-2">€{(item.price * item.quantity).toFixed(2)}</p>
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
    </div>
  );
}

export default List;