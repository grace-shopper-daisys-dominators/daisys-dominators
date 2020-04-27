import React from 'react'

const singleCartItem = props => {
  const {items} = props

  return (
    <div>
      {items.map(item => {
        return (
          <div key={item.id}>
            <h2> {item.name} </h2>
            <img src={item.imageURL} />
            <p> {item.color} </p>
            <p> {item.price} </p>
            <p> {item.size} </p>
          </div>
        )
      })}
    </div>
  )
}

export default singleCartItem
