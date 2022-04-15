import { Grid, Button } from '@mui/material'
import React from 'react'

interface Props {
  func: () => void;
}

export default function NotAuthPage({func}:Props) {
  return (
    <Grid item xs={6} >
      <Button
        onClick={func}
        id="gradient-button"
        className="pink-button-gradient"
        variant="contained"
      >
        Connect to Wallet
      </Button>
    </Grid>
  )
}
