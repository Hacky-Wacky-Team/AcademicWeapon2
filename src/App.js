import React, { useState } from 'react';
import './App.css';
import imageList from './list.json';

const QuestionGenerator = () => {
  const [subjects, setSubjects] = useState({
    Functions: false,
    Physics: false,
    Data: false
  });
  const [showImage, setShowImage] = useState(null);

  const changeImage = () => {
    getRandomQuestion();
  };

  const [subtopics, setSubtopics] = useState({
    Functions: [
      { value: 'Functions/Review and Introduction to Functions', checked: false },
      { value: 'Functions/Polynomial Functions', checked: false },
      { value: 'Functions/Solving Equations and Inequalities', checked: false },
      { value: 'Functions/Curve Sketching', checked: false },
      { value: 'Functions/Trigonometric Functions', checked: false },
      { value: 'Functions/Trigonometric Identities', checked: false },
      { value: 'Functions/Logarithms', checked: false }
    ],
    Physics: [
      { value: 'Physics/Kinematics 1', checked: false },
      { value: 'Physics/Kinematics 2', checked: false },
      { value: 'Physics/Dynamics', checked: false },
      { value: 'Physics/Energy and Momentum', checked: false },
      { value: 'Physics/Fields 1', checked: false },
      { value: 'Physics/Fields 2', checked: false },
      { value: 'Physics/Light and Waves', checked: false }
    ],
    Data: [
      { value: 'Data/Introduction to Probabilities', checked: false },
      { value: 'Data/Permutations', checked: false },
      { value: 'Data/Combinations', checked: false },
      { value: 'Data/Probability Distributions', checked: false },
      { value: 'Data/Organization of Data', checked: false },
      { value: 'Data/Single Variable Analysis', checked: false },
      { value: 'Data/Continuous Distributions', checked: false },
      { value: 'Data/Two Variable Analysis', checked: false }
    ]
  });

  const toggleSubject = (subjectKey) => {
    const newValue = !subjects[subjectKey];
    setSubjects({ ...subjects, [subjectKey]: newValue });
    setSubtopics((prev) => {
      const updatedSubtopics = { ...prev };
      updatedSubtopics[subjectKey] = updatedSubtopics[subjectKey].map((s) => ({
        ...s,
        checked: newValue
      }));
      return updatedSubtopics;
    });
  };

  const toggleSubtopic = (subjectKey, index) => {
    const updatedSubtopics = subtopics[subjectKey].map((topic, i) =>
      i === index ? { ...topic, checked: !topic.checked } : topic
    );
    setSubtopics({ ...subtopics, [subjectKey]: updatedSubtopics });
  };

  const renderSubject = (subjectKey) => (
    <div className="subject-wrapper" key={subjectKey}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={subjects[subjectKey]}
          onChange={() => toggleSubject(subjectKey)}
        />
        <div className="checkmark"></div>
        <span className="label"> {subjectKey}</span>
      </label>
      <div className="sub-checkboxes">
        {subtopics[subjectKey].map((topic, i) => (
          <label className="checkbox-wrapper" key={topic.value}>
            <input
              type="checkbox"
              value={topic.value}
              checked={topic.checked}
              onChange={() => toggleSubtopic(subjectKey, i)}
            />
            <div className="checkmark"></div>
            <span>{topic.value.split('/')[1]}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const getRandomQuestion = () => {
    const selectedUnits = Object.keys(subtopics).flatMap(subjectKey =>
      subtopics[subjectKey].filter(topic => topic.checked).map(topic => topic.value)
    );

    if (selectedUnits.length === 0) {
      alert('Please select at least one unit.');
      return;
    }

    const images = selectedUnits.flatMap(unit => {
      const [subject, unitName] = unit.split('/');
      return imageList[subject]?.[unitName]?.images || [];
    });

    if (images.length === 0) {
      alert('No images found for the selected units.');
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    setShowImage(randomImage);
  };

  return (
    <div className="container">
      <h1>Random Question Generator</h1>
      <div className="subjects">
        {Object.keys(subjects).map(renderSubject)}
      </div>
      <button id="get-question" onClick={changeImage}>Get Random Question</button>
      <div id="question-display" className="display-box">
        {showImage ? (
          <img src={showImage} alt="Random Question" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
};

export default QuestionGenerator;