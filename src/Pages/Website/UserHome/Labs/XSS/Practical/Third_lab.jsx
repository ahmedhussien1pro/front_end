import React, { useState, useEffect } from "react";
import "./Third_lab.css";
import image_1 from "../../../assets/img/practical_lab2/image_1.png";
import image_2 from "../../../assets/img/practical_lab2/image_2.png";
import image_3 from "../../../assets/img/practical_lab2/image_3.png";
import image_4 from "../../../assets/img/practical_lab2/image_4.png";
import image_5 from "../../../assets/img/practical_lab2/image_5.png";
import GoBack from "../../../Components/GoBack_Btn/GoBack_Btn";
import ShowHint from "../../../Components/ShowHint_Btn/ShowHint_Btn";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function Third_lab() {
  const hintMessage = `
  <div
      style={{
        textAlign: "left",
        fontSize: "1rem",
        lineHeight: "1.5",
        color: "#333",
        padding: "15px",
        background: "#f1f1f1",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p>Enter a random alphanumeric string into the search box.</p>
      <p>
        Right-click and inspect the element, and observe that your random
        string has been placed inside an <code>img</code> <code>src</code> attribute.
      </p>
      <p>Break out of the <code>img</code> attribute by searching for:</p>
      <code
        style={{
          display: "block",
          background: "#eaf7ff",
          padding: "10px",
          borderRadius: "5px",
          color: "#0056b3",
        }}
      >
        &quot;&gt;&lt;svg onload=alert(1)&gt;
      </code>
    </div>
  `;
  const cards = [
    {
      id: 1,
      title: "Robots in Our Lives",
      content:
        'The development of robots has significantly transformed our daily lives, industries, and the global economy. Over the past century, robots have evolved from simple mechanical devices into highly sophisticated machines capable of performing complex tasks with precision and speed. The concept of robots dates back to ancient civilizations, with myths and stories about automated beings. However, modern robotics began in the 20th century, notably in the 1950s when George Devol invented the first programmable robot called "Unimate." This marked the beginning of robots being used in manufacturing, especially in the automotive industry.',
      image: image_1,
    },
    {
      id: 2,
      title: "The Danger of Data Breaches and Stealing",
      content:
        "In today's digital age, data has become one of the most valuable assets for both individuals and organizations. However, as our reliance on technology grows, so does the risk of data breaches and theft. A data breach occurs when sensitive, confidential, or protected information is accessed without authorization, potentially leading to devastating consequences for businesses and individuals alike.",
      image: image_2,
    },
    {
      id: 3,
      title: "The Power of Python Across Industries",
      content:
        "Python has become one of the most widely used programming languages in the world due to its simplicity, versatility, and extensive range of applications. Since its creation by Guido van Rossum in 1991, Python’s use has expanded across various industries and fields, from web development to artificial intelligence, making it a favorite among developers and organizations alike. One of Python’s greatest strengths is its simplicity and readability. Python’s syntax is clean and easy to understand, making it accessible to beginners who are just starting their programming journey. The language’s design philosophy emphasizes code readability, allowing developers to write logical, easy-to-maintain code with fewer lines compared to other programming languages like Java or C++. This makes Python a great tool for rapid development, enabling teams to build and scale projects quickly.",
      image: image_3,
    },
    {
      id: 4,
      title: "5G and the Future of Mobile Networks",
      content:
        "The rollout of 5G technology marks a significant leap in the evolution of mobile networks. As the fifth generation of wireless technology, 5G promises faster speeds, lower latency, and greater capacity, revolutionizing how people connect and interact with technology. This development is set to transform industries, enable new applications, and change the way we live and work. 5G is the latest generation of mobile networks, succeeding 4G LTE. While 4G brought faster internet speeds and improved mobile connectivity, 5G is designed to be much faster, with speeds potentially reaching up to 100 times those of 4G. This improvement is largely due to the use of higher frequency bands, known as millimeter waves, which allow more data to be transferred at once.",
      image: image_4,
    },
    {
      id: 5,
      title: "The Importance of Firewalls in Network Security",
      content:
        "In today's digital landscape, where cyber threats are becoming increasingly sophisticated, the importance of firewalls cannot be overstated. A firewall acts as a security barrier between a trusted internal network and untrusted external networks, such as the internet. Its primary function is to monitor and control incoming and outgoing network traffic based on predetermined security rules. By establishing a set of rules, firewalls help prevent unauthorized access to or from a private network, playing a critical role in safeguarding sensitive information.",
      image: image_5,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setAlertMessage("");

    const newUrl = `?query=${encodeURIComponent(searchQuery)}`;
    window.history.pushState(null, "", newUrl);

    const filtered = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCards(filtered);
    setHasSearched(true);

    // if (filtered.length === 0) {
    //   if (searchQuery.includes('"')) {
    //     setAlertMessage(`Potential XSS: "${searchQuery}"`);
    //   }
    //   setErrorMessage(`No data found for: "${searchQuery}"`);
    // }

    // Check for XSS input
    if (searchQuery.includes('"')) {
      alert(`Alert triggered by input: "${searchQuery}"`);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [hasSearched]);

  const reloadPage = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    window.location.reload();
  };

  return (
    <>
      <GoBack />
      <ShowHint hintText={hintMessage} />
      <ThemeSwitcher />
      <div className="course-First_lab">
        <div className="container-First_lab">
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          {alertMessage && (
            <div className="alert-message">
              <p>{alertMessage}</p>
            </div>
          )}

          <form className="search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a practice"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>

          {hasSearched && !errorMessage && (
            <p className="search-result">You searched for: "{searchQuery}"</p>
          )}

          {/* Hidden XSS demonstration image */}
          <img
            src={`data:image/png;base64,${btoa('"><svg onload=alert(1)>')}`}
            alt="XSS Demonstration"
            style={{ display: "none" }}
          />

          <div className="row-practice">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div className="card-First_lab" key={card.id}>
                  <img src={card.image} alt={card.title} />
                  <div className="card-text-First_lab">
                    <h2>{card.title}</h2>
                    <p>{card.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="serached_text">
                No data found for: "{searchQuery}"
              </h1>
            )}
          </div>

          {hasSearched && (
            <div className="reload-container">
              <button onClick={reloadPage} className="reload-button">
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
