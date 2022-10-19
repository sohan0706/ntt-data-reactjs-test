import React, { FC, useState, useEffect } from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CoinDetail from "./CoinDetail";
import TablePagination from '@mui/material/TablePagination';
const apiUrl = "https://api.coingecko.com/api/v3";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Coins: FC = (props) => {
  // const [page, setPage] = React.useState(0);
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ selectedCoinDetails, setSelectedCoinDetails ] = useState<any>();
  const [ openModal, setOpenModal ] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    const coinsApiUrl = apiUrl + "/coins/markets";
    axios.get(coinsApiUrl, {
      params: {
        vs_currency: "eur",
        order: "market_cap_desc",
        sparkline: false,
        per_page: 10,
        page: 1
      }
      })
      .then((response) => {
          setCoinsList(response.data);
          setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

  }, []); // Whenever the current 'page' or the amount of 'rowsPerPage' change, your request will be fired again.

  const openModalHandler = (id: string) => {
    setOpenModal(true);
    getCoinsDetailsApiHandler(id);
  }

  const getCoinsDetailsApiHandler = (id: string) => {
    setLoading(true);
    const coinsIdUrl = apiUrl + "/coins/" + id;
    axios.get(coinsIdUrl, {
      })
      .then((response) => {
          setSelectedCoinDetails(response.data);
          setLoading(false);
      })
      .catch((error) => {
        setSelectedCoinDetails(null);
        setLoading(false);
      });
  }

  const handleClose = () => {
    setOpenModal(false);
    setSelectedCoinDetails(null);
  }
  console.log(coinsList);
  return (
    <div className='coins-container'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Img</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Current Price</TableCell>
            <TableCell align="left">High 24 hour Price</TableCell>
            <TableCell align="left">Low 24 hour Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, image, name, symbol, current_price, low_24h, high_24h}: any, index) => (
            <TableRow
              key={index}
              onClick={() => openModalHandler(id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={image} width={"15px"} height={"15px"}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell component="th" scope="row">
                {symbol}
              </TableCell>
              <TableCell component="th" scope="row">
              &#8364;{current_price}
              </TableCell>
              <TableCell component="th" scope="row">
              &#8364;{high_24h}
              </TableCell>
              <TableCell component="th" scope="row">
              &#8364;{low_24h}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={coinsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
          <CoinDetail selectedCoinDetails={selectedCoinDetails}/>
      </Box>
    </Modal>
    </div>
  );
};

export default Coins;