import React from 'react'

interface ButtonProps {
  type: "button" | "submit" | "reset"
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 text-md' type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
