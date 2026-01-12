import React, { useState } from "react";
import "./Fourth_lab.css";
import image_1 from "../../../assets/img/practical_lab2/image_1.png";
import icon from "../../../assets/img/practical_lab2/icon.png";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";
import ShowHint_Btn from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import GoBackBtn from "../../../Components/GoBack_Btn/GoBack_Btn";

// Helper function to validate email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Robots() {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value.trim();
    const email = e.target.email.value.trim();
    const website = e.target.website.value.trim();

    if (!content) {
      setErr("Please enter a comment.");
      return;
    }

    if (!isValidEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    const isJavaScriptLink = website.toLowerCase().startsWith("javascript:");

    setComments([...comments, { email, content, website, isJavaScriptLink }]);
    e.target.reset();
    setErr("");
    setSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      {/* Start Course Content */}
      <div className="course-Fourth_lab">
        <GoBackBtn />
        <ShowHint_Btn />
        <ThemeSwitcher />
        <div className="container-Fourth_lab">
          <div className="row-practice p-4">
            <div className="card-Fourth_lab">
              <img className="robot-image" src={image_1} alt="Robotics" />
              <div className="card-Fourth_lab">
                <h2>Robots in Our Lives</h2>
                <p>
                  The development of robots has significantly transformed our
                  daily lives, industries, and the global economy. Over the past
                  century, robots have evolved from simple mechanical devices
                  into highly sophisticated machines capable of performing
                  complex tasks with precision and speed. The concept of robots
                  dates back to ancient civilizations, with myths and stories
                  about automated beings. However, modern robotics began in the
                  20th century, notably in the 1950s when George Devol invented
                  the first programmable robot called "Unimate." This marked the
                  beginning of robots being used in manufacturing, especially in
                  the automotive industry.
                </p>
                <p>
                  During the 1960s and 1970s, robots became an essential part of
                  industrial automation. They were used to perform repetitive,
                  dangerous, or labor-intensive tasks, improving efficiency and
                  safety in factories. Industrial robots, such as robotic arms,
                  revolutionized production lines, allowing for faster and more
                  consistent manufacturing processes. In recent decades,
                  robotics has entered the medical field. Robots like the Da
                  Vinci Surgical System allow surgeons to perform minimally
                  invasive surgeries with greater precision. These machines have
                  reduced recovery times for patients and improved surgical
                  outcomes. Medical robots are also used in diagnostics,
                  rehabilitation, and even drug delivery.
                </p>
                <p>
                  Beyond industry and healthcare, robots are increasingly used
                  in everyday services. Automated vacuum cleaners, lawn mowers,
                  and even robots that assist in customer service are becoming
                  more common in households and businesses. Service robots help
                  with tasks that were traditionally manual, saving time and
                  effort. The integration of artificial intelligence (AI) has
                  been a game-changer for robotics. AI allows robots to learn,
                  adapt, and perform tasks with minimal human intervention.
                  AI-driven robots are used in areas like autonomous vehicles,
                  drone technology, and customer service bots. They can process
                  large amounts of data, recognize patterns, and make decisions,
                  making them increasingly valuable in various sectors.
                </p>
                <p>
                  As robots become more advanced, they raise social and ethical
                  questions. The impact on employment, for example, is a
                  concern, as automation could replace jobs in certain
                  industries. Additionally, ethical issues arise with the use of
                  robots in warfare, law enforcement, and surveillance. Looking
                  ahead, robots will likely play an even more significant role
                  in society. We can expect advancements in humanoid robots,
                  capable of interacting with humans in natural ways. Robots
                  will continue to be integrated into smart homes, public
                  infrastructure, and even space exploration. These innovations
                  hold the promise of making life more convenient and efficient.
                </p>
                <p>
                  In conclusion, the development of robots has brought immense
                  progress, changing the way we work, heal, and live. As
                  technology continues to advance, robots will undoubtedly play
                  an even more integral role in our future.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Write Your Comment......"
                  required
                ></textarea>
                <input
                  type="email"
                  name="email"
                  placeholder="Write Your Email"
                  className="form_input"
                  required
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Write Your Website"
                  className="form_input"
                />
                <button type="submit" className="button-btn-primary">
                  Submit
                </button>
                {err && <span className="error">{err}</span>}
                {success && (
                  <div className="success-message">
                    Comment submitted successfully!
                  </div>
                )}
              </form>
              <div className="comment-section">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-card">
                    <div className="comment-header">
                      <img src={icon} className="icon-lab4" alt="User Icon" />
                      <a
                        href={comment.website || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="name"
                        onClick={(e) => {
                          if (comment.isJavaScriptLink) {
                            e.preventDefault(); // Prevent navigation
                            alert("Alert triggered from JavaScript URL!"); // Custom alert
                          }
                        }}
                      >
                        {comment.email || "Anonymous"}
                      </a>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Course Content */}
    </>
  );
}
