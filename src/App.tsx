import './App.css'
import { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Route, Routes } from 'react-router';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar'
import Statistics from './components/Statistics';

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static" color="warning">
          <Toolbar sx={{ gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Personal Trainer App
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/personaltrainerapp" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/customers" onClick={handleMenuClose}>
                Customers
              </MenuItem>
              <MenuItem component={Link} to="/trainings" onClick={handleMenuClose}>
                Trainings
              </MenuItem>
              <MenuItem component={Link} to="/calendar" onClick={handleMenuClose}>
                Calendar
              </MenuItem>
              <MenuItem component={Link} to="/statistics" onClick={handleMenuClose}>
                Statistics
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/personaltrainerapp" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
