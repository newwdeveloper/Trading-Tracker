import { useState, useEffect } from "react";

const useFormValidation = (formData) => {
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const error = {};

    // Buy-side validations
    if (!formData.buyDate) error.buyDate = "Buy date is required";
    if (!formData.stockName) error.stockName = "Stock name is required";
    if (!formData.buyPrice || parseFloat(formData.buyPrice) <= 0)
      error.buyPrice = "Buy price must be a positive number";
    if (!formData.qty || parseInt(formData.qty) <= 0)
      error.qty = "Quantity must be a positive number";
    if (!formData.buyUrl) error.buyUrl = "Submit a valid URL";
    if (!formData.reasonBuy) error.reasonBuy = "Provide a valid buying reason";

    // Sell-side validations - Only if sellDate is provided
    if (formData.sellDate) {
      if (!formData.sellQty || parseFloat(formData.sellQty) <= 0)
        error.sellQty = "Sell quantity must be a positive number";
      if (!formData.sellPrice || parseFloat(formData.sellPrice) <= 0)
        error.sellPrice = "Sell price must be a positive number";
      if (!formData.sellUrl) error.sellUrl = "Provide a valid sell URL";
      if (!formData.reasonSell)
        error.reasonSell = "Provide a valid selling reason";
    }

    setError(error);
    return error;
  };

  useEffect(() => {
    // Call validateForm whenever formData changes
    if (submitted) validateForm();
  }, [formData, submitted]); // Dependency array ensures validation is triggered when formData changes

  return {
    error,
    validateForm,
    setSubmitted,
  };
};

export default useFormValidation;
