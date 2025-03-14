const ControlButton = (props) => (
  <button
    onClick={props.onClick}
    className="cursor-pointer flex items-center gap-2 bg-gray-900 w-min-content text-center p-3 pl-6 pr-6 rounded-2xl transition-transform duration-short transform hover:scale-110 transform active:scale-100 z-20"
    style={
      props.bgColor && { backgroundColor: props.bgColor }
    }
  >
    {props.text &&
      <span className="font-bold">
        {props.text}
      </span>
    }
    {props.graphic &&
      <span className="text-2xl">
        {props.graphic}
      </span>
    }
  </button>
)

export default ControlButton
