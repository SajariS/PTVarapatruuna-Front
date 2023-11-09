import CustomerList from "./components/CustomerList"

import Toolbar from "@mui/material/Toolbar"
import Container  from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import AppBar from "@mui/material/AppBar";

function App() {

  return (
    <Container maxWidth="lg">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">Customers</Typography>
        </Toolbar>
      </AppBar>
      <CustomerList />
    </Container>
  )
}

export default App
