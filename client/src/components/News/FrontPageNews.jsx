import React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton  from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";
import { SaveButton, ShareButton } from "../Button/ActionButton";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../App";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const now = new Date().getTime();


const NewsItem = (props) => {
  const [isloaded, setIsloaded] = useState(false);
  const [displayedDate, setDisplayedDate] = useState("");
  


  const publishDate = new Date(props.publishedAt).getTime();

  //get second difference between now and publishDate
  const secondDifference = Math.floor((now - publishDate) / 1000);
  const minuteDifference = Math.floor(secondDifference / 60);
  const hourDifference = Math.floor(minuteDifference / 60);
  const dayDifference = Math.floor(hourDifference / 24);

  const timeDifference = () => {
    if (secondDifference < 60) {
      return `${secondDifference} seconds ago`;
    } else if (minuteDifference < 60) {
      return `${minuteDifference} minutes ago`;
    } else if (hourDifference < 24) {
      return `${hourDifference} hours ago`;
    } else {
      return `${dayDifference} days ago`;
    }
  }
  useEffect(() => {
    setDisplayedDate(timeDifference());
  } , [props]);


  return (
    <div>
      <Stack
        mt={2}
        spacing={2}
        alignItems="center"
        direction="row"
      >
        <Skeleton
          sx={{ display: isloaded ? "none" : "block" }}
          width={100}
          height={100}
        />
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
            maxHeight: { xs: 80, md: 150 },
            maxWidth: { xs: 80, md: 150 },
            borderRadius: "20%",
          }}

          
          src={props.urlToImage||
              "https://thumbs.dreamstime.com/b/simple-illustration-image-unavailable-icon-image-unavailable-icon-123950183.jpg"}
          onLoad={() => setIsloaded(true)}
        />

        <Link href={props.url} color="inherit" target="_blank" rel="noreferrer" >
          {props.title}
        </Link>
      </Stack>
      <Stack
        mt={2}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
      >
        <Typography variant="h6">{displayedDate}</Typography>
        <div className="actionArea">
          <SaveButton />
          <ShareButton url={props.url} />
        </div>
      </Stack>
    </div>
  );
};

const FrontPageNews = ({cate}) => {
  const viewPerPage = 3;
  const totalResult = 24;

  const api_url = process.env.NODE_ENV === 'development'?'http://localhost:8000':'news-api-david.herokuapp.com';

  const [pageNumber, setPageNumber] = useState(1);
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {location} = useContext(LocationContext);

  const increment = () => {
    pageNumber < totalResult / viewPerPage
      ? setPageNumber(pageNumber + 1)
      : setPageNumber(1);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`/news/getNewsFeed/${location}/${cate}/1`)
    .then((res) => {setQueryResult(() => res.data["articles"])

  setLoading(false);})
    .catch((e) => setError(true))
  }, [location]);

  return (
    <>
    {loading? <Skeleton variant="rect" width="100%" height={650} /> :
    <Box >
      <Paper elevation={2}>
        <div className="fontpageContent" style={{ margin: "20px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            mt={2}
            height="100px"
          >
            <Typography
              component={NavLink}
              to={cate}
              variant="h5"
              textTransform="uppercase"
              sx={{ ":hover": { textDecoration: "underline" } }}
            >
              {cate} &gt;
            </Typography>
            <div className="actionAera">
              <IconButton
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton onClick={increment}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          </Stack>
          <Stack
            direction="column"
            divider={<Divider variant={"middle"} />}
            spacing={2}
          >
            {queryResult.slice(viewPerPage * (pageNumber - 1),viewPerPage * pageNumber
      ).map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </Stack>
        </div>
      </Paper>
    </Box>}</>
  );
};

export default FrontPageNews;
