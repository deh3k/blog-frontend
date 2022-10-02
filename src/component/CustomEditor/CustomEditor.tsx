import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import './CustomEditor.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAppDispatch } from '../../hooks/redux';
import { postFormSlice } from '../../store/reducers/postFormSlice';
import { Box } from '@mui/material';
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';


interface IProps  {
  onChange: (...event: any[]) => void
  text: string
}

export default function CustomEditor(props: IProps) {

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  useEffect(() => {
    const rawData = mdToDraftjs(props.text);
    const contentState = convertFromRaw(rawData);
    setEditorState(EditorState.createWithContent(contentState))
  }, [props.text])

  return (
    <Editor
      placeholder='Write...'
      editorState={editorState}
      editorClassName="editor"
      wrapperClassName="editor__wrapper"
      toolbarClassName="editor__toolbar"
      stripPastedStyles={true}
      onEditorStateChange={(newState: any) => {
        setEditorState(newState)
        props.onChange(draftjsToMd(convertToRaw(editorState.getCurrentContent())))
      }}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'link', 'image', 'history'],
        inline: {
          inDropdown: false,
          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
        },
      }}
    />
  )
}
