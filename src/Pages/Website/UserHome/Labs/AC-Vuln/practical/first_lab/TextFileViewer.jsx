import React, { useEffect, useState } from "react";

export default function TextFileViewer() {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    fetch("/robots2.txt")
      .then((response) => response.text())
      .then((data) => {
        setFileContent(data);
      })
      .catch((error) => {
        console.error("Error fetching robots.txt:", error);
      });
  }, []);

  // Return raw text content
  return <pre className="Custom__body--bg p-3">{fileContent}</pre>;
}
