import React, { useRef, useState, useEffect } from 'react'
import Card from './card'

const Todo = () => {
  const brandRef = useRef(null)
  const modelRef = useRef(null)

  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem('value')
    return saved ? JSON.parse(saved) : []
  })

  const [search, setSearch] = useState('')
  useEffect(() => {
    localStorage.setItem('value', JSON.stringify(value))
  }, [value])
  const submit = (e) => {
    e.preventDefault()
    const brand = brandRef.current?.value.trim()
    const model = modelRef.current?.value.trim()

    if (!brand || !model) return
    const newItem = {
      id: Date.now(),
      brand,
      model,
      active: false,
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
    }

    setValue([newItem, ...value])

    brandRef.current.value = ''
    modelRef.current.value = ''
  }
  const remove = (id) => {
    setValue(value.filter((i) => i.id !== id))
  }
  const edit = (id, newBrand, newModel) => {
    setValue(
      value.map((i) =>
        i.id === id
          ? { ...i, brand: newBrand, model: newModel, updatedAt: new Date().toLocaleString() }
          : i
      )
    )
  }

  const toggleActive = (id) => {
    setValue(
      value.map((i) =>
        i.id === id ? { ...i, active: !i.active } : i
      )
    )
  }
// buni chattan oldim 
  const progress = Math.round((value.filter((i) => i.active).length / value.length) * 100) || 0

  const filtered = value.filter(
    (i) =>
      i.brand.toLowerCase().includes(search.toLowerCase()) ||
      i.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-[60%] m-auto py-5">
      <h1 className="text-xl font-bold mb-3">Todo List</h1>

      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-gray-400 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{progress}% Active</p>

      
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          ref={brandRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required
        />
        <input
          type="text"
          ref={modelRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <ul className="mt-5 space-y-2">
        {filtered.map((item) => (
          <Card
            key={item.id}
            {...item}
            remove={remove}
            edit={edit}
            toggleActive={toggleActive}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todo
