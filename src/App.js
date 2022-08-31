import { useEffect, useState } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import { wordList } from './constants/Data';

function App() {
  const [solution, setSolution] = useState(null);
  const [rowIndex, setRowIndex] = useState();
  const [boardWords, setBoardWords] = useState();
  const [boardRowStatus, setBoardRowStatus] = useState();
  const [presentCharArray, setPresentCharArray] = useState();
  const [absentCharArray, setAbsentCharArray] = useState();
  const [correctCharArray, setCorrectCharArray] = useState();
  const [status, setStatus] = useState();

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]);


  
  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const enterBoardWord = (word) => {
    let _boardWords = boardWords;
    let _boardRowStatus = boardRowStatus;
    let _solution = solution;
    let _presentCharArray = presentCharArray;
    let _absentCharArray = absentCharArray;
    let _correctCharArray = correctCharArray;
    let _rowIndex = rowIndex;
    let _rowStatus = [];
    let _matchCount = 0;
    let _status = status;

    for (var index = 0; index < word.length; index++) {
      if (_solution.charAt(index) === word.charAt(index)) {
        _matchCount++;
        _rowStatus.push("correct");
        if (!_correctCharArray.includes(word.charAt(index))) {
          _correctCharArray.push(word.charAt(index));
        }
        if (_presentCharArray.indexOf(word.charAt(index)) !== -1) {
          _presentCharArray.splice(_presentCharArray.indexOf(word.charAt(index)), 1);
        }
      }
      else if (_solution.includes(word.charAt(index))) {
        _rowStatus.push("present");
        if (!_presentCharArray.includes(word.charAt(index)) && !_correctCharArray.includes(word.charAt(index))) {
          _presentCharArray.push(word.charAt(index));
        }
      }
      else {
        _rowStatus.push("absent");
        if (!_absentCharArray.includes(word.charAt(index))) {
          _absentCharArray.push(word.charAt(index));
        }
      }
    }
    if (_matchCount === 5) {
      _status = "WIN";
      handleMessage("You Won");
    }
    else if (_rowIndex + 1 === 6) {
      _status = "LOST";
      handleMessage("The Correct Word is: "+_solution.toUpperCase());
    }
    _boardWords[_rowIndex] = word;
    _boardRowStatus.push(_rowStatus);

    setRowIndex(_rowIndex + 1);
    setBoardWords([..._boardWords]);
    setBoardRowStatus([..._boardRowStatus]);
    setPresentCharArray([..._presentCharArray]);
    setAbsentCharArray([..._absentCharArray]);
    setCorrectCharArray([..._correctCharArray]);
    setStatus(_status);
  }

  const enterCurrentText = (word) => {
    let _boardWords = boardWords;
    let _rowIndex = rowIndex;
    _boardWords[_rowIndex] = word;

    setBoardWords(_boardWords);
  }


  const handleKeyPress = (key) => {
    if (rowIndex > 5 || status === "WIN") {
      return;
    }
    if (key === "ENTER") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage("Not in wordlist");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      }
      else {
        handleMessage("Not enough letters");
      }
      return;
    }
    if (key === "⌫") {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    }
    else if (charArray.length < 5) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join("").toLowerCase());
  }








  useEffect(() => {
    if (!solution) {
      var alphabetIndex = Math.floor(Math.random() * 26);
      var wordIndex = Math.floor(Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length);
      setSolution(wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex]);
      setRowIndex(0);
      setBoardWords([]);
      setBoardRowStatus([]);
      setPresentCharArray([]);
      setAbsentCharArray([]);
      setCorrectCharArray([]);
      setStatus("IN_PROGRESS");
    }
  }, [setSolution, solution])




  return (
    <div className='container'>
      {/* {solution} */}
      <div className='top'>
        <div className='title'> WORDLE CLONE</div>
      </div>
      {message && <div className='message'>
        {message}
      </div>}
      <div className='cube'>
        {[0, 1, 2, 3, 4, 5].map((row, _rowIndex) => (
          <div className={`cube-row ${solution && row === rowIndex && error && "error"}`} key={_rowIndex}>
            {
              [0, 1, 2, 3, 4].map((column, letterIndex) => (
                <div key={letterIndex} className={`letter ${solution && boardRowStatus[row] ? boardRowStatus[row][column] : ""}`}>
                  {solution && boardWords[row] && boardWords[row][column]}
                </div>
              ))
            }
          </div>
        ))

        }

      </div>
      <div className='bottom'>
        <Keyboard solution={solution} correctCharArray={correctCharArray} presentCharArray={presentCharArray} absentCharArray={absentCharArray} handleKeyPress={handleKeyPress} />
      </div>
    </div>

  );
}

export default App;
