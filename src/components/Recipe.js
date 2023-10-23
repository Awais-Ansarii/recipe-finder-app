import React from 'react'

const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div>



      <p>{title}</p>
      <p>{calories}</p>
      <img src={image} alt='img' />
      <ol>
        {
            ingredients.map( (ingredient, index) => (
               <li key={index}>{ingredient.text}</li>
                 )
            )
        }
      </ol>
    </div>
  )
}

export default Recipe
