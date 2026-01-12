import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../../Website/Preloader/Preloader";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        "https://digitopia-project-backend.vercel.app/api/user/add",
        {
          name: name,
          email: email,
          password: password,
          role: role,
        }
      );
      navigate("/dashboard/users");
    } catch (error) {
      setLoading(false);
      setError("Error submitting the form. Please try again.");
      console.error("Error submitting form:", error);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container my-5">
      {loading && <Preloader loading={loading} />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form
        className="p-4 border rounded shadow-sm"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "var(--primary-bg)",
          color: "var(--primary-text)",
        }}
      >
        <h2 className="mb-4">Edit User</h2>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label
            style={{
              backgroundColor: "var(--primary-bg)",
              color: "var(--primary-text)",
            }}
          >
            User Name
          </Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
            style={{
              backgroundColor: "var(--inputColor)",
              color: "var(--primary-text)",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label
            style={{
              backgroundColor: "var(--primary-bg)",
              color: "var(--primary-text)",
            }}
          >
            Email
          </Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            style={{
              backgroundColor: "var(--inputColor)",
              color: "var(--primary-text)",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label
            style={{
              backgroundColor: "var(--primary-bg)",
              color: "var(--primary-text)",
            }}
          >
            Password
          </Form.Label>
          <Form.Control
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password..."
            style={{
              backgroundColor: "var(--inputColor)",
              color: "var(--primary-text)",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label
            style={{
              backgroundColor: "var(--primary-bg)",
              color: "var(--primary-text)",
            }}
          >
            Role
          </Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              backgroundColor: "var(--primary-bg)",
              color: "var(--primary-text)",
            }}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="writer">Writer</option>
          </Form.Select>
        </Form.Group>

        <Button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 4 &&
            role !== ""
              ? false
              : true
          }
          type="submit"
          className="btn"
          style={{
            backgroundColor: "var(--main-color)",
            borderColor: "var(--border-color)",
            color: "var(--primary-text)",
            transition: "var(--transition-speed)",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "var(--main-color)")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "var(--main-color)")
          }
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
