import React from 'react';
import "./PracticeTitle.css";

const PracticeTitle = ({title}) => {
    return (
          <div className="course-titles mb-5">
            <h2 className="labs-title h2 text-center">{title} Labs</h2>
                  <p className="labs-subtitle">Test Your Hacking Skills</p>
                  </div>
    )
}
export default PracticeTitle;