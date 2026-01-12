import React, { useState, useEffect } from "react";
import "./IDOR_Lab2.css";
import GoBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

const IDOR_Lab2 = () => {
  const hintMessage = `
      <style>
        .info-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .info-container h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 10px;
        }
        .info-container p {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
        }
        .highlight {
            font-weight: bold;
            color: #0066cc;
        }
    </style>
      <div class="info-container">
          <h2>Ticket Purchase Information</h2>
          <p>The purchase price for 1 ticket is $10, but we can manipulate this price using <span class="highlight">Burpsuite</span>.</p>
      </div>
  `;
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const ticketPrice = 10;
  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const response = await fetch(
          "https://digitopia-project-backend.vercel.app/api/IDORSlab2"
        );
        if (response.ok) {
          const data = await response.json();
          setAccountBalance(data.balance);
          console.log("Fetched account balance:", data);
        } else {
          setMessage("Failed to fetch account balance.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching the account balance.");
      }
    };

    fetchAccountBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numOfTickets = Number(amount);

    if (numOfTickets <= 0) {
      setMessage("The number of tickets must be greater than 0.");
      return;
    }

    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/IDORSlab2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketPrice, numOfTickets }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAccountBalance(result.balance);
        setMessage(result.message);
        console.log("API Response after purchase:", result);
      } else {
        setMessage("Failed to process the purchase. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "var(--primary-bg)", minHeight: "100vh" }}>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="idor-wrapper2">
        <div className="unique-ticket-container">
          <div className="unique-ticket-header">
            <h1>Buy Tickets</h1>
            <p>Price per ticket: ${ticketPrice}</p>
            <p>Amount of money in your account: ${accountBalance}</p>
          </div>

          {message && (
            <div
              className={`unique-ticket-alert ${
                message.startsWith("Tickets booked successfully")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="unique-ticket-form">
            <label htmlFor="amount" className="unique-ticket-label">
              Number of Tickets
            </label>
            <input
              type="number"
              id="amount"
              className="unique-ticket-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter ticket amount"
              min="0"
              required
            />
            <button type="submit" className="unique-ticket-btn">
              Buy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IDOR_Lab2;
