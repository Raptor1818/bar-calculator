import React from "react";

function CopyableOrderText({ order }) {
  const getOrderText = () => { //crea il testo dell'ordine
    return order
      .map((item, index) => `x${item.quantity} ${item.name}`)
      .join(",\n");
  };

  const copyToClipboard = () => {
    const orderText = getOrderText();
    navigator.clipboard.writeText(orderText);
  };

  return ( //TODO: stile da modificare come il code wrapper di discord
    <div className="my-4">
      <button
        className="bg-gradient-to-br from-amber-700 to-yellow-400 text-white font-semibold px-4 py-2 rounded-md shadow-md mt-2"
        onClick={copyToClipboard}
      >
        Copia
      </button>
      <div className="border-solid border-[1px] border-white rounded-md p-4 mt-2">
        <pre>{getOrderText()}</pre>
      </div>
      <p className="text-md text-center">Copia e manda nel gruppo di Whatsapp! Ricorda di aggiungere la classe e l'ora dell'ordine</p>
    </div>
  );
}

export default CopyableOrderText;
