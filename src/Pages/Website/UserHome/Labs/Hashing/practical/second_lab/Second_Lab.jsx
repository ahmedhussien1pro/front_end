import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FaFileDownload,
  FaFileUpload,
  FaInfoCircle,
  FaCheck,
  FaShieldAlt,
  FaArrowLeft,
  FaLightbulb,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";
import "./SecondLab.css";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
import CrackerImage from "../../../../assets/img/Hashing/Cracker.jpg";
import ComparatorImage from "../../../../assets/img/Hashing/Comparator.jpg";
import GeneratorImage from "../../../../assets/img/Hashing/Generator.jpg";
import SaltingImage from "../../../../assets/img/Hashing/Salting.jpg";

// Tools Array
const Tools = [
  {
    title: "Hash Generator",
    brief: "Generate MD5, SHA-1, and SHA-256 hashes for any text input.",
    link: "/Hashing/Hashing_labs/lab1/HashGenerator",
    image: GeneratorImage,
    difficulty: "Easy",
  },
  {
    title: "Hash Comparator",
    brief:
      "Compare two hashes to see if they match. Useful for verifying data integrity.",
    link: "/Hashing/Hashing_labs/lab1/HashComparator",
    image: ComparatorImage,
    difficulty: "Easy",
  },
  {
    title: "Hash Cracker",
    brief:
      "Attempt to crack common password hashes using a dictionary attack (for educational purposes only).",
    link: "/Hashing/Hashing_labs/lab1/HashCracker",
    image: CrackerImage,
    difficulty: "Easy",
  },
  {
    title: "Salting Demo",
    brief:
      "See how salting adds security to password hashing by adding a random string before hashing.",
    link: "/Hashing/Hashing_labs/lab1/SaltingDemo",
    image: SaltingImage,
    difficulty: "Easy",
  },
];

