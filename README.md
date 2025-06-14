# Npv frontend

This is a simple UI built with React to calculate the Net Present Value (NPV) for a given series of cash flows with chart.

## Prerequisites

- Download the LTS version of nodejs in https://nodejs.org/
- npm install axios
- npm install recharts
- npm install --save-dev @testing-library/react @testing-library/jest-dom jest babel-jest

## Getting Started

### Clone the repository

```bash
git clone https://github.com/ayin-source/npv-frontend.git
cd npv-frontend

### Run the UI
npm start
UI should now be running on http://localhost:3000/

### User Guide
**Calculate NPV**
Input Cash Flows. 
Click "Add Cash Flow" button to add multiple cash.

Input Lower Discount Rate.
Input Upper Discount Rate.
Input Discount Rate Increment.

Click Calculate button.

Response:
It will show results table and simple chart.


### Validation Rules
CashFlows, LowerDiscountRate, UpperDiscountRate and DiscountRateIncrement are required.
Upper discount rate must be greater than the lower discount rate.
DiscountRateIncrement should be greater than zero.

### Unit Tests
To check and run the tests, run "npm test" in command prompt/powershell.
