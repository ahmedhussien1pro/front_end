import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IDOR_Lab3.css";
import GoBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function IDORLabComponent() {
  const hintMessage = `
      <div class="info-container">
          <p>Open <span class="highlight">Burp Suite</span> and intercept any order. We can manipulate the sender, receiver, and the amount of money transferred.</p>
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
      <div className="idor-lab3-center">
        <div className="idorlab-container">
          <div className="idorlab-header">
            <h1>Money Transfer</h1>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setTransferAmount("");
                setRecipientId("");
                setMessage("");
              }}
            >
              Reset
            </button>
          </div>

          <div className="idorlab-account-info">
            <div className="card-transfer">
              <div className="card-header-transfer">
                Account Name: <b>{account.name}</b> <br />
                Balance: <b>{account.balance} $</b>
              </div>
            </div>
          </div>

          {message && (
            <div
              className={`alert ${
                message.includes("success") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleTransfer} className="idorlab-transfer-form">
            <div className="form-group-lab3">
              <label className="transferAmount" htmlFor="transfer_amount">
                Transfer Amount:
              </label>
              <input
                className="idor-number"
                type="number"
                id="transfer_amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />

              <label className="transferAmount" htmlFor="recipient_id">
                Recipient ID:
              </label>
              <input
                className="idor-number"
                type="number"
                id="recipient_id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="Idor-button">
              Transfer
            </button>
          </form>

          <table className=" table-style-bg">
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
        </div>
      </div>
    </>
  );
}
