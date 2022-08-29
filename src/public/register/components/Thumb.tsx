import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'

export const Thumb = ({ file }: { file: Blob }) => {
  const [loading, setLoading] = useState(false)
  const [thumb, setThumb] = useState<string>('')

  useEffect(() => {
    if (file) {
      setLoading(true)

      const reader = new FileReader()

      reader.onloadend = () => {
        setLoading(false)

        if (typeof reader.result === 'string') {
          setThumb(reader.result)
        }
      }

      reader.readAsDataURL(file)
    }
  }, [file])

  if (loading) {
    return <p>loading...</p>
  }

  if (thumb) {
    return (
      <Box>
        <img src={thumb} height='auto' width={500} />
      </Box>
    )
  } else {
    return <p>Preview</p>
  }
}
