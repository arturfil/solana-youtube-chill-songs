import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppBar, Button, Container, Grid, TextField, Typography } from "@mui/material";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import NotAuthPage from "./pages/NotAuthPage";

// delcare global interface
declare global {
  interface Window {
    solana: any;
  }
}

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    checkIfWalletConnected();
  }, [walletAddress])

  const checkIfWalletConnected = async () => {
    try {
      const { solana } = window;
      if (!solana) console.log("Solana object not found");

      if (solana && solana.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
        console.log("found wallet", response.publicKey.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectToWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  return (
    <>
      <Container sx={{marginTop: 5}}>
        <Grid container spacing={2}>
          { walletAddress ? 
            <AuthenticatedPage/> : 
            <NotAuthPage func={connectToWallet} />
          }
        </Grid>
      </Container>
    </>
  );
}

export default App;
