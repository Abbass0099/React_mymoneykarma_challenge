import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Modal, ModalBody } from 'reactstrap';
import { usePointsActions, usePoints } from '../selectors/points'
import { useTimerActions, useTimer } from '../selectors/timer'
import { useAlertActions } from '../selectors/alert'
import paragraphs from '../constants/randomParagraph'
import buttonStyles from './buttonStyles.css'
import textStyles from './textStyles.css'
import Clock from '../components/Clock/Clock';

const Home = () => {
  
  const { currentPoints } = usePoints()
  const { currentTimer, currentDuration } = useTimer()

  const [randomDefaultText, setRandomDefaultText] = useState(paragraphs[0]) // first index
  //const [randomDefaultText, setRandomDefaultText] = useState(paragraphs[paragraphs.length -1]) // last index

  const [isTextBoxDisabled, setIsTextBoxDisabled] = useState(true)
  const [stopGame, setStopGame] = useState(false)

  const [typedWordsText, setTypedWordsText] = useState([])
  
  const randomParagraph = randomDefaultText.split(' ')
  
  const { changePoints } = usePointsActions()
  const { changeTimer } = useTimerActions()
  const { showConfirmationAlert, showCustomTimerAlert } = useAlertActions()

  const [modal, setModal] = useState(false)

  const toggle = () => {
    // console.log("toggle", !modal)
    setModal(!modal)
  }

  const handleTextArea = ((e) => {
    e.preventDefault()
 
    let textAreaInput = e.target.value
    let InputArrayText = textAreaInput.split(' ')

    setTypedWordsText(InputArrayText)
  })


  const startGameTimer = ((duration) => {
    let clock = ""
  
    let timer = duration, minutes, seconds
    
    setIsTextBoxDisabled(false)

    const timeInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds

      clock = `${minutes}:${seconds}`

      if (--timer < 0) {
        timer = duration
      }

      changeTimer({ current: clock })

      if (clock === '00:00') {
        clearInterval(timeInterval)
        setStopGame(true)

        showConfirmationAlert({
          position: 'center',
          icon: 'warning',
          title: '<h1 style="color: black; opacity: 70%">GAME OVER!</h1>',
          showConfirmButton: false,
          timer: 5000
        })
      }
    }, 500)
  })

  const checkCommonWords = (x, y) => {
    let commonWords = []

    // x: default random paragraph
    // y: typed Keyboard paragraph

    const typingWordsSize =  y.length > x.length 
    const chosenSize = typingWordsSize ? x.length : y.length

    for (let i = 0; i < chosenSize; i++) {
      if (x[i] === y[i]) {
        commonWords.push(x[i])
      }
    }

    // console.log("Common", commonWords)

    changePoints(commonWords.length)
  }

  useEffect(() => {
    if (stopGame) {
      checkCommonWords(randomParagraph, typedWordsText)
    }
  })

  const timerButtons = [
    { text: '1 min',
      onClick: () => {
        changeTimer({
          current: '01:00',
          duration: 60
        })
      }
    },
    { text: '2 min',
      onClick: () => {
        changeTimer({
          current: '02:00',
          duration: 120
        })
      }
    },
    { text: '5 min',
      onClick: () => {
        changeTimer({
          current: '05:00',
          duration: 300
        })
      }
    },
    { text: 'custom',
      onClick: () => showCustomTimerAlert()
    //   onClick: () =>  toggle()
    },
  ]


  const customPopup = () => {
      // console.log("Custom Popup")
    return (
      <Modal isOpen={modal} toggle={toggle} className="modalFadeInScale">
        <ModalBody>
          <div className="col-sm-12">
            <Col sm={12} className="text-center">
              <div className="sweet-alert">
                <div className="sa-icon sa-warning pulseWarning">
                  <span className="sa-body pulseWarningIns" />
                  <span className="sa-dot pulseWarningIns" />
                </div>
                <h2>Custom</h2>
              </div>
            </Col>
          </div>
          <div className="row col-sm-12">
            <Col sm={6} className="text-right">
              <Button className="vgaRoundedBold alertButton" color="info" onClick={toggle}>Cancel
              </Button>
            </Col>
            <Col sm={6} className="text-left">
              <Button
                className="vgaRoundedBold alertButton"
                color="danger"
              >
                OK
              </Button>
            </Col>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  const renderContent = useCallback(() => (
    
    <div className="hero__text">
      <p className="text-reveal">
      <Card style={{color:'black', backgroundColor:''}}>
        <CardBody>
            <span>{randomDefaultText}</span>
        </CardBody>        
      </Card>
      </p>

      <button 
        className="bubbly-button"
        style={{ float: 'left' }}
        text={'Randomize Paragraph'}
        onClick={() => 
            setRandomDefaultText(paragraphs[Math.floor(Math.random() * paragraphs.length)])
        }
        >
        Randomize Paragraph
      </button>

      <div className="text-right">
        {
          timerButtons.map((item, key) => (
          <Button
            className="minutesButton"
            key={key}
            text={item.text}
            onClick={item.onClick}
            color="secondary"
            style={{fontWeight:'bold'}}
          >
            {item.text}
          </Button>
          ))
        }
      </div>

      <Button
        className="startGameButton"
        onClick={() => {
        document.getElementById('typingBox').value = ''
        startGameTimer(currentDuration)
        }}
        color="danger"
        style={{fontWeight:'bold'}}
        >
        Start Game
      </Button>

      <div id={'typingBoxDiv'}>
        <nav className="navigation">
          { currentTimer > "00:10" ?
              <p style={{ color: 'black' }}>
                {currentTimer}
              </p>
              :
              <p style={{ color: 'red' }}>                                         
                  {currentTimer}
              </p>
          }
        </nav>

        <section className="content">
          <div className="hero__text">
            <p className="text-reveal">
              <Card style={{color:'black', backgroundColor:'grey'}}>
                <textarea 
                  placeholder="Type here..."
                  id="typingBox"
                  name="typingBox"
                  rows="8"
                  disabled={isTextBoxDisabled}
                  onChange={(val) => handleTextArea(val)}
                />
              </Card>
            </p>
          </div>
        </section>

        <aside className="sidebar">
          {currentPoints !== 1 ?                
            <p style={{ marginLeft: '5px', color: 'black' }}> {currentPoints} Points</p>                  
            :
            <p style={{ marginLeft: '5px', color: 'black' }}>{currentPoints}  Point</p>                
          }
        </aside>
      </div>
  </div>
  ))

return (
    <CardBody>
      {
        renderContent()  
      }
      {
        // customPopup()
      }
    </CardBody>
    )
}

export default Home