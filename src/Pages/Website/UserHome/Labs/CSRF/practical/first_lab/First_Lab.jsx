import { useState, useEffect } from "react";
import { FaUser, FaMoneyBillWave, FaLock } from "react-icons/fa";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function CSRF_FIRST_LAB() {
  const [account, setAccount] = useState(null);
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");
  const [setUpdatedId] = useState(null);

  const fetchAccount = async (id = null) => {
    try {
      const url = id
        ? `https://digitopia-project-backend.vercel.app/api/account/${id}`
        : "https://digitopia-project-backend.vercel.app/api/account";
      const res = await fetch(url);
      const data = await res.json();

      if (data.account) {
        setAccount(data.account);
      } else {
        setAccount(null);
      }
    } catch (error) {
      console.error("Error fetching account:", error);
      setAccount(null);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const updatePassword = async () => {
    if (!account) return;

    try {
      const response = await fetch(
        "https://digitopia-project-backend.vercel.app/api/update-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: account.id, newPass }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Password Updated Successfully");

        if (result.account) {
          setUpdatedId(result.account.id);
          setAccount(result.account);
        }
      } else {
        setMessage("Error updating password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password");
    }
  };

  return (
    <>
      <ThemeSwitcher />
      <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center primary-bg primary-text">
        <div class="card shadow-lg rounded border-0 p-4 secondary-bg primary-text col-lg-8 col-md-10 col-sm-12">
          <h2 class="text-center mb-4">Account Information</h2>

          {message && (
            <div
              className={`alert ${
                message === "Password Updated Successfully"
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          {account ? (
            <div class="mb-4">
              <h3 class="main-color mb-3">Account Details</h3>
              <div class="d-flex align-items-center mb-3">
                <FaUser class="main-color me-2" />
                <p class="mb-0">
                  <strong>Account No:</strong> {account.accountNo}
                </p>
              </div>
              <div class="d-flex align-items-center mb-3">
                <FaMoneyBillWave class="main-color me-2" />
                <p class="mb-0">
                  <strong>Balance:</strong> ${account.accountBalance}
                </p>
              </div>
              <div class="d-flex align-items-center mb-4">
                <FaUser class="main-color me-2" />
                <p class="mb-0">
                  <strong>Name:</strong> {account.accountName}
                </p>
              </div>

              <h4 class="main-color mb-3">Update Password</h4>
              <div class="d-flex">
                <input
                  type="password"
                  class="form-control rounded-pill me-2 px-3 focus-bg-transparent"
                  placeholder="Enter new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button
                  class="btn go-to p-3 my-0 w-25"
                  onClick={updatePassword}
                >
                  <FaLock /> Update Password
                </button>
              </div>
            </div>
          ) : (
            <p class="text-danger text-center">No account found.</p>
          )}
        </div>
      </div>
    </>
  );
}
