// material-ui

import { Grid, Typography } from '@mui/material';

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Get out !</Typography>
      </Grid>
    </Grid>
  );
}
