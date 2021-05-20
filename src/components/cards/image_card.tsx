import React from 'react'

type ImageCardProps = {
  url?: string | undefined
}

export const ImageCard = ({ url }: ImageCardProps) => {
  return (
    <img
      style={{
        border: '1px solid #ddd',
        borderRadius: 4,
        padding: 5,
        width: 350,
      }}
      src={url}
      alt={url}
    />
  )
}
