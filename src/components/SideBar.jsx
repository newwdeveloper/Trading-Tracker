import { useDispatch, useSelector } from "react-redux";
import { editInput, deleteInput, addInput } from "./formSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../customHooks/useFormValidation";
import redDot from "../assets/redDot.png";
import hamburger from "../assets/hamberger.png";

const SideBar = () => {
  const formData = useSelector((store) => store.input.input);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (index) => {
    dispatch(deleteInput(index));
  };

  const [editFormData, setEditFormData] = useState({
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

  const { error, validateForm, setSubmitted } = useFormValidation(editFormData);

  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("");
  const [isSidebarVisible, setIsSideBarVisible] = useState(true);

  // Handle the change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: name === "stockName" ? value.toUpperCase() : value,
      };

      // Update buyAmt when buyPrice or qty changes
      if (name === "buyPrice" || name === "qty") {
        const buyAmt =
          (parseFloat(updatedFormData.buyPrice) || 0) *
          (parseFloat(updatedFormData.qty) || 0);
        updatedFormData.buyAmt = buyAmt.toFixed(2);
      }

      // Update sellAmt when sellPrice or sellQty changes
      if (name === "sellPrice" || name === "sellQty") {
        const sellAmt =
          (parseFloat(updatedFormData.sellPrice) || 0) *
          (parseFloat(updatedFormData.sellQty) || 0);
        updatedFormData.sellAmt = sellAmt.toFixed(2);
      }

      return updatedFormData;
    });
  };

  // Handle the Edit button click to toggle form visibility
  const handleEdit = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null); // If the same trade is clicked again, hide the form
    } else {
      setEditingIndex(index); // Set the index of the trade being edited
      setEditFormData(formData[index]); // Pre-fill the form with the selected trade data
    }
  };

  // Handle the form submission (updating the trade data)
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationError = validateForm();
    if (Object.keys(validationError).length > 0) {
      return;
    }
    if (editingIndex !== null) {
      dispatch(editInput({ index: editingIndex, updatedData: editFormData }));
      setEditingIndex(null); // Clear the edit mode after submission
    } else {
      dispatch(addInput(editFormData)); // Add a new trade entry
    }
    // Reset form data after submit
    setEditFormData({
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
  };

  const handleDetails = (stock) => {
    navigate("/DetailedInfo", { state: stock });
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filteredData = formData.filter((set) =>
    set.stockName.toLowerCase().includes(filter.toLowerCase())
  );
  const trunketUrl = (stockName, maxLength) => {
    if (!stockName) return ""; // Handle undefined or empty values
    return stockName.length > maxLength
      ? stockName.substring(0, maxLength) + "..."
      : stockName;
  };
  const toggleSidebar = () => {
    setIsSideBarVisible((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="w-10 h-10 absolute top-20 left-1 z-50 p-2 bg-slate-300 text-white rounded-lg hover:bg-gray-700"
      >
        <img src={hamburger} alt="slidder toggle" />
      </button>
      {isSidebarVisible && (
        <div className="w-full  sm:w-full md:w-4/12 border-slate-950 bg-slate-300 p-4 h-screen rounded-xl">
          <div className="font-bold text-lg mb-4 mt-10">Your Trade Logs</div>

          <button
            onClick={() => navigate("/MonthlyTrades")}
            className="font-bold text-lg mb-4 border-2 p-2 rounded-xl text-center hover:bg-slate-400 text-white bg-slate-700"
          >
            Trading History
          </button>

          <input
            type="search"
            placeholder="filter by stock name"
            value={filter}
            onChange={handleFilter}
            className="w-full p-2 mb-4 border rounded"
          />
          <ul className="space-y-3">
            {formData.length === 0 ? (
              <p className="text-gray-500">No Trade Added</p>
            ) : filteredData.length === 0 ? (
              <p className="text-gray-500">No Search Found</p>
            ) : (
              filteredData.map((set, index) => (
                <li key={index} className="border-b p-2">
                  <button className="w-full text-left p-2 flex-wrap bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {!set.sellDate && (
                        <span className="text-xl md:text-xs">
                          <img
                            className="w-4 h-4 object-cover"
                            src={redDot}
                            alt="signal"
                          />
                        </span>
                      )}

                      <span className="text-xl md:text-lg">
                        {trunketUrl(set.stockName, 9)}
                      </span>

                      <span className="text-sm md:text-xs text-gray-200">
                        {set.buyDate}
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <span
                        onClick={() => handleEdit(index)} // Pass the index here
                        className="cursor-pointer bg-black p-2 rounded-xl md:p-1 md:text-xs  hover:bg-slate-500"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDetails(set)}
                        className="cursor-pointer md:text-xs md:px-1 bg-amber-400 p-1 px-4 rounded-xl hover:bg-red-400"
                      >
                        info
                      </span>
                      <span
                        onClick={() => {
                          handleDelete(index);
                        }}
                        className="cursor-pointer md:text-sm md:px-1 md:w-6 md:h-6 md:rounded-full md:text-center bg-red-600 p-1 w-8 text-center h-8 rounded-xl flex justify-center items-center  hover:bg-red-400"
                      >
                        X
                      </span>
                    </div>
                  </button>

                  {/* Render Edit Form Below Selected Trade, Only if the current trade is being edited */}
                  {editingIndex === index && (
                    <div className="mt-4  w-full">
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3 w-full"
                      >
                        <div
                          className="flex flex-col overflow-y-auto gap-4"
                          style={{ maxHeight: "300px" }}
                        >
                          <div className="w-full">
                            <input
                              type="text"
                              name="stockName"
                              value={editFormData.stockName}
                              onChange={handleChange}
                              placeholder="Stock Name"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.stockName ? "border-red-500" : ""
                              }`}
                            />
                            {error.stockName && (
                              <p className="text-red-500 text-sm px-2">
                                {error.stockName}
                              </p>
                            )}
                            <input
                              type="date"
                              name="buyDate"
                              value={editFormData.buyDate}
                              onChange={handleChange}
                              placeholder="Buy Date"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.buyDate ? "border-red-500" : ""
                              }`}
                            />
                            {error.buyDate && (
                              <p className="text-red-500 text-sm px-2">
                                {error.buyDate}
                              </p>
                            )}
                            <input
                              type="number"
                              name="buyPrice"
                              value={editFormData.buyPrice}
                              onChange={handleChange}
                              placeholder="Buy Price"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.buyPrice ? "border-red-500" : ""
                              }`}
                            />
                            {error.buyPrice && (
                              <p className="text-red-500 text-sm px-2">
                                {error.buyPrice}
                              </p>
                            )}
                            <input
                              type="number"
                              name="qty"
                              value={editFormData.qty}
                              onChange={handleChange}
                              placeholder="Quantity"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.qty ? "border-red-500" : ""
                              }`}
                            />
                            {error.qty && (
                              <p className="text-red-500 text-sm px-2">
                                {error.qty}
                              </p>
                            )}
                            <input
                              type="number"
                              name="buyAmt"
                              value={editFormData.buyAmt}
                              onChange={handleChange}
                              placeholder="Buy Amount"
                              className="w-full p-2 border rounded"
                            />
                            <input
                              type="text"
                              name="reasonBuy"
                              value={editFormData.reasonBuy}
                              onChange={handleChange}
                              placeholder="Reason to Buy"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.reasonBuy ? "border-red-500" : ""
                              }`}
                            />
                            {error.reasonBuy && (
                              <p className="text-red-500 text-sm px-2">
                                {error.reasonBuy}
                              </p>
                            )}
                            <input
                              type="text"
                              name="buyUrl"
                              value={editFormData.buyUrl}
                              onChange={handleChange}
                              placeholder="Reference URL for Buy"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.buyUrl ? "border-red-500" : ""
                              }`}
                            />
                            {error.buyUrl && (
                              <p className="text-red-500 text-sm px-2">
                                {error.buyUrl}
                              </p>
                            )}
                          </div>

                          <div className="w-full">
                            <input
                              type="date"
                              name="sellDate"
                              value={editFormData.sellDate}
                              onChange={handleChange}
                              placeholder="Sell Date"
                              className="w-full p-2 border rounded"
                            />
                            <input
                              type="number"
                              name="sellPrice"
                              value={editFormData.sellPrice}
                              onChange={handleChange}
                              placeholder="Sell Price"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.sellPrice ? "border-red-500" : ""
                              }`}
                            />
                            {error.sellPrice && (
                              <p className="text-red-500 text-sm px-2">
                                {error.sellPrice}
                              </p>
                            )}
                            <input
                              type="number"
                              name="sellQty"
                              value={editFormData.sellQty}
                              onChange={handleChange}
                              placeholder="Sell Quantity"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.sellQty ? "border-red-500" : ""
                              }`}
                            />
                            {error.sellQty && (
                              <p className="text-red-500 text-sm px-2">
                                {error.sellQty}
                              </p>
                            )}
                            <input
                              type="number"
                              name="sellAmt"
                              value={editFormData.sellAmt}
                              onChange={handleChange}
                              placeholder="Sell Amount"
                              className="w-full p-2 border rounded"
                            />
                            <input
                              type="text"
                              name="reasonSell"
                              value={editFormData.reasonSell}
                              onChange={handleChange}
                              placeholder="Reason to Sell"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.reasonSell ? "border-red-500" : ""
                              }`}
                            />
                            {error.reasonSell && (
                              <p className="text-red-500 text-sm px-2">
                                {error.reasonSell}
                              </p>
                            )}
                            <input
                              type="text"
                              name="sellUrl"
                              value={editFormData.sellUrl}
                              onChange={handleChange}
                              placeholder="Reference URL for Sell"
                              className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                                error.sellUrl ? "border-red-500" : ""
                              }`}
                            />
                            {error.sellUrl && (
                              <p className="text-red-500 text-sm px-2">
                                {error.sellUrl}
                              </p>
                            )}
                            <button
                              type="submit"
                              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                              {editingIndex !== null
                                ? "Update Trade"
                                : "Add Trade"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBar;
