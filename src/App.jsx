export default function App() {
  const ControlButton = (props) => (
    <div className="bg-black w-[100px] text-center p-3 rounded-2xl">
      {props.text}
    </div>
  )

  const Card = () => (
    /*
     * Hoverable area
     *  Flipping area
     *    Front face (no rotation by default)
     *    Back face (rotated 180 on y)
    */

    <div className="perspective-[1000px] cursor-pointer drop-shadow-2xl">
      <div className="w-[450px] aspect-square relative transform-3d transition-transform duration-300 transform hover:rotate-x-180">
        <div className="rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-0">
          <img
            src="nobuses.jpg"
            className="w-full aspect-square"
          />
        </div>
        <div className="text-center flex items-center text-[2.5rem] font-bold justify-center bg-gray-300 rounded-2xl overflow-hidden backface-hidden absolute w-full h-full rotate-x-180">
          "No Buses"
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <p className="font-bold text-[2rem]">What's this album?</p>
      <Card />
      <div className="flex items-center justify-center flex-row rounded-2xl gap-5 font-bold text-white">
        <ControlButton text="Prev." />
        <ControlButton text="Next." />
      </div>
    </div>
  )
}
