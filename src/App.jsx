import cardInfo from "./cardInfo"
import clsx from "clsx"
import { useState, useEffect, useRef } from "react"
import { RiDiceLine } from "react-icons/ri";

export default function App() {
  const ControlButton = (props) => (
    <button onClick={props.onClick} className="cursor-pointer flex items-center gap-2 bg-gray-900 w-min-content text-center p-3 pl-6 pr-6 rounded-2xl transition-transform duration-short transform hover:scale-110 transform active:scale-100 z-20">
      <span className="font-bold">
        {props.text}
      </span>
      <span className="text-2xl">
        {props.graphic}
      </span>
    </button>
  )

  const Card = (props) => {
    /*
     * Hoverable area
     *  Flipping area
     *    Front face (no rotation by default)
     *    Back face (rotated 180 on y)
    */

    const [flipped, setFlipped] = useState(false)

    const flip = clsx(
      flipped ? "transform rotate-x-180" : "transform rotate-x-0"
    )

    return (
      <button onClick={() => { setFlipped(!flipped) }} className="animate-fade-up animate-ease-out animate-duration-500 perspective-distant cursor-pointer z-20">
        <div className={`w-lg aspect-square relative transform-3d transition-transform duration-300 ${flip}`}>
          <div className="rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-0">
            <img
              src={props.imgSrc}
              className="w-full aspect-square"
            />
          </div>
          <div className="text-center text-gray-500 flex items-center text-3xl font-bold justify-center bg-gray-900 rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-180">
            <div className="flex flex-col">
              <span className="text-5xl text-white">
                {props.releaseYear ? props.releaseYear.toString() : "..."}
              </span>
              <span className="text-3xl">
                {`"${props.albumName}"`}
              </span>
              <span className="text-2xl font-normal text-gray-500">
                by {props.artistName}
              </span>
            </div>
          </div>
        </div>
      </button>
    )
  }

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

  const Date = () => {
    const [digits, setDigits] = useState(['', '', '', ''])
    const [focusedIndex, setFocusedIndex] = useState(0) // keep track of focus
    const inputRefs = useRef([]) // keep references to input elems

    // ensure entered key is a digit by preventing default beh
    const onKeyDown = (e) => {
      const keyCode = e.key
      if (!(keyCode >= 0 && keyCode <= 9)) {
        e.preventDefault()
      }
    }

    // update values
    const onChange = (e, index) => {
      // looks like state setter first param is existing val
      setDigits((preDigits) => {
        const newDigits = [...preDigits]

        // pass number if able to parse one, otherwise pass text
        if (parseInt(e.target.value)) {
          newDigits[index] = parseInt(e.target.value)
        } else {
          newDigits[index] = e.target.value
        }

        return newDigits
      })
    }

    // move to next box on input
    const onKeyUp = (e, index) => {
      if (parseInt(e.key) && index < digits.length - 1) {
        // update focus index to next
        setFocusedIndex(index + 1)

        // ensure 
        if (inputRefs && inputRefs.current && index === focusedIndex) {
          inputRefs.current[index + 1].focus()
        }
      }
    }

    const inputFields = digits.map((digit, index) => {
      return (
        <input
          key={`index-${index}`}
          ref={(el) => el && (inputRefs.current[index] = el)}
          type="text"
          value={String(digit)}
          maxLength={1}
        />
      )
    })

    return (
      <div>
        <p>Focused: {focusedIndex}</p>
        {inputFields}
      </div>
    )
  }

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
      <div className="flex items-center justify-center h-min-content gap-3">
        <Date />
        <div className="bg-transparent text-white flex items-center justify-center flex-row rounded-2xl gap-5">
          <ControlButton text="Another!" graphic={<RiDiceLine />} onClick={newCard} />
        </div>
      </div>
    </div>
  )
}
