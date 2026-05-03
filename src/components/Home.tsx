import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        gap: 3,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: "#ED6C02" }}>
        Welcome to Personal Trainer App
      </Typography>
      <Stack direction="row" spacing={10}>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/customers"
          size="large"
        >
          Customers
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/trainings"
          size="large"
        >
          Trainings
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/calendar"
          size="large"
        >
          Calendar
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="statistics"
          size="large"
        >
          Statistics
        </Button>
      </Stack>
    </Box>
  );
}
