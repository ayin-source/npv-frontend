import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [cashFlows, setCashFlows] = useState([""]);
  const [lowerRate, setLowerRate] = useState(1);
  const [upperRate, setUpperRate] = useState(15);
  const [increment, setIncrement] = useState(0.25);
  const [results, setResults] = useState([]);

  const handleCashFlowChange = (index, value) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const addCashFlow = () => setCashFlows([...cashFlows, ""]);

  const calculateNPV = async () => {
    try {
      const response = await axios.post("/api/npv/calculate", {
        cashFlows: cashFlows.map(Number),
        lowerDiscountRate: parseFloat(lowerRate),
        upperDiscountRate: parseFloat(upperRate),
        discountRateIncrement: parseFloat(increment),
      });
      setResults(response.data);
    } catch (err) {
      console.error("Error calculating NPV:", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">NPV Calculator</h1>

      <div>
        {cashFlows.map((value, index) => (
        <label key={index} className="block mb-1">
          {index === 0 ? "Cash Flows:" : null}
        <input
          type="number"
          value={value}
          onChange={(e) => handleCashFlowChange(index, e.target.value)}
        />
        </label>
        ))}
        <button onClick={addCashFlow}>Add Cash Flow</button>
      </div>

      <div>
        <label>Lower Discount Rate (%):</label>
        <input
          type="number"
          value={lowerRate}
          onChange={(e) => setLowerRate(e.target.value)}
        />
      </div>

      <div>
        <label>Upper Discount Rate (%):</label>
        <input
          type="number"
          value={upperRate}
          onChange={(e) => setUpperRate(e.target.value)}
        />
      </div>

      <div>
        <label>Discount Rate Increment (%):</label>
        <input
          type="number"
          value={increment}
          onChange={(e) => setIncrement(e.target.value)}
        />
      </div>

      <button onClick={calculateNPV}>Calculate</button>

      {results.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6">Results Table</h2>
          <table>
            <thead>
              <tr>
                <th>Rate (%)</th>
                <th>NPV</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.rate.toFixed(2)}</td>
                  <td>{r.npv.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-lg font-semibold mt-6">NPV Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rate" label={{ value: "Rate (%)", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "NPV", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="npv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default App;
