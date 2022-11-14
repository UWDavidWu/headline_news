import { useContext } from "react";
import { UserContext, LocationContext } from "../App";
import { Typography } from "@mui/material";

import FrontPageNews from "../components/News/FrontPageNews";
import Grid from "@mui/material/Grid";
import { newsCategory } from "../constants";
import NewsList from "../components/News/NewsList";

const Home = () => {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);

  // axios.get(`http://localhost:8000/news/getHeadlines/${location}`)

  return (
    <div className="container">
      {user && <Typography variant="h4">Welcome {user.displayName}</Typography>}
      <br />
      <Typography variant="h5">
        Enjoy your headline feed from {location} 
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>
        {newsCategory.slice(0, 6).map(({ name }, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <FrontPageNews cate={name} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
