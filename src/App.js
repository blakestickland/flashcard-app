import { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map(answer => decodeString(answer))
              , answer];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: questionItem.correct_answer,
              options: options.sort(() => Math.random() - .5)
            }
          })

        )
        console.log(res.data.results)
      });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement('textArea')
    textArea.innerHTML = str
    return textArea.value;
  }

  return (
    <div className='container'>
      <FlashcardList flashcards={flashcards} />
    </div>
  )
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 3 ?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer",
    options: ["Answer", "Answer 1", "Answer 2", "Answer 3"],
  },
];

export default App;
