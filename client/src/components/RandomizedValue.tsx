import React from "react";
import Button from '@mui/material/Button';
import CasinoIcon from '@mui/icons-material/Casino';
import Chip from '@mui/material/Chip';

interface Props{
  name: string,
  value: string,
  rerollFunction: () => void
}

const RandomizedValue = ({name, value, rerollFunction}: Props) => {
  const handleReroll = () => {
    rerollFunction();
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Chip sx={{ fontSize: '0.75em', padding: '8px 16px', top: '12px'}} onClick={handleReroll} label={value} variant="outlined" color="success" icon={<CasinoIcon />} />
        <span style={{ display: 'block', fontSize: '0.4em', marginTop: '12px' }}>{name}</span>
      </div>
    </>
  );
};

export default RandomizedValue;

