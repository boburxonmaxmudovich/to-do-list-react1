import React, { useState } from 'react'

const Card = ({ id, brand, model, active, createdAt, updatedAt, remove, edit, toggleActive }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newBrand, setNewBrand] = useState(brand)
  const [newModel, setNewModel] = useState(model)

  const handleSave = () => {
    edit(id, newBrand, newModel)
    setIsEditing(false)
  }

  return (
    <li className={`border p-3 rounded shadow ${active ? 'bg-green-100' : ''}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <input
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p><strong>Name:</strong> {brand}</p>
          <p><strong>surname:</strong> {model}</p>
          <p><small>Created: {createdAt}</small></p>
          {updatedAt && <p><small>Updated: {updatedAt}</small></p>}
          <div className="mt-2 flex gap-2">
            <button className="bg-red-500 text-white px-2 py-1 rounded boder-[12px]" onClick={() => remove(id)}>
              Delete
            </button>
            <button className="bg-yellow-500 text-white px-2 py-1 rounded boder-[12px]" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className={`px-2 py-1 rounded ${active ? 'bg-gray-600' : 'bg-green-800'} text-white boder-[12px]`}
              onClick={() => toggleActive(id)}
            >
              {active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default Card
