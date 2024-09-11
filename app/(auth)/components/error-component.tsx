import React from 'react'

type ErrorComponentProps = {
    message: string
}

export default function ErrorComponent({message}:ErrorComponentProps) {
  return (
    <p>
      {message}
    </p>
  )
}
