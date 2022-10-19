import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface CoinDetailProps {
  selectedCoinDetails: any;
}

const CoinDetail: FC<CoinDetailProps> = ({ selectedCoinDetails }) => {
  return (
    <>
       <h2 id="modal-title">Coin Details</h2>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
         Name: {selectedCoinDetails && selectedCoinDetails.name ? selectedCoinDetails.name : ""}
        </Typography>
        <Divider />    
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Symbol: {selectedCoinDetails && selectedCoinDetails.symbol ? selectedCoinDetails.symbol : ""}
        </Typography>
        <Divider />    
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Hashing algorithm: {selectedCoinDetails && selectedCoinDetails.hashing_algorithm ? selectedCoinDetails.hashing_algorithm : ""}
        </Typography>
        <Divider />  
        <Typography id="transition-modal-description" sx={{ mt: 2 }} noWrap={true}>
        Description: {selectedCoinDetails && selectedCoinDetails.description && selectedCoinDetails.description.en 
        ? selectedCoinDetails.description.en
        : ""}
        </Typography>
        <Divider />
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Market cap in Euro: {selectedCoinDetails && selectedCoinDetails.market_cap_rank
        ? selectedCoinDetails.market_cap_rank
        : ""}
        </Typography>
        <Divider />
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Homepage: {selectedCoinDetails && selectedCoinDetails.links && selectedCoinDetails.links.homepage && 
        selectedCoinDetails.links.homepage[0]
        ? selectedCoinDetails.links.homepage[0]
        : ""}
        </Typography>
        <Divider />
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Genesis Date: {selectedCoinDetails && selectedCoinDetails.genesis_date 
        ? selectedCoinDetails.genesis_date
        : ""}
        </Typography>
        <Divider />
    </>
  );
};

export default CoinDetail;