import React, { useState, useEffect } from "react";
import "../Captcha_labs.css";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import axios from "axios";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function Captcha_first() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [captcha, setCaptcha] = useState("");
  const [image, setImage] = useState("");
  const [storedCaptchaID, setStoredCaptchaID] = useState(""); // Store ID before submission
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    fetchCaptcha();
    fetchComments();
  }, []);

  async function fetchCaptcha() {
    try {
      const res = await axios.get(
        "https://digitopia-project-backend.vercel.app/api/capatchalab1"
      );
      const imgSrc = res.data.image.startsWith("data:image")
        ? res.data.image
        : `https://digitopia-project-backend.vercel.app/${res.data.image}`;

      setImage(imgSrc);
      setStoredCaptchaID(res.data.id); // Store the ID for verification
      setErr("");
    } catch (error) {
      console.error("Error fetching captcha:", error);
      setErr("Failed to load captcha.");
    }
  }

  async function fetchComments() {
    try {
      const response = await axios.get(
        "https://digitopia-project-backend.vercel.app/api/capatchalab1comments"
      );

      if (Array.isArray(response.data.comments)) {
        setComments(
          response.data.comments.map((cmt, index) => ({
            id: index + 1,
            ...cmt,
          }))
        );
        setNextId(response.data.comments.length + 1);
      } else {
        setComments([]);
        setNextId(1);
      }
    } catch (error) {
      setErr("Failed to fetch comments.");
      console.error("Error fetching comments:", error);
      setComments([]);
      setNextId(1);
    }
  }
  async function deleteCaptcha() {
    setLoading(true);
    setErr("");

    try {
      await axios.delete(
        "https://digitopia-project-backend.vercel.app/api/capatchalab1"
      );

      setComments([]);
      setComment("");
      setCaptcha("");
      setNextId(1);
    } catch (error) {
      setErr(error.response?.data?.message || "Network Error");
      console.error("Error resetting captcha:", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const verifyRes = await axios.post(
        "https://digitopia-project-backend.vercel.app/api/capatchalab1",
        {
          id: storedCaptchaID, // Use stored ID instead of captchaID
          captcha: captcha,
          comment: comment,
        }
      );

      if (!verifyRes.data.success) {
        setErr("Wrong captcha, try again.");
        setLoading(false);
        fetchCaptcha(); // Refresh captcha if wrong
        fetchComments(); // Refresh captcha if wrong
        return;
      }
      await axios.post(
        "https://digitopia-project-backend.vercel.app/api/captchalab1comments",
        {
          comment,
        }
      );
      setComments((prevComments) => [...prevComments, { id: nextId, comment }]);
      setNextId(nextId + 1);
      setComment("");
      setCaptcha("");
      fetchCaptcha();
    } catch (error) {
      setErr(error.response?.data?.message || "Network Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="body-captcha">
      <GoBackBtn />
      <ShowHintBtn hintText=" Look 🔍 at how CAPTCHA values are stored and verified.The CAPTCHA values are stored in array." />
      <ThemeSwitcher />
      <div className="captcha_first">
        <div className="container-captcha">
          <div className="card-captcha">
            <div className="card_content">
              <div className="card_title">Captcha Verification</div>
              <form onSubmit={handleSubmit}>
                <div className="form-group-captcha">
                  <label htmlFor="comment">Enter Your Comment</label>
                  <textarea
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input"
                    required
                  ></textarea>
                </div>
                <div className="form-group-captcha text-center">
                  <img
                    src={image}
                    alt="Captcha"
                    className="captcha-image"
                    style={{ width: "60%", marginBottom: "10px" }}
                  />
                  <input
                    type="text"
                    name="captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div className="form-group-captcha">
                  <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </button>
                  {err && <span className="error">{err}</span>}
                </div>
              </form>
            </div>
          </div>
          <div className="reset mb-5">
            <button
              onClick={deleteCaptcha}
              disabled={loading}
              className="captcha_reset_btn"
            >
              {loading ? "Resetting..." : "Reset"}
            </button>
          </div>
          <div className="comment-section">
            {comments.map((cmt) => (
              <div key={cmt.id} className="comment-card">
                <div className="comment-header">
                  <p className="name">#{cmt.id}</p>
                </div>
                <p className="comment-text">{cmt.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
