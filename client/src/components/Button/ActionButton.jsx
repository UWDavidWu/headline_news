import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';




const SaveButton = (props) => {
  const {enqueueSnackbar} = useSnackbar();


  const handleSave = () => {
    setSaved(!saved);
    saved? enqueueSnackbar('Removed') : enqueueSnackbar('Saved');
  }

  return <IconButton onClick={props.handleSave}>{props.saved? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}</IconButton>

}

const ShareButton = ({url}) => {
  const {enqueueSnackbar} = useSnackbar();
  
  
  const handleShare = () => {
    navigator.clipboard.writeText(url)
    enqueueSnackbar('Url copied');
  }

  
  return <IconButton onClick={handleShare}><ShareOutlinedIcon /></IconButton>

}



export {SaveButton, ShareButton}