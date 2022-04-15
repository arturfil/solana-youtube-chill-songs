import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VideoCard, { Video } from "../components/VideoCard";

const initialVideos = [
  { title: "Chill Waves", url: "one" },
  { title: "Chill Mountains", url: "two" },
  { title: "Chill Rocks", url: "three" },
  { title: "Chill Dunes", url: "four" },
];

export default function AuthenticatedPage() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmitVideo = (url: string, title: string) => {
    if (url.length == 0 || title.length == 0) {
      alert("All fields are required");
      return;
    } 
      
    setVideos([...videos, { url, title }]);
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <Grid item container spacing={12} sx={{ marginBottom: 4 }}>
        <Grid item xs={9}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Welcome to Chill Sounds on Solana Verse
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3">💻</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <TextField 
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth 
            label="Title" 
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
            onChange={e => setUrl(e.target.value)}
            value={url}
            fullWidth 
            label="Video URL" 
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={() => handleSubmitVideo(url, title)}
            id="gradient-button"
            variant="contained"
          >
            Enter
          </Button>
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} sx={{ margin: "0 auto" }}>
        {videos.map((vid) => (
          <Grid item xs={4}>
            <VideoCard video={vid} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
