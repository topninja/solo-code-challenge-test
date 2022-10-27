import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Grid, Divider, Table, TableHead, TableRow, TableCell, TableBody, TextField, Container, FormControl, CircularProgress } from '@mui/material'

import Header from "./components/Header";

import axios from "axios";

function App() {
  const [userType, setUserType] = useState('rep');
  const [state, setState] = useState('AL');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayUser, setDisplayUser] = useState<any>();

  useEffect(() => {
    let url = userType === 'rep' ? '/representatives/' : '/senators/';
    url = import.meta.env.VITE_BACKEND_URL + url + state;
    try {
      setIsLoading(true);
      axios.get(url).then(data => {
        if (data.data.success) {
          setUsers(data.data.results);
          setIsLoading(false);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }, [state, userType]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Header
          userType={userType}
          setUserType={setUserType}
          state={state}
          setState={setState}
        />
        <Divider sx={{ mt: 1 }}></Divider>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <h2>List /
              <span className="list-header-info">
                {
                  userType === 'rep' ? 'Representative' : 'Senator'
                }
              </span>
            </h2>
            {isLoading && <CircularProgress />}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Party</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  users.map((user: any, index) => {
                    return (<TableRow key={index} hover onClick={() => setDisplayUser(user)}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align='center'>
                        {user.party}
                      </TableCell>
                    </TableRow>)
                  })
                }
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={6}>
            <h2>Info</h2>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField variant="filled" label="First name" value={displayUser?.name || ''} />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Last Name" variant="filled" value={displayUser?.name || ''} />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="District" variant="filled" value={displayUser?.district || ''}/>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Phone" variant="filled" value={displayUser?.phone || ''}/>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField label="Office" variant="filled" value={displayUser?.office || ''}/>
            </FormControl>
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<Navigate to="/representatives/AL" />} />
        </Routes>
      </Container>
    </BrowserRouter>

  )
}

export default App
