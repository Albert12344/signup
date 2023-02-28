import React, { useState } from 'react';
import axios from 'axios';

export default function SecondQuiz() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', isCorrect: false }]);
  
    const handleQuestionChange = (e) => {
      setQuestion(e.target.value);
    };
  
    const handleOptionTextChange = (index, e) => {
      const newOptions = [...options];
      newOptions[index].text = e.target.value;
      setOptions(newOptions);
    };
  
    const handleOptionCheckboxChange = (index) => {
      const newOptions = [...options];
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
      setOptions(newOptions);
    };
  
    const handleAddOption = () => {
      const newOptions = [...options, { text: '', isCorrect: false }];
      setOptions(newOptions);
    };
  
    const handleRemoveOption = () => {
      setOptions(options.slice(0, -1));
    }
    const handleSubmit = async () => {
      const title = localStorage.getItem('title')
      const response = await axios.post('http://localhost:5555/secondtype', {title: title, question, options });
      console.log(response);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Հարց</label><br />
          <input className ='input' type="text" id="question" value={question} onChange={handleQuestionChange} />
        </div>
        {options.map((option, index) => (
          <div key={index}>
            <label className='label' htmlFor={`option-${index}`} >Տարբերակ {index + 1}</label><br />
            <input className ='input' type="text" id={`option-${index}`} value={option.text} onChange={(e) => handleOptionTextChange(index, e)} />
            <input type="checkbox" checked={option.isCorrect} onChange={() => handleOptionCheckboxChange(index)} />
          </div>
        ))}
        <button className='button' type="button" onClick={handleAddOption}>Ավելացնել</button>
        <button className='button' type="button" onClick={handleRemoveOption}>Ջնջել</button><br />
        <button className='button' type="submit">Հաստատել</button>
      </form>
    );
}
