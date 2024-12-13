import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const YearlyTrades = () => {
  const formData = useSelector((store) => store.input.input);
  const navigate = useNavigate();

  // State to manage expanded year and month
  const [expandedYear, setExpandedYear] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);

  // Function to group trades by year and month
  const groupTradesByYearAndMonth = () => {
    if (!Array.isArray(formData)) return {};

    const groupedData = {};

    formData.forEach((trade) => {
      const date = new Date(trade.buyDate);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!groupedData[year]) {
        groupedData[year] = {};
      }
      if (!groupedData[year][month]) {
        groupedData[year][month] = [];
      }
      groupedData[year][month].push(trade);
    });

    return groupedData;
  };

  // Memoize the grouped data for performance
  const groupedData = useMemo(groupTradesByYearAndMonth, [formData]);

  // Toggle for year
  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
    setExpandedMonth(null); // Reset month when year is toggled
  };

  // Toggle for month within a year
  const toggleMonth = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  // Get all the years available in the data
  const years = Object.keys(groupedData);

  return (
    <div>
      <div className="text-2xl font-bold p-3 text-center">
        YEARLY TRADE LIST
      </div>

      {/* Render Year Buttons */}
      {years.map((year) => (
        <div key={year}>
          <div
            onClick={() => toggleYear(year)}
            className={`p-2 rounded cursor-pointer flex justify-between items-center ${
              expandedYear === year
                ? "bg-amber-300 text-black hover:bg-amber-600"
                : "bg-slate-400 text-white hover:bg-slate-600"
            }`}
          >
            <span>{year}</span>
            <span>{expandedYear === year ? "▲" : "▼"}</span>
          </div>

          {/* Render Months for the Expanded Year */}
          {expandedYear === year && (
            <div className="mt-2">
              {Object.keys(groupedData[year]).map((month) => (
                <div key={month}>
                  <div
                    onClick={() => toggleMonth(month)}
                    className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                      expandedMonth === month
                        ? "bg-amber-200 text-black hover:bg-amber-400"
                        : "bg-slate-300 text-black hover:bg-slate-500"
                    }`}
                  >
                    <span>{month}</span>
                    <span>{expandedMonth === month ? "▲" : "▼"}</span>
                  </div>

                  {/* Render Trades for the Expanded Month */}
                  {expandedMonth === month && (
                    <ul className="mt-2 space-y-2">
                      {/* Render trades for the current month if available */}
                      {groupedData[year][month]?.map((trade, index) => (
                        <li
                          key={index}
                          className="border-b p-2 flex justify-between items-center"
                        >
                          <span className="text-black">{trade.stockName}</span>
                          <span className="text-sm text-gray-500">
                            {trade.buyDate}
                          </span>
                          <button
                            onClick={() =>
                              navigate("/DetailedInfo", { state: trade })
                            }
                            className="text-blue-500 hover:underline"
                          >
                            Details
                          </button>
                        </li>
                      ))}
                      {/* If no trades for this month */}
                      {(!groupedData[year][month] ||
                        groupedData[year][month].length === 0) && (
                        <li className="text-center text-3xl text-gray-500">
                          No trades for this month
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default YearlyTrades;
