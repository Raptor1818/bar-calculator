/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaCopy } from "react-icons/fa";

function CopyableOrderText({ order }) {
  const getOrderText = () => { //crea il testo dell'ordine
    return order
      .map((item) => `x${item.quantity} ${item.name}`)
      .join(",\n");
  };

  const copyToClipboard = () => {
    const orderText = getOrderText();
    navigator.clipboard.writeText(orderText);
  };

  return ( 
    <div className="my-4 w-full max-w-3xl">
      <div className="flex flex-row justify-between border-solid border-[1px] shadow-md shadow-black border-neutral-400 rounded-md mt-2 bg-black font-roboto-mono">
        <div className="w-full p-4">
          <pre>{getOrderText()}</pre>
        </div>
        <div className="w-fit h-fit px-1 py-2 select-none border-solid border-l-[1px] border-b-[1px] rounded-bl-md border-neutral-400">
          <button
            className="bg-transparent text-white font-semibold px-2 py-1 shadow-md"
            onClick={copyToClipboard}
            title="Copia" role="button" aria-label="Copia" type="button"
          >
            <FaCopy className="text-lg" title="Copia" role="button" aria-label="Copia" />
          </button>
        </div>
      </div>
      <p className="text-md text-neutral-100 text-left mt-4">Copia e manda nel gruppo di Whatsapp! Ricorda di aggiungere la classe e l&#39; ora dell&#39; ordine</p>
    </div>
  );
}

export default CopyableOrderText;