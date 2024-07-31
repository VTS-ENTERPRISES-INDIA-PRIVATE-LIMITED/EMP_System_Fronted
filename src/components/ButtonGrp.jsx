import React, { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

const ButtonGrp = () => {

  const [bar, setBar] = useState(0)
  const [isClick, setIsClick] = useState(false)

  function handleBar() {
    const len = 10; // ekkada changes chey, nee requirement base chesukoni
    const intervalTime = 1000;
    const increment = 100 / len;

    setIsClick(true);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += increment;
      setBar(currentProgress);

      if (currentProgress > 100) {
        clearInterval(interval);
        setIsClick(false);
      }
    }, intervalTime);
    setBar(0)
  }
    return (
      <div className="btnGrp">
          <Button className={`genBtn ${isClick ? 'hideButton' : ''}`} variant="success" onClick={handleBar}>
            Generate
          </Button>
          { isClick && <ProgressBar className='progressBar' animated now={bar}/> }
      </div>
    )
}

export default ButtonGrp
