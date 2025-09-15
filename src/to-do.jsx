import React, { useRef, useState } from 'react'
import Card from './card'

const Todo2 = () => {
  const nameRef = useRef(null)
  const surnameRef = useRef(null)
  const [value, setValue] = useState([])

  const submit = (e) => {
    e.preventDefault()

    const name = nameRef.current?.value.trim()
    const surname = surnameRef.current?.value.trim()

    if (!name || !surname) return

    let data = [{ name, surname, id: Date.now() }, ...value]
    setValue(data)

    // inputlarni tozalash
    if (nameRef.current) nameRef.current.value = ''
    if (surnameRef.current) surnameRef.current.value = ''
  }

  return (
    <div className="w-[60%] m-auto py-5">
      <form onSubmit={submit}>
        <input
          type="text"
          ref={nameRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John"
          required
        />

        <input
          type="text"
          ref={surnameRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
          placeholder="Doe"
          required
        />

        <br />
        <button
          type="submit"
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 
                     focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                     rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>

      <ul className="mt-5">
        {value.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default Todo2
