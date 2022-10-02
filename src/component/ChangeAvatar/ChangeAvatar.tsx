import { Avatar, Box, Button, Dialog, Slider } from '@mui/material'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import Cropper, { Area, Point } from "react-easy-crop";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import getCroppedImg from '../../utils/cropImage';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import './ChangeAvatar.scss'
import { updateAvatar } from '../../store/reducers/userSlice';
import { setError } from '../../store/reducers/errorsSlice';

export default function ChangeAvatar() {

  const dispatch = useAppDispatch()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<any>(null)

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const [zoom, setZoom] = useState(1)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [objFit, setObjFit] = useState<'vertical-cover' | 'horizontal-cover' | 'contain'>('contain')

  const userPhoto = useAppSelector(state => state.userReducer.user.photo)

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

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null && e.currentTarget.files.length !== 0) {
      setObjFit('contain')
      const file = e.currentTarget.files[0]
      if(file.size > 1572864) {
        dispatch(setError('Image size should not exceed 1.5 MB'))
      } else {
        const src = window.URL.createObjectURL(file)
        getDimensions(src)
        setPreview(src)
      }
    }
  }

  const handleCancel = () => {
    setPreview(null)
    setOpen(false)
  }

  const handleSave = async () => {
    const canvas = await getCroppedImg(preview, croppedAreaPixels)
    const formData = new FormData()
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          formData.append('img', blob)
          dispatch(updateAvatar(formData))
        }
      })
    }
    setOpen(false)
    setPreview(null)
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, []);

  return (
    <Box>
      <Box onMouseEnter={() => setIsEdit(true)} onClick={() => setOpen(true)} sx={{ position: 'relative', mr: '10px', }}>
        <Box onMouseLeave={() => setIsEdit(false)} className='avatar-edit' sx={{
          display: isEdit ? 'flex' : 'none',
        }}>
          <PhotoCameraIcon sx={{ color: 'white' }} />
        </Box>
        <Box sx={{ width: '74px', height: '74px' }}>
          {userPhoto ?
            <Box component="img" src={`${process.env.REACT_APP_API_URL}/${userPhoto}`} sx={{ width: '100%', height: '100%', borderRadius: '100%' }} />
            :
            <Avatar sx={{ width: '74px', height: '74px', backgroundColor: 'primary.light' }}/>
          }
        </Box>
      </Box >
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ height: '100% ', '& div': { overflowY: 'visible' } }}>
        <Box sx={{ backgroundColor: 'white' }}>
          <Box sx={{ width: '300px', height: '300px', p: '20px' }}>
            {preview && objFit !== 'contain' && 
              <Box sx={{position: 'relative', width: '300px', height: '300px' }}>
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  maxZoom={4}
                  aspect={1}
                  cropShape={'round'}
                  objectFit={objFit}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </Box>
            }
            {!preview &&
              <>
                {userPhoto
                  ?
                  <Box component="img" src={`${process.env.REACT_APP_API_URL}/${userPhoto}`} sx={{ width: '100%', height: '100%', borderRadius: '100%' }} />
                  :
                  <Avatar sx={{ borderRadius: '100%', width: '100%', height: '100%', bgcolor: 'primary.light' }} />
                }
              </>
            }
          </Box>
          <Box sx={{ backgroundColor: 'white', p: '0 15px 15px' }}>
            {preview &&
              <>
                <Slider
                  value={zoom}
                  min={1}
                  step={0.01}
                  max={4}
                  onChange={(e, zoom) => setZoom(Number(zoom))}
                  sx={{ display: 'block', maxWidth: '250px', mt: '10px' }}
                />
              </>
            }
            <Box sx={{ display: 'flex', mt: '5px' }}>
              {preview ?
                <Button onClick={() => handleSave()} color="success" variant="contained" size="medium" sx={{ flexGrow: '1', mr: '8px' }}>
                  Save
                </Button>
                :
                <Button onClick={() => inputFileRef.current?.click()} variant="contained" size="medium" sx={{ flexGrow: '1', mr: '8px' }}>
                  Change
                </Button>
              }
              <Button onClick={() => handleCancel()} color="primary" variant="contained" size="medium" sx={{ flexGrow: '1' }}>Cancel</Button>
            </Box>

            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              onClick={(event) => event.currentTarget.value = ''}
              accept="image/*"
              hidden />
          </Box>
        </Box>
      </Dialog >
    </Box>
  )
}