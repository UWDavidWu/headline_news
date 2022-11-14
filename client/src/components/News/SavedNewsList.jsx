import News from "./News";
import { Skeleton, Grid } from "@mui/material";


const SavedNewsList = ({ saved }) => {


  return (
    <Grid container spacing={4}>
      {saved.map(($, index) => {
        return (
          <Grid item xs={12} md={6} lg={4}>
            <News key={index} $={$} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SavedNewsList;
