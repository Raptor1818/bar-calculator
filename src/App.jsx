import { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';

function App() {
  const bar_items = [
    {
      id: 1,
      name: 'Cotoletta',
      price: 3
    },
    {
      id: 2,
      name: 'Cordon bleu',
      price: 3.5
    },
    {
      id: 3,
      name: 'Hot dog',
      price: 3
    },
    {
      id: 4,
      name: 'Casereccio',
      price: 3.5
    },
    {
      id: 5,
      name: 'Tirolese',
      price: 3
    },
    {
      id: 6,
      name: 'Tostone',
      price: 3
    },
    {
      id: 7,
      name: 'Messico',
      price: 3
    },
    {
      id: 8,
      name: 'Crudo',
      price: 4
    },
    {
      id: 9,
      name: 'Caprese',
      price: 2.8
    },
    {
      id: 10,
      name: 'Tramezzini',
      price: 2.5
    },
    {
      id: 11,
      name: 'Pizza margherita',
      price: 2.3
    },
    {
      id: 12,
      name: 'Pizza farcita',
      price: 2.8
    },
    {
      id: 13,
      name: 'Piadina',
      price: 3
    },
    {
      id: 14,
      name: 'Cheese burger',
      price: 4.5
    },
    {
      id: 15,
      name: 'Bomber',
      price: 6
    },
    {
      id: 16,
      name: 'Mignola',
      price: 6
    },
    {
      id: 17,
      name: 'Goloso',
      price: 6
    },
    {
      id: 18,
      name: 'Chicken Burger',
      price: 5
    }
  ];

  const [order, setOrder] = useState([]); // Stato per gestire l'ordine dell'utente

  // Funzione per aggiungere un elemento all'ordine
  const addItemToOrder = (item) => {
    setOrder([...order, item]);
  };

  // Funzione per calcolare il totale dell'ordine
  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white p-12">
      <h1 className="text-4xl font-bold mb-4">School Bar Price Calculator</h1>

      <div className="rounded-md bg-[#303030] shadow-md p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul>
              {bar_items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                  <button className='pl-2 h-6' onClick={() => addItemToOrder(item)}> <FaCirclePlus /> </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Order</h2>
            <ul>
              {order.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-xl font-semibold mt-4">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
