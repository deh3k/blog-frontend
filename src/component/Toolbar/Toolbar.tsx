import { Autocomplete, Box, Button, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { fetchPosts } from '../../store/reducers/blogSlice';

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

interface IFormInputs {
  term: string
  category: string | null
}

const categoriesOption = ['Travel', 'Science', 'Technology', 'My story', 'Nature', 'Animals', 'Sci-Fi', 'Sci-Pop', 'Health', 'Design',]


export default function Toolbar({ children }: IProps) {


  const [searchParams, setSearchParams] = useSearchParams()

  const { register, handleSubmit, control, setValue } = useForm<IFormInputs>({
    defaultValues: {
      term: '',
      category: null,
    }
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const params: {category?: string, term?: string} = {}
    if(data.category) {
      params.category = data.category
    } 
    if(data.term) {
      params.term = data.term
    }
    setSearchParams({...params, page: '1'})
  }

  useEffect(() => {
    const searchTerm = searchParams.get('term')
    if (searchTerm) {
      setValue('term', searchTerm)
    } else {
      setValue('term', '')
    }
  }, [searchParams.get('term')])

  useEffect(() => {
    const searchCategory = searchParams.get('category')
    if (searchCategory && categoriesOption.includes(searchCategory)) {
      setValue('category', searchCategory)
    } else {
      setValue('category', null)
    }
  }, [searchParams.get('category')])

  return (
    <Paper elevation={0} sx={{
      maxWidth: '100%',
      p: '10px 24px',
      backgroundColor: 'white',
    }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          display: { md: 'flex', sm: 'block' },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Box justifyContent='space-between' alignItems='center' sx={{
            display: { sm: 'flex', xs: 'block' },
            mb: { md: '0', sm: '15px', xs: 0 },
          }}>
            {children}
            <Box sx={{
              flexGrow: 1,
              maxWidth: { sm: '300px', xs: 'none' },
              display: { md: 'none', sm: 'block' },
              m: { sm: '0', xs: '15px 0' },
            }}
            >
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
            </Box>
          </Box>

          <TextField
            id="outlined-search"
            size='small'
            label="Search"
            type="search"
            sx={{ width: { md: 280, sm: '100%', xs: '100%' }, }}
            {...register('term')}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" size="medium" sx={{
          display: { md: 'none', sm: 'block' },
          mt: '15px',
          width: '100%'
        }}>Search
        </Button>

      </form>
    </Paper>
  );
}
