import Paper from '@mui/material/Paper';
import Image from '../../assets/background.png';

import { styled } from 'theme';

const BackgroundPaper = styled(Paper)`
  background-image: url(${Image});
  background-size: 100% 100%;
`;

interface ApeNFTProps {
  id: string;
  positionX: number;
  positionY: number;
  src: string;
}

const ApeNFT = styled('img')<{ positionx: number; positiony: number }>`
  position: absolute;
  top: ${props => props.positiony}%;
  left: ${props => props.positionx}%;
  border-radius: 50%;
  cursor: not-allowed;
`;

export { ApeNFT, BackgroundPaper };
