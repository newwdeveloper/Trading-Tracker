import { useLocation } from "react-router-dom";

const DetailedPage = () => {
  const location = useLocation();
  const stockDetails = location.state;
  const calculateDaysHeld = (buyDate) => {
    const currentDate = new Date();
    const buyDateObj = new Date(buyDate);
    const timeDifference = currentDate - buyDateObj; // Time difference in milliseconds
    return Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert to days
  };

  const calculateProfit = () => {
    if (stockDetails.sellPrice && stockDetails.qty) {
      const totalSellPrice = stockDetails.sellPrice * stockDetails.sellQty;
      const profit = totalSellPrice - stockDetails.buyAmt;
      return profit.toFixed(2); // Return profit/loss rounded to two decimal places
    }
    return "N/A"; // If sell price or quantity is not available, return N/A
  };
  const calculatePercantage = () => {
    if (stockDetails.sellPrice && stockDetails.qty) {
      const Numerator = stockDetails.sellPrice - stockDetails.buyPrice;
      const denominator = stockDetails.buyPrice;
      const formula = Numerator / denominator;
      const percantage = formula * 100;
      return percantage.toFixed(2);
    }
    return "N/A";
  };
  const profitClass =
    calculateProfit() < 0 ? "text-red-500 text-xl" : "text-green-500 text-xl";
  const profitPercentageClass =
    calculateProfit() < 0 ? "text-red-500 text-xl" : "text-green-500 text-xl";

  const truncketUrl = (url, maxLength) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "....";
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-6 text-center">Trade Details</h1>
      {stockDetails ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Stock Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl mb-1 py-2 font-medium bg-green-500 rounded-xl px-2">
              Buy Information
            </h2>
            <p className="mb-2">
              <strong>Stock Name:</strong>{" "}
              {stockDetails.stockName.toUpperCase()}
            </p>
            <p className="mb-2">
              <strong>Buy Date:</strong> {stockDetails.buyDate}
            </p>
            <p className="mb-2">
              <strong>Quantity:</strong> {stockDetails.qty}
            </p>
            <p className="mb-2">
              <strong>Buy Price:</strong> ₹{stockDetails.buyPrice}
            </p>
            <p className="mb-2">
              <strong>Total Buy Price:</strong> ₹{stockDetails.buyAmt}
            </p>
            <p className="mb-2">
              <strong>Reason to Buy:</strong> {stockDetails.reasonBuy}
            </p>
            <p className="mb-2">
              <strong>Link: </strong>
              <a
                href={stockDetails.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {truncketUrl(stockDetails.buyUrl, 30)}
              </a>
            </p>
          </div>

          {/* Sell Information */}
          <div className="bg-gray-100 p-4  rounded-lg shadow-md">
            <h2 className="text-xl mb-1 py-2 font-medium bg-red-500 rounded-xl px-2">
              Sell Information
            </h2>
            <p className="mb-2">
              <strong>Sell Date:</strong> {stockDetails.sellDate || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Sell Price:</strong> ₹{stockDetails.sellPrice || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Quantity Sold:</strong> {stockDetails.sellQty || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Total Sell Price:</strong> ₹
              {stockDetails.sellAmt || "N/A"}
            </p>

            <p className="mb-2">
              <strong>Reason to Sell:</strong>{" "}
              {stockDetails.reasonSell || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Link: </strong>
              <a
                href={stockDetails.sellUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {truncketUrl(stockDetails.sellUrl, 30)}
              </a>
            </p>
          </div>

          {/* Holding Period */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium bg-slate-400 py-2 rounded-xl px-1">
              Holding Period
            </h2>
            <p className="mb-2">
              <strong>Days Held:</strong>{" "}
              {stockDetails.buyDate
                ? calculateDaysHeld(stockDetails.buyDate)
                : "N/A"}{" "}
              days
            </p>
          </div>

          {/* Profit/Loss */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Profit/Loss</h2>
            <p className={profitClass}>
              <strong>{calculateProfit() > 0 ? "Profit :" : "loss :"}</strong> ₹
              {calculateProfit()}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Profit/Loss</h2>
            <p className={profitPercentageClass}>
              <strong>
                {calculatePercantage() > 0 ? "% Gain :" : "%Loss :"}
              </strong>{" "}
              {calculatePercantage()}%
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No details available.</p>
      )}
    </div>
  );
};

export default DetailedPage;
