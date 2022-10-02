import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createPost, deleteFile, setDefaultValues, setIsFinish, setPostId, updatePost } from '../../store/reducers/postFormSlice'
import { useNavigate } from 'react-router-dom'
import CustomEditor from '../CustomEditor/CustomEditor'
import { formatTags } from '../../utils/formTags'
import { setError } from '../../store/reducers/errorsSlice'

const categoriesOption = ['Travel', 'Science', 'Technology', 'My story', 'Nature', 'Animals', 'Sci-Fi', 'Sci-Pop', 'Health', 'Design', 'IT']

interface IFormInputs {
  title: string
  categories: string[]
  tags: string
  text: string
}

interface IProps {
  title: string
  categories: string[]
  tags: string[]
  text: string
} 

export default function PostForm(props: IProps) {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const preview = useAppSelector(state => state.postFormReducer.postPreview)
  const isFinish = useAppSelector(state => state.postFormReducer.isFinish)
  const postId = useAppSelector(state => state.postFormReducer.postId)
  const submitType = useAppSelector(state => state.postFormReducer.submitType)
  const postToUpdateImg = useAppSelector(state => state.postFormReducer.postToUpdate.img)

  const [categoriesErr, setCategoriesErr] = useState('')
  const [tagsErr, setTagsErr] = useState('')

  const { handleSubmit, register, control, formState: { errors }, reset, setFocus } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      title: props.title,
      categories: props.categories,
      tags: props.tags.join(', '),
      text: props.text,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const formTags = formatTags(data.tags)
    if (formTags.length > 10 || data.categories.length > 5) {
      if (formTags.length > 10) {
        setTagsErr('Maximum number of tags 10')
      }
      if (data.categories.length > 5) {
        setCategoriesErr('Maximum number of categories 5')
      }
    } else {
      const postData = {
        ...data,
        tags: formTags,
        img: preview,
      }
      if(submitType === 'create') {
        dispatch(createPost(postData))
      } else if (submitType === 'update') {
        dispatch(updatePost({...postData, postId: postId}))
      }
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length > 0 || categoriesErr || tagsErr) {
      dispatch(setError('Fill out the form correctly'))
    }
  }, [errors, categoriesErr, tagsErr])

  useEffect(() => {
    return(() => {
      if((!isFinish && (submitType === 'create' && !!preview) || (submitType === 'update' && !!preview && preview !== postToUpdateImg))) {
        dispatch(deleteFile(preview))
      }
    })
  }, [preview, postToUpdateImg, isFinish, submitType])


  useEffect(() => {
    if (isFinish) {
      navigate(`/post/${postId}`)
      reset()
    }
    return (() => {
      if(isFinish) {
        dispatch(setIsFinish(false))
        dispatch(setDefaultValues())
      }
    })
  }, [isFinish])  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Box component={'div'} sx={{ mb: '30px' }}>
        <TextField
          error={!!errors.title}
          helperText={errors.title?.message}
          variant="standard"
          placeholder="Title..."
          fullWidth
          sx={{ '& input': { fontSize: '36px', fontWeight: '600' } }}
          {...register('title', { 
            required: 'This field is required',
            maxLength: {value: 70, message: 'Max length is 70'},
          })}
        />
      </Box>

      <Box component={'div'} sx={{ mb: '30px' }}>
        <Controller
          control={control}
          name="categories"
          rules={{
            required: 'This field is required',
            maxLength: { value: 5, message: 'Max length 5' },
          }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              options={categoriesOption}
              onChange={(event, values) => onChange(values)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.categories || !!categoriesErr}
                  helperText={errors.categories?.message || categoriesErr}
                  label="Categories"
                  variant="outlined"
                  sx={{mb: '10px'}}
                />
              )}
            />
          )}
        />
        <Typography variant='body2' color="text.secondary">
          Select from 1 to 5 chapters on the topic of publication
        </Typography>
      </Box>

      <Box component={'div'} sx={{ mb: '30px' }}>
        <TextField
          error={!!errors.tags || !!tagsErr}
          helperText={errors.tags?.message || tagsErr}
          label="Tags"
          variant="outlined"
          fullWidth
          sx={{ mb: '10px' }}
          {...register('tags', { required: 'This field is required' })}
        />
        <Typography variant='body2' color="text.secondary">
          Enter 1 to 10 keywords here, separating them with commas
        </Typography>
      </Box>

      <Box component={'div'} sx={{ mb: '30px' }}>
        {errors.text && <Typography color="error" sx={{ mb: '10px' }}>{errors.text?.message}</Typography>}
        <Controller
          control={control}
          name="text"
          rules={{
            required: 'This field is required',
            minLength: { value: 200, message: 'Min length is 200'}
          }}
          render={({ field: { onChange, value } }) => (
            <CustomEditor onChange={onChange} text={props.text}/>
          )}
        />
      </Box>

       <Button type="submit" variant="contained" size="large" sx={{ width: '130px' }}>
        {submitType === 'create' ? 'Post' : 'Update'}
      </Button>
      
    </form>
  )
}
