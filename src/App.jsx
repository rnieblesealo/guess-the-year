import cardInfo from "./cardInfo"
import { RiDiceLine } from "react-icons/ri";

export default function App() {
  const ControlButton = (props) => (
    <button className="flex items-center gap-2 bg-black w-min-content text-center p-3 pl-6 pr-6 rounded-2xl transition-transform duration-short transform hover:scale-110 transform active:scale-100">
      <span className="font-bold">
        {props.text}
      </span>
      <span className="text-2xl">
        {props.graphic}
      </span>
    </button>
  )

  const Card = (props) => (
    /*
     * Hoverable area
     *  Flipping area
     *    Front face (no rotation by default)
     *    Back face (rotated 180 on y)
    */

    <div className="perspective-distant cursor-pointer z-20">
      <div className="w-lg aspect-square relative transform-3d transition-transform duration-300 transform hover:rotate-x-180">
        <div className="rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-0">
          <img
            src={props.imgSrc}
            className="w-full aspect-square"
          />
        </div>
        <div className="text-center flex items-center text-3xl font-bold justify-center bg-gray-300 rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-180">
          <div className="flex flex-col">
            <span className="text-5xl">
              {props.albumName ?? "..."}
            </span>
            <span className="text-2xl font-normal text-gray-500">
              by {props.artistName ?? "..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <h1 className="text-4xl font-bold">Guess the Artist!</h1>
      <div className="text-center text-gray-500">
        <p className="flex items-center justify-center gap-2 text-md">Let's see if you can guess the artist of these
          <span className="bg-gray-300 rounded-lg p-1 pl-2 pr-2 font-bold"> 10 </span>
          albums!
        </p>
      </div>
      <Card
        imgSrc={cardInfo[0].imgSrc}
        albumName={cardInfo[0].albumName}
        artistName={cardInfo[0].artistName}
      />
      <div className="bg-transparent text-white flex items-center justify-center flex-row rounded-2xl gap-5">
        <ControlButton text="Another!" graphic={<RiDiceLine />} />
      </div>
    </div>
  )
}
