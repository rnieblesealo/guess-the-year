/* WARN: URGENT FIXES:
 * [ ] Value skip on fast type
 * [ ] Excess size breaks component 
 */

import { useState, useRef, useEffect } from "react"

export default function Passcode() {
  const [arrValue, setArrValue] = useState(['', '', '', ''])
  const [currFocusIndex, setCurrFocusIndex] = useState(0)

  useEffect(() => {
    // paste event handler 
    // NOTE: async because user gets a prompt and thus selects OK whenever they choose!
    document.addEventListener("paste", async () => {

      // query browser clipboard read permission; firefox doesn't require this?
      /*
      const pastePermission = await navigator.permissions.query({
        name: "clipboard-read"
      })

      // flag if disallowed
      if (pastePermission.state === "denied") {
        throw new Error("Clipboard read disallowed!")
      }
      */

      // try to read in clipboard values as numbers
      const clipboardContent = await navigator.clipboard.readText()

      // now try to paste data into passcode
      try {
        // get pasted values as numbers
        // drop any nans 
        let pastedArr = clipboardContent.split("")
        pastedArr = pastedArr
          .map((num) => Number(num))
          .filter((num) => !isNaN(num))

        // last index of passcode vals
        const lastIndex = arrValue.length - 1

        // fill remaining places in array if focus index isn't first
        if (currFocusIndex > 0) {
          // get remaining places in passcode
          const remainingPlaces = lastIndex - currFocusIndex;

          // trim pasted to be that length 
          const partialArray = pastedArr.slice(0, remainingPlaces + 1)

          console.log("case1")

          // set passcode values
          // first half (from 0 to focus) stays as-is
          // second half will contain pasted content 
          setArrValue([
            ...arrValue.slice(0, currFocusIndex),
            ...partialArray
          ])

          // ...but if focus index is first,
          // overwrite all slots required by clipboard content from the start 
          // remaining values after that are left as they were before 
        } else {
          console.log("case2")

          setArrValue([
            ...pastedArr,
            ...arrValue.slice(pastedArr.length - 1, lastIndex)
          ])
        }

        // now update the focus

        // if pasted from start and pasted content doesn't exceed slots,
        // move focus to end of pasted
        if (pastedArr.length < arrValue.length && currFocusIndex === 0) {
          setCurrFocusIndex(pastedArr.length - 1)
          inputRefs.current[pastedArr.length - 1].focus()
          // otherwise, move focus to last input element
        } else {
          setCurrFocusIndex(arrValue.length - 1)
          inputRefs.current[pastedArr.length - 1].focus()
        }
      } catch (error) {
        console.error(error)
      }
    })
  }, [arrValue, currFocusIndex])

  // holds references to input elements so we can interact with them

  const inputRefs = useRef([])

  // NOTE:
  // inputRefs is a parent object that remains persistent across re-renders
  // its .current attribute (inputRefs.current) holds the actual references themselves
  // the inputRefs object never changes, but the held references in .current may change
  // this ensures react has a consistent way to access and update refs!

  // make value at i-th input element match i-th slot in array
  // NOTE: we will supply index; only e is supplied by default
  function onChange(e, index) {
    setArrValue((preValue) => {
      const newArr = [...preValue]

      // set number-cast version of newly typed value in array using curr index
      if (parseInt(e.target.value)) {
        newArr[index] = parseInt(e.target.value)
      } else {
        newArr[index] = e.target.value
      }

      return newArr
    })
  }

  // update focused index
  function onKeyUp(e, index) {
    if (e.key === "Backspace") {
      if (index === 0) {

        // NOTE:
        // setState() is asynchronous!
        // state changes don't happen right away,
        // react has to schedule them

        setCurrFocusIndex(0)
      } else {
        setCurrFocusIndex(index - 1)

        // WARN: i don't understand the index === currFocusIndex check 
        // best guess is ensuring react hasn't updated state when moving focus 
        // but what if it has atp? wouldn't focus fail to change?

        /* 
         * gpt says the last check ensures we're interacting with 
         * the correct input ref based on index
         * BEFORE it becomes updated
         *
         * it's a safeuard avoiding focus issues arising from state update timing
        */

        if (inputRefs && inputRefs.current && index === currFocusIndex) {
          inputRefs.current[index - 1].focus()
        }
      }
    } else {
      if ((parseInt(e.key)) && index <= arrValue.length - 2) {
        setCurrFocusIndex(index + 1)

        if (inputRefs && inputRefs.current && index === currFocusIndex) {
          inputRefs.current[index + 1].focus()
        }
      }
    }
  }

  // on keydown, ensure keycode of what we just typed is a digit 0-9 or a backspace
  // otherwise, prevent default behavior (presumably modifying the input val)
  function onKeyDown(e) {
    const keyCode = e.key // .key returns exact char we just typed

    console.log("conkey: ", e.ctrlKey)

    const failConds = (
      !(keyCode >= 0 && keyCode <= 9) && // not a 0-9 digit 
      !(keyCode === "Backspace") && // not a backspace 
      !(e.ctrlKey && e.key == "v") // not a paste combo 
    )

    // WARN: this comparison works because of coercion, but it doesn't seem to be good practice!
    if (failConds) {
      e.preventDefault()
    }
  }

  // set focus index to the given one and run focus
  function onFocus(e, index) {
    setCurrFocusIndex(index)
    e.target.focus()
  }

  // generates passcode input slots, one per value in the init array
  const inputs = arrValue?.map((val, index) => {
    return (
      <input
        key={`index-${index}`}
        ref={(elem) => elem && (inputRefs.current[index] = elem)} // using && here is equivalent to an if statement that checks for nullity
        type="text"
        value={String(val)}
        maxLength={1} // accept only 1 val
        onChange={(e) => { onChange(e, index) }}
        onKeyUp={(e) => { onKeyUp(e, index) }}
        onKeyDown={(e) => { onKeyDown(e, index) }}
        onFocus={(e) => { onFocus(e, index) }}
        className="bg-white aspect-square w-20 rounded-2xl text-black text-center text-4xl"
      />
    )
  })

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-bold text-white text-xl gap-3"> <p>Focused index: {currFocusIndex}</p> <div className="flex flex-row gap-5">
      {inputs}
    </div>
    </div>
  )
}
