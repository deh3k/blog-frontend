import { Box, Button, Slider, Typography } from '@mui/material'
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setPreview, uploadFile } from '../../store/reducers/postFormSlice'
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from '../../utils/cropImage'
import { setError } from '../../store/reducers/errorsSlice';

interface IProps {
  preview?: string
}

export default function ChangePreview(props: IProps) {

  const dispatch = useAppDispatch()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [objFit, setObjFit] = useState<'vertical-cover' | 'horizontal-cover' | 'contain'>('contain')

  const [previewFile, setPreviewFile] = useState<string | null>(null)

  const preview = useAppSelector(state => state.postFormReducer.postPreview)

  const getDimensions = async (src: string) => {
    const img = new Image()
    img.src = src 
    img.onload = () => {
      if(img.width > img.height) {
        setObjFit('vertical-cover')
      } else {
        setObjFit('horizontal-cover')
      }
    }
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null && e.currentTarget.files.length !== 0) {

      setObjFit('contain')
      const file = e.currentTarget.files[0]
      if(file.size > 1048576) {
        dispatch(setError('Image size should not exceed 1 MB'))
      } else {
        const src = window.URL.createObjectURL(file)
        getDimensions(src)
        setPreviewFile(src)
        dispatch(setPreview(''))
      }
    }
  }

  const handleDeletePreview = () => {
    setPreviewFile(null)
    dispatch(setPreview(''))
  }

  const handleSave = async () => {
    const canvas = await getCroppedImg(previewFile, croppedAreaPixels)
    const formData = new FormData()
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          formData.append('img', blob)
          dispatch(uploadFile(formData))
        }
      }, 'image/jpeg', 0.9  )
    }
    setPreviewFile(null)
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);


  useEffect(() => {
    if (props.preview) {
      dispatch(setPreview(props.preview))
    }
  }, [props.preview])

  return (
    <>
      <Box sx={{
        maxWidth: '780px',
        width: '100%',
        pb: '56.25%',
        position: 'relative',
        border: previewFile ? 'none' : '1px solid #DCDCDC',
        touchAction: 'none'
      }}>
        {previewFile && objFit !== 'contain' &&
          <Cropper
            image={previewFile}
            crop={crop}
            zoom={zoom}
            maxZoom={4}
            aspect={ 16 / 9 }
            objectFit={objFit}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        }
        {preview &&
          <Box component={'img'} src={`${process.env.REACT_APP_API_URL}/${preview}`} sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
          }} />
        }
      </Box>
      {previewFile &&
        <Slider
          value={zoom}
          min={1}
          step={0.01}
          max={4}
          onChange={(e, zoom) => setZoom(Number(zoom))}
          sx={{ display: 'block', maxWidth: '250px', mt: '10px' }}
        />
      }
      <Box sx={{ mt: '10px', mb: '30px' }}>
        {previewFile &&
          <>
            <Button onClick={() => handleSave()} color="success" variant="contained" size="large" sx={{ mr: '15px' }}>Save</Button>
            <Button onClick={() => handleDeletePreview()} color="error" variant="contained" size="large">Delete</Button>
          </>
        }
        {!previewFile &&
          <Button onClick={() => inputFileRef.current?.click()} variant="contained" size="large">
            Load Preview
          </Button>
        }
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          onClick={(event) => event.currentTarget.value = ''}
          accept="image/*"
          hidden />
      </Box>
    </>
  )
}
