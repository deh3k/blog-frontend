import { TabContext, TabList } from '@mui/lab'
import { Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { fetchPosts } from '../../store/reducers/blogSlice';

interface IProps {
  sort: string
  onChange: (sort: string) => void
  isLoading: boolean
}

export default function ToolbarTabs(props: IProps) {

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({...currentParams, page: '1'})
    props.onChange(newValue);
  };

  return (
    <TabContext value={props.sort}>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
        <Tab label="New" value="createdAt" disabled={props.isLoading}/>
        <Tab label="Best" value="views" disabled={props.isLoading}/>
      </TabList>
    </TabContext>
  )
}
