import "./BurpSuitLab1.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GoBack from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function MoneyTransferLab() {
  const hintMessage = `
      <div class="info-box">
          <p>Open <span class="highlight-text">Burp Suite</span> and intercept any order. We can manipulate the sender, receiver, and the amount of money transferred.</p>
      </div>
  `;

  const [account, setAccount] = useState({ name: "", balance: 0 });
  const [users, setUsers] = useState([]);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const userId = 1;
  const apiUrl = "https://digitopia-project-backend.vercel.app/api";

  useEffect(() => {
    // PATCH request to update accounts
    axios
      .patch(`${apiUrl}/accounts`, { updated: true })
      .then(() => console.log("PATCH request successful"))
      .catch((error) =>
        console.error("Failed to execute PATCH request:", error)
      );
    axios
      .get(`${apiUrl}/account/${userId}`)
      .then((response) => setAccount(response.data.account))
      .catch((error) => console.error("Failed to fetch account:", error));

    // Fetch all accounts
    axios
      .get(`${apiUrl}/accounts`)
      .then((response) => setUsers(response.data.money))
      .catch((error) => console.error("Failed to fetch accounts:", error));
  }, [userId]);

  const handleTransfer = (e) => {
    e.preventDefault();

    axios
      .post(
        `${apiUrl}/transfer`,
        {
          transferAmount,
          recipientId,
          userId,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setMessage(response.data.message);
        setTransferAmount("");
        setRecipientId("");

        // Refresh account and user data
        axios
          .get(`${apiUrl}/account/${userId}`)
          .then((response) => setAccount(response.data.account));

        axios
          .get(`${apiUrl}/accounts`)
          .then((response) => setUsers(response.data.money));
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Transfer failed";
        setMessage(errorMsg);
        console.error("Transfer error:", error);
      });
  };

  return (
    <>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="color-page-bg">
        <div className="transfer-container">
          <h1 className="transfer-title">Secure Money Transfer</h1>
          <p className="transfer-subtitle">Send money safely and instantly.</p>

          <div className="transfer-details">
            <h2>What is a Bank Transfer?</h2>
            <p>
              A bank transfer is the direct transfer of funds between accounts.
              This can be between UK banks or internationally.
            </p>

            <h2>How Does Payment via Bank Transfer Work?</h2>
            <ul className="transfer-steps">
              <li>The customer selects bank transfer at checkout.</li>
              <li>The business provides bank details and a reference code.</li>
              <li>The customer instructs their bank to transfer funds.</li>
              <li>The funds move from the customer’s bank to the business.</li>
              <li>The business receives and confirms the payment.</li>
            </ul>
          </div>

          <div className="account-card">
            <h3>Account Holder: {account.name}</h3>
            <p>💳 Balance: {account.balance} $</p>
          </div>

          {message && (
            <div
              className={`message-box-money ${
                message.includes("success") ? "success-msg" : "error-msg"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleTransfer} className="transfer-form">
            <label>Transfer Amount</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
            />

            <label>Recipient ID</label>
            <input
              type="number"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              required
            />

            <button type="submit" className="transfer-btn">
              Send Money
            </button>
          </form>

          <h2 className="users-heading">Available Users</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.balance} $</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="securitys-section">
            <h2>Are Bank Transfers Safe?</h2>
            <p>
              A bank transfer itself is safe. Bank transfers are manually
              initiated and directly processed between banks, minimizing fraud
              risks.
            </p>

            <h3>Key Risks of Bank Transfers</h3>
            <h4>Vulnerability to Human Error</h4>
            <p>
              Entering incorrect recipient details can be difficult or even
              impossible to reverse.
            </p>

            <h4> Lack of Consumer Protection</h4>
            <p>
              Unlike Direct Debits, bank transfers lack consumer protections,
              making fraud prevention crucial.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
