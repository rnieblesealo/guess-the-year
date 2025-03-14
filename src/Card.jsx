import clsx from "clsx"
import { useState } from "react"

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

export default Card;
