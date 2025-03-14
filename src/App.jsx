import cardInfo from "./cardInfo"
import { useState, useEffect } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { FaArrowRight } from "react-icons/fa6"
import { IoIosSend } from "react-icons/io";
import YearInput from "./YearInput"
import Card from "./Card"
import ControlButton from "./ControlButton"

export default function App() {
  const [imgSrc, setImgSrc] = useState(null)
  const [albumName, setAlbumName] = useState(null)
  const [artistName, setArtistName] = useState(null)
  const [releaseYear, setReleaseYear] = useState(null)
  const [inputValues, setInputValues] = useState(['', '', '', ''])
  const [userMessage, setUserMessage] = useState("Enter your guess...")
  const [boldUserMessage, setBoldUserMessage] = useState(false)
  const [submitBgColor, setSubmitBgColor] = useState(null)
  const [_cardIndex, setCardIndex] = useState(0)
  const [indexIndicator, setIndexIndicator] = useState('')

  function changeCard(index) {
    const newCardInfo = cardInfo[index]

    // set card attrs
    setImgSrc(newCardInfo.imgSrc)
    setAlbumName(newCardInfo.albumName)
    setArtistName(newCardInfo.artistName)
    setReleaseYear(newCardInfo.releaseYear)

    // reset ui state
    setBoldUserMessage(false)
    setUserMessage("Enter your guess...")
    setSubmitBgColor(null)

    setIndexIndicator(`${index + 1}/${cardInfo.length}`)

    // set accent color in css!
    document.documentElement.style.setProperty("--accent-color", newCardInfo.color)

    console.log()
  }

  function nextCard() {
    setCardIndex((prevCardIndex) => {
      if (prevCardIndex < cardInfo.length - 1) {
        changeCard(prevCardIndex + 1)
        return prevCardIndex + 1
      } else {
        return prevCardIndex;
      }
    })
  }

  function prevCard() {
    setCardIndex((prevCardIndex) => {
      if (prevCardIndex > 0) {
        changeCard(prevCardIndex - 1)
        return prevCardIndex - 1
      } else {
        return 0;
      }
    })
  }

  function check() {
    const userGuess = parseInt(inputValues.join(""))

    setBoldUserMessage(true)

    if (userGuess === releaseYear) {
      setUserMessage("Correct!")
      setSubmitBgColor("#4AA34C")
    } else {
      setUserMessage("Try again!")
      setSubmitBgColor("#E74340")
    }
  }

  // get new card on component mount
  useEffect(() => {
    changeCard(0)
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-3">
      <h1 className="text-white text-4xl font-bold">Guess the Year!</h1>
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-md text-white">Can you guess the release year of these
          <span className="outline rounded-lg p-1 pl-2 pr-2 font-bold text-white"> {cardInfo.length} </span>
          albums?
        </p>
      </div>
      <Card
        imgSrc={imgSrc}
        albumName={albumName}
        artistName={artistName}
        releaseYear={releaseYear}
      />
      <div className="flex flex-col items-center justify-center h-min-content gap-3">
        <p className="text-white font-bold text-xl">{indexIndicator}</p>
        <p
          className={`text-white ${boldUserMessage && `font-bold`}`}
          style={
            submitBgColor && { color: submitBgColor }
          }
        >
          {userMessage}
        </p>
        <YearInput values={inputValues} setValues={setInputValues} />
        <div className="bg-transparent text-white flex items-center justify-center flex-row rounded-2xl gap-1">
          <ControlButton graphic={<FaArrowLeft />} onClick={prevCard} />
          <ControlButton graphic={<IoIosSend />} text="Submit!" bgColor={submitBgColor ?? null} onClick={check} />
          <ControlButton graphic={<FaArrowRight />} onClick={nextCard} />
        </div>
      </div>
    </div>
  )
}
