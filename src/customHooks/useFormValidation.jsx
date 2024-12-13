import { useState } from "react";

const useFormValidation = (formData) => {
  const [error, setError] = useState({});

  const validateForm = () => {
    const error = {};
    if (!formData.buyDate) error.buyDate = "Buy date is require";
    if (!formData.stockName) error.stockName = "Stock name require";
    if (!formData.buyPrice || parseFloat(formData.buyPrice) <= 0)
      error.buyPrice = "Buy Price must be positive number";
    if (!formData.qty || parseInt(formData.qty) <= 0)
      error.qty = "Quantity must be a positive number";
    if (!formData.buyUrl) error.buyUrl = "submit the valid URL";
    if (!formData.reasonBuy) error.reasonBuy = "give valid buying reason";
    //only shows error when sell date provided
    if (
      formData.sellDate && // Ensure sellDate is provided
      (formData.sellQty === "" || parseFloat(formData.sellQty.trim()) <= 0) // Handle edge cases
    ) {
      error.sellQty = "Sell Quantity should be positive";
    }
    if (
      formData.sellDate &&
      (formData.sellQty === "" || parseFloat(formData.sellQty.trim()) <= 0) // Fix: Compare sellQty with qty
    ) {
      error.sellQty = "Sell Quantity should be positive";
    }

    if (formData.sellDate && !formData.sellUrl) {
      error.sellUrl = "Sell URL missing";
    }
    if (formData.sellDate && !formData.reasonSell) {
      error.reasonSell = "Provide selling reason";
    }

    setError(error);
    return error;
  };

  return {
    error,
    validateForm,
  };
};

export default useFormValidation;
