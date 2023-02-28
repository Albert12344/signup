import axios from 'axios';
import React, { useState } from 'react';

export default function ThirdType() {
  const [question, setQuestion] = useState('')
  const [firstPart, setFirstPart] = useState('');
  const [missingWord, setMissingWord] = useState('');
  const [secondPart, setSecondPart] = useState('')

  async function handleSubmit() {
    try {
      const title = localStorage.getItem('title')
      await axios.post('http://localhost:5555/thirdtype', {
        title: title, question, firstPart, missingWord, secondPart
      })
    }catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h2>Create Quiz Question</h2>
      <form>
        <div>
          <label className='label'>Հարց</label><br />
          <input className='input' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div>
          <label className='label'>Առաջին մաս</label><br />
          <input className='input' type="text" value={firstPart} onChange={(e) => setFirstPart(e.target.value)} />
        </div>
        <div>
          <label className='label'>Պահանջվող բառ</label><br />
          <input className='input' type="text" value={missingWord} onChange={(e) => setMissingWord(e.target.value)} />
        </div>
        <div>
          <label className='label'>Երկրորդ մաս</label><br />
          <input className='input' type="text" value={secondPart} onChange={(e) => setSecondPart(e.target.value)} />
        </div>
        <button className='button' onClick={handleSubmit}>Հաստատել</button>
      </form>
      <h3>Պատասխանի ընդհանուր տեսք</h3>
      <p>Պատասխան։ {firstPart} {missingWord} {secondPart}</p>
    </div>
  );
}

