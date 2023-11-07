/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";

function CopyableOrderText({ order }) {
  const [copied, setCopied] = useState(false);
  const getOrderText = () => {
    return order.map((item) => `x${item.quantity} ${item.name}`).join(",\n");
  };

  const copyToClipboard = () => {
    const orderText = getOrderText();
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    let timeoutId;
    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [copied]);  

  return (
    <div className="my-4 w-full max-w-3xl">
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="relative">
          <span className={`text-neutral-200 bg-neutral-900 z-10 border-[1px] border-neutral-600 rounded-md p-1 m-2 copied-span ${copied ? "visible" : ""}`}>Copiato!</span>
        </div>
      </div>
      <div className="flex flex-row justify-between border-solid border-[1px] shadow-md shadow-black border-neutral-400 rounded-md bg-black font-roboto-mono">
        <div className="w-full p-4 overflow-scroll">
          <pre>{getOrderText()}</pre>
        </div>
        <div className="w-fit h-fit px-1 py-2 select-none border-solid border-l-[1px] border-b-[1px] rounded-bl-md border-neutral-400 z-10">
          <button
            className="bg-transparent text-white font-semibold px-2 py-1 shadow-md"
            onClick={copyToClipboard}
            title="Copia"
            role="button"
            aria-label="Copia"
            type="button"
          >
            <FaCopy className="text-lg" title="Copia" role="button" aria-label="Copia" />
          </button>
        </div>
      </div>
      <p className="text-md text-neutral-100 text-center mt-4">
        Copia e manda nel gruppo di Whatsapp! Ricorda di aggiungere la classe e l&#39; ora dell&#39; ordine
      </p>
    </div>
  );
}

export default CopyableOrderText;

//TODO: Fixare il fatto che i tramezzini con i nomi lunghi fanno overflow