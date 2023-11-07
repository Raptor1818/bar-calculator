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
    <div className="my-2 w-full md:w-fit max-w-3xl">
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="relative">
          <span className={`text-neutral-200 bg-neutral-900 z-10 border-[1px] border-neutral-600 rounded-md p-1 m-2 copied-span ${copied ? "visible" : ""}`}>Copiato!</span>
        </div>
      </div>
      <div className="flex flex-row justify-between border-solid border-[1px] shadow-md shadow-black border-neutral-400 rounded-md bg-black font-roboto-mono">
        <div className="w-full p-4 overflow-scroll md:overflow-auto">
          <pre>{getOrderText()}</pre>
        </div>
        <div className="w-fit h-fit px-1 py-2 flex flex-col justify-center items-center gap-1 select-none border-solid border-l-[1px] border-b-[1px] rounded-bl-md border-neutral-400 z-10">
          <button
            className="bg-transparent text-white font-semibold px-2 py-1 shadow-md"
            onClick={copyToClipboard}
            title="Copia"
            id="button"
            name="button"
            role="button"
            aria-label="Copia"
            type="button"
          >
            <FaCopy className="text-lg" title="Copia" role="button" aria-label="Copia" />
          </button>
          <label htmlFor="button" id="button" className="text-xs">Copia</label>
        </div>
      </div>
      {/* info */}
      <div className="px-[0.3rem] mt-2">
        <p className="text-md text-neutral-100 text-left py-1">
          Prima di inviare   nel gruppo Whatsapp, Ricorda di aggiungere: 
        </p>
        <ol className="list-disc pl-6 py-0 m-0">
          <li className="list-item">La tua <span className="font-bold">classe</span></li>
          <li className="list-item">L&#39; ora dell&#39; <span className="font-bold">ordine</span></li>
        </ol>
      </div>
    </div>
  );
}

export default CopyableOrderText;