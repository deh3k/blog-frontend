import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createPost, setDefaultValues, setIsFinish, setPostId, updatePost } from '../../store/reducers/postFormSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomEditor from '../CustomEditor/CustomEditor'
import { formatTags } from '../../utils/formTags'

const categoriesOption = ['Travel', 'Science', 'Technology', 'My story', 'Nature', 'Animals', 'Sci-Fi', 'Sci-Pop', 'Health', 'Design', 'IT']

interface IFormInputs {
  category: string | null

}

export default function ToolbarCategory() {

  const [searchParams, setSearchParams] = useSearchParams()

  const { handleSubmit, register, control, setValue } = useForm<IFormInputs>({
    defaultValues: {
      category: null
    }
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    if (data.category) {
      setSearchParams({ category: data.category, page: '1' })
    } else {
      searchParams.delete('category')
      searchParams.delete('term')
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    const searchCategory = searchParams.get('category')
    if (searchCategory && categoriesOption.includes(searchCategory)) {
      setValue('category', searchParams.get('category'))
    } else {
      setValue('category', null)
    }
  }, [searchParams.get('category')])

  return (
    <Box sx={{
      flexGrow: 1,
      maxWidth: { sm: '300px', xs: 'none' },
      m: { sm: '0', xs: '15px 0' },
      display: { md: 'none', sm: 'block' }
    }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              options={categoriesOption}
              onChange={(event, values) => onChange(values)}
              value={value}
              size="small"
              sx={{ maxWidth: { sm: '300px', xs: 'none' }, width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                />
              )}
            />
          )}
        />
        <Button type='submit' sx={{ display: 'none' }}></Button>
      </form>
    </Box>

  )
}
