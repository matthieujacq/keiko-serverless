import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { useState } from 'react';
import nft1 from 'assets/nft1.png';
import nft2 from 'assets/nft2.png';
import nft3 from 'assets/nft3.png';
import nft4 from 'assets/nft4.png';
import nft5 from 'assets/nft5.png';
import axios from 'axios';

import { ApeNFT, BackgroundPaper } from './Home.style';
import { useAudio } from 'hooks';

import coin from '../../assets/coin.mp3';
import kumo from 'assets/kumo.svg';
import { useAsync } from 'react-use';

const client = axios.create({
  baseURL: process.env.VITE_API_URL,
});

interface ApeNFTProps {
  id: string;
  positionX: number;
  positionY: number;
  src: string;
}

interface ApeNFTData {
  id: string;
  positionX: number;
  positionY: number;
  imageIndex: number;
  price?: number;
}

interface UserData {
  id: string;
  score: number;
  name: string;
}

const ApeNFTImgs = [nft1, nft2, nft3, nft4, nft5];

const Home = (): JSX.Element => {
  const [userId, setUserId] = useState('');
  const [score, setScore] = useState(0);
  const [apeNFTs, setApeNFTs] = useState<ApeNFTProps[]>([]);

  const fetchUserData = async () => {
    const id = localStorage.getItem('user-id');
    if (id) {
      // Get user data
      setUserId(id);
      const { data } = await client.get<UserData>(`/users/${id}`);
      setScore(data.score);
    } else {
      // Create a user
      const { data } = await client.post<UserData>('/users');
      setUserId(data.id);
      setScore(data.score);
      localStorage.setItem('user-id', data.id);
    }
  }

  const fetchApeNFTs = async () => {
    const { data } = await client.get<ApeNFTData[]>(`/nfts/${userId}`);
    setApeNFTs(
      data.map(apeNFT => ({
        ...apeNFT,
        src: ApeNFTImgs[apeNFT.imageIndex],
      })),
    );
  }

  useAsync(async () => {
    await fetchUserData();
  }, []);

  useAsync(async () => {
    if (!userId) return; // without this, it works randomly
    await fetchApeNFTs();
  }, [userId]);

  const buyApeNFT = async () => {
    const { data } = await client.post<ApeNFTData>(`/nfts`,  { userId });

    setApeNFTs(prevApeNFTs =>
      prevApeNFTs.concat({ ...data, src: ApeNFTImgs[data.imageIndex] }),
    );
    const {price} = data;
    setScore(prevScore => prevScore - (price??0));
  };

  const sellApeNFT = async (apeNFTId: string) => {
    const {data: { price }} = await client.delete<{price: number}>(`/nfts/${userId}/${apeNFTId}`);

    setApeNFTs(prevApeNFTs => prevApeNFTs.filter(({ id }) => id !== apeNFTId));
    setScore(prevScore => prevScore + price);
  };
  const audio = useAudio(coin, { volume: 0.8, playbackRate: 1 });

  return (
    <Box display="flex" flexDirection="column" height="100vh" maxWidth="100%">
      <AppBar position="sticky">
        <Toolbar style={{ backgroundColor: '#181173' }}>
          <Button>
            <a href="https://dev.to/kumo">
              <img
                src={kumo}
                alt="Kumo Logo"
                width="auto"
                height="50px"
                style={{ marginTop: '15px' }}
              />
            </a>
          </Button>
          <Typography variant="h1" sx={{ flexGrow: 1 }}>
            {'Learn Serverless with Bored Apes'}
          </Typography>
          <Typography
            variant="h1"
            color={score > 0 ? 'green' : 'red'}
            style={{
              padding: '10px',
              backgroundColor: '#f2b056',
              marginTop: '5px',
              marginBottom: '5px',
            }}
            border={score > 0 ? '4mm solid green' : '4mm solid red'}
          >
            {`Score: ${score.toString().padStart(10, ' ')} $`}
          </Typography>
        </Toolbar>
      </AppBar>
      <BackgroundPaper>
        <Box
          display="flex"
          flexDirection="row"
          height="100vh"
          paddingLeft="10%"
          paddingRight="10%"
          justifyContent="space-between"
          maxWidth="100%"
        >
          <Box>
            {apeNFTs.map(apeNFT => (
              <ApeNFT
                height="100px"
                key={apeNFT.id}
                src={apeNFT.src}
                positionx={apeNFT.positionX}
                positiony={apeNFT.positionY}
                onClick={() => {
                  sellApeNFT(apeNFT.id);
                  audio.play();
                }}
              ></ApeNFT>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Button onClick={buyApeNFT}>
              <Typography color="lightblue" fontSize={50}>
                {'Buy ApeNFT'}
              </Typography>
            </Button>
          </Box>
        </Box>
      </BackgroundPaper>
    </Box>
  );
};

export default Home;
