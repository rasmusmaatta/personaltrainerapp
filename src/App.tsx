import './App.css'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';
import { Link, Navigate, Route, Routes } from 'react-router';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

function App() {


  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Personal Trainer App
            </Typography>
            <Button color="inherit" component={Link} to="/customers">
              Customers
            </Button>
            <Button color="inherit" component={Link} to="/trainings">
              Trainings
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
