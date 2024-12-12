import { useDispatch, useSelector } from "react-redux";
import { editInput, deleteInput, addInput } from "./formSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("");

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
  return (
    <div className="w-full sm:w-full md:w-3/12 border-slate-950 bg-slate-300 p-4">
      <div className="font-bold text-lg mb-4">Your Trade Logs</div>
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
        ) : (
          filteredData.map((set, index) => (
            <li key={index} className="border-b p-2">
              <button className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex justify-between items-center">
                <span className="text-xl md:text-xs">{set.stockName}</span>
                <span className="text-sm md:text-xs text-gray-200">
                  {set.buyDate}
                </span>
                <span
                  onClick={() => handleEdit(index)} // Pass the index here
                  className="cursor-pointer bg-black p-2 rounded-xl md:p-1 md:text-xs hover:bg-slate-500"
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
                  className="cursor-pointer md:text-xs md:px-1 bg-red-600 p-1 px-4 rounded-xl hover:bg-red-400"
                >
                  X
                </span>
              </button>

              {/* Render Edit Form Below Selected Trade, Only if the current trade is being edited */}
              {editingIndex === index && (
                <div className="mt-4  w-full">
                  <form onSubmit={handleSubmit} className="space-y-3 w-full">
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
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="date"
                          name="buyDate"
                          value={editFormData.buyDate}
                          onChange={handleChange}
                          placeholder="Buy Date"
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          name="buyPrice"
                          value={editFormData.buyPrice}
                          onChange={handleChange}
                          placeholder="Buy Price"
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          name="qty"
                          value={editFormData.qty}
                          onChange={handleChange}
                          placeholder="Quantity"
                          className="w-full p-2 border rounded"
                        />
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
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="text"
                          name="buyUrl"
                          value={editFormData.buyUrl}
                          onChange={handleChange}
                          placeholder="Reference URL for Buy"
                          className="w-full p-2 border rounded"
                        />
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
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="number"
                          name="sellQty"
                          value={editFormData.sellQty}
                          onChange={handleChange}
                          placeholder="Sell Quantity"
                          className="w-full p-2 border rounded"
                        />
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
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="text"
                          name="sellUrl"
                          value={editFormData.sellUrl}
                          onChange={handleChange}
                          placeholder="Reference URL for Sell"
                          className="w-full p-2 border rounded"
                        />
                        <button
                          type="submit"
                          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                          {editingIndex !== null ? "Update Trade" : "Add Trade"}
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
  );
};

export default SideBar;
