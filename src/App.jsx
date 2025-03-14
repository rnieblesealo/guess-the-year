import cardInfo from "./cardInfo"
import { useState, useEffect } from "react"
import { RiDiceLine } from "react-icons/ri";
import YearInput from "./YearInput"
import Card from "./Card"
import ControlButton from "./ControlButton"

export default function App() {
  const [imgSrc, setImgSrc] = useState(null)
  const [albumName, setAlbumName] = useState(null)
  const [artistName, setArtistName] = useState(null)
  const [releaseYear, setReleaseYear] = useState(null)

  function newCard() {
    const randomCard = cardInfo[Math.floor(Math.random() * cardInfo.length)]

    setImgSrc(randomCard.imgSrc)
    setAlbumName(randomCard.albumName)
    setArtistName(randomCard.artistName)
    setReleaseYear(randomCard.releaseYear)

    // set accent color in css!
    document.documentElement.style.setProperty("--accent-color", randomCard.color)
  }

  // get new card on component mount
  useEffect(() => {
    newCard()
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
        <YearInput />
        <div className="bg-transparent text-white flex items-center justify-center flex-row rounded-2xl gap-5">
          <ControlButton text="Another!" graphic={<RiDiceLine />} onClick={newCard} />
        </div>
      </div>
    </div>
  )
}