const SecondLab = () => {
  const [instructions, setInstructions] = useState("");
  const [jsonAnswer, setJsonAnswer] = useState([]);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for desktop collapse vs. mobile toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Task Instructions
    fetch("/Hashing/HashTask.txt")
      .then((response) => response.text())
      .then((data) => setInstructions(data))
      .catch((err) => console.error("Error fetching instructions:", err));

    // Fetch Correct Answers
    fetch("/Hashing/hashWords.json")
      .then((response) => response.json())
      .then((data) => setCorrectAnswers(data.data))
      .catch((err) => console.error("Error fetching correctAnswers:", err));
  }, []);

  const algorithmForWord = (num) => {
    if ([3, 7, 9, 13, 16, 20].includes(num)) {
      return "SHA-256";
    } else if ([2, 5, 11, 15, 18].includes(num)) {
      return "SHA-1";
    } else {
      return "MD5";
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith(".txt") || file.name.endsWith(".json"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        extractAnswers(content);
      };
      reader.readAsText(file);
      setFileName(file.name);
    } else {
      Swal.fire(
        "Invalid File",
        "Please upload a valid .txt or .json file.",
        "error"
      );
    }
  };

  const extractAnswers = (content) => {
    try {
      if (content.trim().startsWith("{")) {
        const parsed = JSON.parse(content);
        if (parsed.data && Array.isArray(parsed.data)) {
          setJsonAnswer(parsed.data);
        } else {
          console.error("JSON does not contain a valid 'data' array.");
        }
      } else {
        const regex = /Hashed Word (\d+):\s*([a-f0-9]+)/g;
        let matches;
        const extractedAnswers = [];
        while ((matches = regex.exec(content)) !== null) {
          const wordNumber = Number(matches[1]);
          extractedAnswers.push({
            word: `original_word_${wordNumber}`,
            hashed_algorithm: algorithmForWord(wordNumber),
          });
        }
        setJsonAnswer(extractedAnswers);
      }
    } catch (error) {
      console.error("Error processing file content:", error);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    jsonAnswer.forEach((answer, index) => {
      if (
        correctAnswers[index] &&
        answer.word === correctAnswers[index].word &&
        answer.hashed_algorithm === correctAnswers[index].hashed_algorithm
      ) {
        correctCount += 1;
      }
    });
    const scorePoints = correctCount * 5;
    setScore(scorePoints);
    return scorePoints;
  };

  const handleSubmitAnswers = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const scorePoints = calculateScore();
    const totalScorePoints = correctAnswers.length * 5;
    setIsSubmitting(false);

    const percentage = ((scorePoints / totalScorePoints) * 100).toFixed(0);
    if (scorePoints < totalScorePoints * 0.75) {
      Swal.fire({
        title: "Fail",
        text: `You scored ${scorePoints} out of ${totalScorePoints} (${percentage}%). Please review your answers and try again.`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } else {
      Swal.fire({
        title: "Congratulations!",
        text: `You scored ${scorePoints} out of ${totalScorePoints} (${percentage}%). Great job!`,
        icon: "success",
        confirmButtonText: "Download Correct Answers",
      }).then(() => {
        downloadJsonFile();
      });
    }
  };

  const downloadJsonFile = () => {
    const jsonContent = JSON.stringify({ data: correctAnswers }, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hashWords_correct_answers.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTxtFile = () => {
    const blob = new Blob([instructions], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "HashTask.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigation & Utility Handlers
  const handleGoBack = () => navigate(-1);

  const handleShowHint = () => {
    Swal.fire({
      icon: "info",
      title: "Hint",
      html: `
        <ul class="hashing__hint-list">
          <li>Identify the hashing algorithm for each hash (MD5, SHA-1, or SHA-256).</li>
          <li>Follow the provided JSON answer format exactly.</li>
          <li>Each correct answer is worth 5 points.</li>
          <li>Review the task instructions for full details.</li>
        </ul>
      `,
    });
  };

  const totalPoints = correctAnswers.length * 5;
  const percentage =
    score !== null ? ((score / totalPoints) * 100).toFixed(0) : 0;

  return (
    <>
      <ThemeSwitcher />
      <div className="Custom__body--bg">
        {/* Fixed Sidebar */}
        <aside
          className={`hashing__sidebar hashing__sidebar--fixed primary-bg ${
            sidebarCollapsed ? "hashing__sidebar--collapsed" : ""
          } ${mobileSidebarOpen ? "hashing__sidebar--open" : ""}`}
        >
          <div className="hashing__sidebar-header d-flex justify-content-between align-items-center mb-3">
            {!sidebarCollapsed && (
              <h4 className="hashing__sidebar-title">Menu</h4>
            )}
            <button
              className="btn btn-sm btn-outline-secondary hashing__sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <FaBars /> : <FaTimes />}
            </button>
          </div>
          <nav className="hashing__nav">
            <ul className="list-unstyled hashing__nav-list">
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#overview"
                >
                  <FaInfoCircle />
                  {!sidebarCollapsed && <span className="ms-2">Overview</span>}
                </a>
              </li>
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#instructions"
                >
                  <FaFileDownload />
                  {!sidebarCollapsed && (
                    <span className="ms-2">Task Instructions</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#data"
                >
                  <FaFileUpload />
                  {!sidebarCollapsed && (
                    <span className="ms-2">Provided Data</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#answerFormat"
                >
                  <FaCheck />
                  {!sidebarCollapsed && (
                    <span className="ms-2">Answer Format</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#insights"
                >
                  <FaShieldAlt />
                  {!sidebarCollapsed && (
                    <span className="ms-2">Cybersecurity Insights</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  className="hashing__nav-link d-flex align-items-center"
                  href="#tools"
                >
                  <FaFileDownload />
                  {!sidebarCollapsed && (
                    <span className="ms-2">Helper Tools</span>
                  )}
                </a>
              </li>
              <li>
                <button
                  className="btn hashing__nav-btn d-flex align-items-center"
                  onClick={handleGoBack}
                >
                  <FaArrowLeft />
                  {!sidebarCollapsed && <span className="ms-2">Go Back</span>}
                </button>
              </li>
              <li>
                <button
                  className="btn hashing__nav-btn d-flex align-items-center"
                  onClick={handleShowHint}
                >
                  <FaLightbulb />
                  {!sidebarCollapsed && <span className="ms-2">Show Hint</span>}
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Wrapper */}
        <div className="hashing__content">
          {/* Mobile Toggle Button */}
          <header className="hashing__mobile-header d-md-none d-flex justify-content-between align-items-center p-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h5 className="m-0">Hashing Task</h5>
          </header>

          <main className="hashing__main">
            {/* Header */}
            <header className=" text-center pt-4" id="overview">
              <h1 className="fw-bold text-center main-color mb-2">
                Cybersecurity Hashing Task
              </h1>
              <p className="secondary-text mb-0">
                Test your hashing knowledge by identifying the algorithm used
                for each hash and submitting your answers in JSON format.
              </p>
            </header>
            <hr className="mb-5 w-50 mx-auto main-color" />
            {/* Overview Card */}
            <div className="hashing__overview mb-4">
              <div className="card primary-bg  hover-lift">
                <div className="card-body">
                  <h5 className="card-title main-color">What is Hashing?</h5>
                  <p className="card-text secondary-text">
                    Hashing transforms data into a fixed-size string using an
                    algorithm (e.g., MD5, SHA-1, SHA-256). It is a core concept
                    in cybersecurity used to verify data integrity and secure
                    information.
                  </p>
                </div>
              </div>
            </div>

            {/* Task Instructions */}
            <div className="hashing__instructions mb-4" id="instructions">
              <div className="accordion " id="instructionsAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header" id="headingInstructions">
                    <button
                      className="accordion-button primary-text primary-bg "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseInstructions"
                      aria-expanded="true"
                      aria-controls="collapseInstructions"
                    >
                      Task Overview & Instructions
                    </button>
                  </h2>
                  <div
                    id="collapseInstructions"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingInstructions"
                    data-bs-parent="#instructionsAccordion"
                  >
                    <div className="accordion-body primary-bg secondary-text ">
                      <p>
                        You will be provided with a series of hashed words. Your
                        task is to identify the hashing algorithm (MD5, SHA-1,
                        or SHA-256) used for each hash, then provide the
                        original word and algorithm in JSON format.
                      </p>
                      <p>
                        Trainers: Remind participants to carefully review the
                        provided data and example in the “Detailed Instructions”
                        modal below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-main-color mt-3"
                data-bs-toggle="modal"
                data-bs-target="#instructionsModal"
              >
                View Detailed Instructions
              </button>
            </div>

            {/* Provided Data */}
            <div className=" mb-4" id="data">
              <div className="card primary-bg primary-text hover-lift">
                <div className="card-body">
                  <h5 className="card-title main-color">Provided Data</h5>
                  <div className="hashing__data-list">
                    <p>
                      <strong className="main-color">Hashed Word 1:</strong>{" "}
                      f28b28d536f2db2de59da8a4c1351a49
                    </p>
                    <p>
                      <strong className="main-color">Hashed Word 2:</strong>{" "}
                      6c78a2d3f4cf0521e1f5d29932c1e4f6b9eddb68
                    </p>
                    <p>
                      <strong className="main-color">Hashed Word 3:</strong>{" "}
                      ee3a31c0a78bbf35e24bb9bc3d94aaf7e60d7003f0ddefb4b625b415c73b1b2a
                    </p>
                    {/* ...continue for all hashes */}
                  </div>
                  <button
                    onClick={downloadTxtFile}
                    className="btn-main-color mt-2"
                  >
                    Download Full Instructions
                    <FaFileDownload className="ms-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Answer Format */}
            <div className=" mb-4" id="answerFormat">
              <div className="card primary-bg primary-text hover-lift">
                <div className="card-body">
                  <h5 className="card-title hashing__card-title">
                    Answer Format
                  </h5>
                  <p className="hashing__card-text">
                    Your answers must follow this JSON structure exactly:
                  </p>
                  <pre className="hashing__code primary-text secondary-bg">
                    {`{
  "data": [
    {
      "word": "original_word",
      "hashed_algorithm": "MD5/SHA-1/SHA-256"
    },
    ...
  ]
}`}
                  </pre>
                  <p className="hashing__card-text">
                    Once complete, submit your .txt or .json file below.
                  </p>
                </div>
              </div>
            </div>

            {/* Cybersecurity Insights */}
            <div className="hashing__insights mb-4" id="insights">
              <h2 className="text-center main-color fs-3 my-4">
                Cybersecurity Insights
              </h2>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                <div className="card primary-bg secondary-text hover-lift">
                  <div className="card-body">
                    <h5 className="card-title">
                      Why Hashing Matters <FaInfoCircle className="ms-1" />
                    </h5>
                    <p className="card-text">
                      Hashing is fundamental in cybersecurity to secure
                      sensitive data and verify file integrity.
                    </p>
                  </div>
                </div>
                <div className="card primary-bg secondary-text hover-lift">
                  <div className="card-body">
                    <h5 className="card-title">
                      Data Protection <FaShieldAlt className="ms-1" />
                    </h5>
                    <p className="card-text">
                      Using strong algorithms like SHA-256 enhances your data
                      protection.
                    </p>
                  </div>
                </div>
                <div className="card primary-bg secondary-text hover-lift">
                  <div className="card-body">
                    <h5 className="card-title">
                      Best Practices <FaCheck className="ms-1" />
                    </h5>
                    <p className="card-text">
                      Validate your answers, follow the JSON format, and review
                      the task instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helper Tools */}
            <div className="hashing__tools mb-5" id="tools">
              <h2 className="text-center main-color fs-3">Helper Tools</h2>
              <p className="text-center italic secondary-text mb-1 ">
                Explore these additional hashing tools if needed.
              </p>
              <hr className="mb-5 w-50 mx-auto main-color " />
              <div className="row">
                {Tools.map((tool, index) => (
                  <div
                    key={index}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-10 mx-sm-auto mb-4"
                  >
                    <div className="card primary-bg  hover-lift h-100">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="card-img-top hashing__tool-img"
                      />
                      <div className="card-body">
                        <h5 className="card-title hashing__tool-title">
                          {tool.title}
                        </h5>
                        <p className="card-text hashing__tool-text">
                          {tool.brief}
                        </p>
                        <a href={tool.link} className="btn-main-color ">
                          Go to Tool
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload & Score Submission */}
            <div className="hashing__upload mb-5">
              <div className="card primary-bg primary-text p-3 hover-lift">
                <div className="card-body">
                  <div className="mb-3">
                    <label
                      htmlFor="fileUpload"
                      className="form-label hashing__upload-label"
                    >
                      Submit Your Answers
                    </label>
                    <input
                      type="file"
                      className="form-control focus-bg-transparent"
                      id="fileUpload"
                      accept=".txt,.json"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <button
                    onClick={handleSubmitAnswers}
                    className="btn-main-color my-1"
                    disabled={isSubmitting}
                  >
                    <FaFileUpload className="me-2" /> Submit Answers
                  </button>
                </div>
              </div>
              {score !== null && !isSubmitting && (
                <div className="mt-4 col-lg-10 mx-auto">
                  <div
                    className="alert alert-success hashing__score"
                    role="alert"
                  >
                    Your Score: {score} / {totalPoints} ({percentage}%)
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar hashing__progress-bar"
                      style={{ width: `${percentage}%` }}
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        <Go2TopBtn />

        {/* Detailed Instructions Modal */}
        <div
          className="modal fade hashing__modal"
          id="instructionsModal"
          tabIndex="-1"
          aria-labelledby="instructionsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable ">
            <div className="modal-content hashing__modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title hashing__modal-title"
                  id="instructionsModalLabel"
                >
                  Detailed Task Instructions
                </h5>
              </div>
              <div className="modal-body hashing__modal-body scrollbar">
                <h6 className="hashing__modal-subtitle">
                  Cybersecurity Hashing Task
                </h6>
                <p>
                  Welcome to the Cybersecurity Hashing Task! Follow these steps:
                </p>
                <hr />
                <h6 className="hashing__modal-subtitle">Provided Data:</h6>
                <ol className="hashing__modal-list">
                  <li>Hashed Word 1: f28b28d536f2db2de59da8a4c1351a49</li>
                  <li>
                    Hashed Word 2: 6c78a2d3f4cf0521e1f5d29932c1e4f6b9eddb68
                  </li>
                  <li>
                    Hashed Word 3:
                    ee3a31c0a78bbf35e24bb9bc3d94aaf7e60d7003f0ddefb4b625b415c73b1b2a
                  </li>
                  {/* ...list all hashed words */}
                </ol>
                <hr />
                <h6 className="hashing__modal-subtitle">
                  Required Answer Format:
                </h6>
                <pre className="hashing__code primary-bg secondary-text ">
                  {`{
  "data": [
    {
      "word": "original_word",
      "hashed_algorithm": "MD5/SHA-1/SHA-256"
    },
    ...
  ]
}`}
                </pre>
                <hr />
                <h6 className="hashing__modal-subtitle">
                  Trainer Instructions:
                </h6>
                <ol className="hashing__modal-list">
                  <li>Identify the algorithm used for each hash.</li>
                  <li>
                    Provide the original word and the corresponding hashing
                    algorithm.
                  </li>
                  <li>Format your answers exactly as shown.</li>
                  <li>Submit in .txt or .json format.</li>
                </ol>
                <p>
                  <strong className="main-color">Note:</strong> Once the task is
                  complete, please submit your answers.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-main-color"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondLab;
