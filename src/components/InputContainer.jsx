import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInput } from "./formSlice";
import { useNavigate } from "react-router-dom";

const InputContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    buyDate: "",
    stockName: "",
    buyPrice: "",
    qty: "",
    buyAmt: 0,
    buyUrl: "",
    reasonBuy: "",
    sellDate: "",
    sellPrice: "",
    sellQty: "",
    sellAmt: "",
    sellUrl: "",
    reasonSell: "",
  });

  const calculateBuyAmt = (buyPrice, qty) => {
    const amount = (parseFloat(buyPrice) || 0) * (parseFloat(qty) || 0);
    return amount.toFixed(2);
  };

  const calculateSellAmt = (sellPrice, sellQty) => {
    const sellAmount =
      (parseFloat(sellPrice) || 0) * (parseFloat(sellQty) || 0);
    return sellAmount.toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevInput) => {
      const updatedFormInput = {
        ...prevInput,
        [name]: name === "stockName" ? value.toUpperCase() : value,
      };

      if (name === "buyPrice" || name === "qty") {
        const updatedBuyAmt = calculateBuyAmt(
          updatedFormInput.buyPrice,
          updatedFormInput.qty
        );
        updatedFormInput.buyAmt = updatedBuyAmt;
      }
      if (name === "sellPrice" || name === "sellQty") {
        const updatedSellAmt = calculateSellAmt(
          updatedFormInput.sellPrice,
          updatedFormInput.sellQty
        );
        updatedFormInput.sellAmt = updatedSellAmt;
      }

      return updatedFormInput;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInput(formInput));
    setFormInput({
      buyDate: "",
      stockName: "",
      buyPrice: "",
      qty: "",
      buyAmt: "",
      buyUrl: "",
      reasonBuy: "",
      sellDate: "",
      sellPrice: "",
      sellQty: "",
      sellUrl: "",
      reasonSell: "",
    });
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Buy Date
            </label>
            <input
              type="date"
              name="buyDate"
              value={formInput.buyDate}
              onChange={handleChange}
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Stock Name
            </label>
            <input
              type="text"
              name="stockName"
              value={formInput.stockName}
              onChange={handleChange}
              placeholder="Enter Stock Name"
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Buy Price</label>
              <input
                type="number"
                name="buyPrice"
                value={formInput.buyPrice}
                onChange={handleChange}
                className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Quantity</label>
              <input
                type="number"
                name="qty"
                value={formInput.qty}
                onChange={handleChange}
                className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Buy Amount</label>
              <input
                type="number"
                name="buyAmt"
                value={formInput.buyAmt}
                readOnly
                className="p-3 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">Buy URL</label>
            <input
              type="URL"
              name="buyUrl"
              value={formInput.buyUrl}
              onChange={handleChange}
              placeholder="Enter Buy URL"
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Reason to Buy
            </label>
            <textarea
              name="reasonBuy"
              value={formInput.reasonBuy}
              onChange={handleChange}
              placeholder="Reason for Buy"
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Sell Date
            </label>
            <input
              type="date"
              name="sellDate"
              value={formInput.sellDate}
              onChange={handleChange}
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Sell Price</label>
              <input
                type="number"
                name="sellPrice"
                value={formInput.sellPrice}
                onChange={handleChange}
                className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Quantity</label>
              <input
                type="number"
                name="sellQty"
                value={formInput.sellQty}
                onChange={handleChange}
                className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Sell Amount</label>
              <input
                type="number"
                name="sellAmt"
                value={formInput.sellAmt}
                readOnly
                className="p-3 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Sell URL
            </label>
            <input
              type="URL"
              name="sellUrl"
              value={formInput.sellUrl}
              onChange={handleChange}
              placeholder="Enter Sell URL"
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b-2">
            <label className="w-1/3 font-semibold text-gray-700">
              Reason to Sell
            </label>
            <textarea
              name="reasonSell"
              value={formInput.reasonSell}
              onChange={handleChange}
              placeholder="Reason for Sell"
              className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InputContainer;
