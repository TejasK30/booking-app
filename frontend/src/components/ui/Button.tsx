import React from 'react'

interface ButtonProps {
  type: "button" | "submit" | "reset"
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button className='font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded p-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button

