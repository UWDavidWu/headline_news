import News from "./News";
import { LocationContext } from "../../App";
import { useEffect, useState, useContext } from "react";
import { Skeleton, Grid } from "@mui/material";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const NewsList = ({ category, q}) => {
  const { location } = useContext(LocationContext);
  const { ref, inView } = useInView();
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
    if (!loading && hasMore) {
      setPageNumber(pageNumber + 1);
    };
  }, [inView]);

  //console log news on change
  useEffect(() => {
    setNews([]);
  }, [q]);



  useEffect(() => {
    setLoading(true);
    setError(false);

    const route = q
      ? `/news/getQueryFeed/${q}/${pageNumber}`
      : `/news/getNewsFeed/${location}/${category}/${pageNumber}`;
    axios
      .get(route) 
      .then((res) => {
        setNews((previousnews) => [...previousnews, ...res.data["articles"]]);
        setLoading(false);
        setHasMore(
          res.data["totalResults"] - pageNumber * 12 > 0 && pageNumber < 8
        );
      })
      .catch((e) => setError(true));
  }, [q, pageNumber]);



  return (
      <Grid container spacing={4}>
        {(loading && pageNumber == 1)? (
          <>
            {[...Array(12)].map(() => (
              <Grid item xs={12} sm={6} lg={4}>
                <Skeleton animation="wave" variant="rectangular" height={300} />
                <Skeleton animation="wave"  height={200} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {news.map(($, index) => {
              return (
                <Grid ref={news.length === index + 1 ? ref : null}
                  item xs={12} md={6} lg={4} >
                  <News key={index} $={$} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
  );
};

export default NewsList;
