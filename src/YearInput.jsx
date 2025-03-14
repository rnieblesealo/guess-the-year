import { useState, useRef } from "react"

export default function YearInput() {
  const [values, setValues] = useState([
    '',
    '',
    '',
    ''
  ])

  const inputElemRefs = useRef([]) // stores digit input boxes

  /** Disallow behavior associated to keys we don't care about when pressed. */
  function onKeyDown(e, index) {
    e.preventDefault()

    const keyCode = e.key;

    // backspacing
    if (keyCode === "Backspace") {
      inputElemRefs.current[index].value = ""

      setValues((prevValues) => {
        const updatedValues = [...prevValues]

        updatedValues[index] = ""

        return updatedValues
      })

      // functionally state update to ensure new focus index is applied on time
      const newFocusIndex = index - 1;
      if (inputElemRefs.current[newFocusIndex]) {
        inputElemRefs.current[newFocusIndex].focus()
      }
      // regular keypressing; advances focus!
    } else {
      const validInput = keyCode == "0" || parseInt(keyCode) // 0 is treated as falsy; account for this

      if (validInput && index <= values.length - 1) {
        inputElemRefs.current[index].value = String(keyCode)

        setValues((prevValues) => {
          const updatedValues = [...prevValues]

          updatedValues[index] = String(keyCode)

          return updatedValues
        })


        const newFocusIndex = index + 1;
        if (inputElemRefs.current[newFocusIndex]) {
          inputElemRefs.current[newFocusIndex].focus()
        }
      }
    }
  }

  const inputBoxes = values?.map((value, index) => {
    return (
      <input
        key={index}
        ref={(me) => { inputElemRefs.current[index] = me }}
        type="text"
        defaultValue={String(value)}
        maxLength={1}
        onKeyDown={(e) => onKeyDown(e, index)}
        className="aspect-[1.8/2.25] w-12 bg-gray-900 rounded-2xl text-white text-center text-2xl font-bold"
      />
    )
  })

  return (
    <div className="flex gap-1">
      {inputBoxes}
    </div>
  )
}
