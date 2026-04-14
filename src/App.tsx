import './App.css'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container"
import AppBar from '@mui/material/AppBar';
import Typography from "@mui/material/Typography"
import CustomerList from './components/CustomerList';

function App() {


  return (
    <>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Typography variant= "h6">Customer list</Typography>
        </AppBar>
        <CustomerList />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
