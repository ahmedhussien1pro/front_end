import React from "react";
import "./Word_list.css";
import ThemeSwitcher from "../../../Components/ThemeSwitcher/ThemeSwitcher";

export default function WordsList() {
  const words =
    "Able,Among,Animal,Believe,Balance,Bottles,Courage,Disease," +
    "Approve,Blanket,Benefit,Combine,Digital,Captain,Against,Antique," +
    "Anxiety,Circuit,lifehack,Compare,Counsel,Correct,Capture,Declare,Defeats," +
    "Deliver,Density,Dispose,Display,Created,Acquire,Analyze,Content," +
    "Article,Attempt,Compass,user,Decline,superuser,Defense,Develop,Destroy,Classic," +
    "Contact,Curious,Country,Culture,Cyberlab,Believe,Creator,Climate,Abandon";

  const wordArray = words
    .split(",")
    .map((word) => word.trim())
    .filter((word) => word !== "")
    .slice(0, 50);

  return (
    <>
      <ThemeSwitcher />
      <div className="words-list-container">
        <h1>Words List</h1>
        <div className="word-list">
          {wordArray.map((word, index) => (
            <p key={index}>{word}</p>
          ))}
        </div>
      </div>
    </>
  );
}
