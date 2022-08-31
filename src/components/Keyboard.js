import React, {useEffect} from 'react';
import {keys} from '../constants/Constants';
import '../style/Keyboard.css';


function Keyboard({boardData,handleKeyPress}) {
    const handleKeyboard=(key)=> { 
        if (key.key === "Enter")
            handleKeyPress("ENTER")
        if (key.key === "Backspace")
            handleKeyPress("⌫")
        if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase())
            handleKeyPress(key.key.toUpperCase())
    }
    useEffect(() => {          
        window.addEventListener("keydown", handleKeyboard)

        return () => { window.removeEventListener("keydown", handleKeyboard) }
    })
  return (
    <div className='keyboard-rows'>
      {keys.map((item,index)=>(
        <div className='row' key={index}>
            {
                // item.map((key,keyIndex)=>(
                //     <button key={keyIndex}
                //     className={`${(boardData && (boardData.correctCharArray.indexOf(key)!==-1))?"key-correct":
                //     ((boardData && (boardData.presentCharArray.indexOf(key)!==-1))?"key-present":
                //     ((boardData && (boardData.absentCharArray.indexOf(key)!==-1))?"key-absent":""))}`}
                //     onClick={()=>{handleKeyPress(key)}}>
                //         {key}
                //     </button>
                // ))

                item.map((key,keyIndex)=>(
                    <button key={keyIndex}
                    onClick={()=>{handleKeyPress(key)}}>
                        {key}
                    </button>
                ))
            }
        </div>
      ))}
    </div>
  )
}

export default Keyboard
