import { useState } from 'react';
import { FaSquarePlus } from 'react-icons/fa6';
import { FaSquareMinus } from 'react-icons/fa6';

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

  const [order, setOrder] = useState([]); // State to manage the user's order

  // Function to add an item to the order
  const addItemToOrder = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      // If the item already exists, increase its quantity
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      // If the item is not in the order, add it with a quantity of 1
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove an item from the order
  const removeItemFromOrder = (itemToRemove) => {
    if (itemToRemove.quantity === 1) {
      // If the item's quantity is 1, remove it from the order
      setOrder(order.filter((item) => item.id !== itemToRemove.id));
    } else {
      // If the item's quantity is more than 1, decrease its quantity by 1
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === itemToRemove.id
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    }
  };

  const clearOrder = () => {
    setOrder([]);
  };

  // Function to calculate the total of the order
  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Calcolatore per il bar</h1>

      <div className="rounded-md bg-[#303030] shadow-md p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl text-center font-semibold mb-3">Menu</h2>
            <ul>
              {bar_items.map((item) => (
                <li className="my-2 flex justify-between rounded-md border-solid border-2" key={item.id}>
                  <div>
                    <p className="p-2">
                      {item.name}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='mr-1'>
                      <p className="p-2">
                        €{item.price.toFixed(2)}
                      </p>
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
              ))}
            </ul>
          </div>

          <div className="border-solid md:border-l-2 md:border-t-0 border-t-2 md:mr-4 border-neutral-600">
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-semibold">Order</h2>
              <button
                className="border-solid border-2 rounded-md px-2 py-1"
                onClick={() => clearOrder()}
              >
                Clear
              </button>
            </div>
            <ul>
              {order.map((item) => (
                <li className="my-2 flex justify-between rounded-md border-solid border-2" key={item.id}>
                  <div>
                    <p className="p-2">
                      {item.quantity > 1 && `x${item.quantity} `}
                      {item.name}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <div className='mr-1'>
                      <p className="p-2">
                        €{item.price.toFixed(2)}
                      </p>
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
            <p className="text-xl font-semibold mt-4">
              Totale: €{calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
