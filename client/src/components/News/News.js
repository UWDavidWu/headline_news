import { useState, useContext } from "react";
import {
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
  Typography,
  CardActions,
} from "@mui/material";

import { SaveButton, ShareButton } from "../Button/ActionButton";
import axios from "axios";

import { UserContext } from "../../App";

const News = ({ $ }) => {
  const [isloaded, setIsloaded] = useState(false);
  const { user } = useContext(UserContext);

  // const [saved, setSaved] = useState($.subscribedBy == user.id);

  const [saved, setSaved] = useState(false);
  
  

  const handleSave = () => {
    if (saved) {
      axios
        .delete(`/news/deleteNews`, $)
        .then((res) => {
          console.log(res.data);
          setSaved(false);
        })
        .catch((err) => console.log(err));
    } else {  
      axios
        .post(`/news/saveNews`, $)
        .then((res) => {
          console.log(res.data);
          setSaved(true);
        })
        .catch((err) => console.log(err));
    }
  };




  return (
    <Card
      sx={{
        ["@media (min-width:768px)"]: {
          ":hover": {
            transition: "all 0.2s ease-in-out",
            boxShadow: 3,
          },
        },
      }}
    >
      <CardActionArea
        sx={{
          ["@media (min-width:768px)"]: {
            ":hover img": {
              filter: "brightness(1)",
            },
            ":hover h6": {
              textDecoration: "underline",
            },
          },
        }}
        href={$.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Skeleton
          sx={{ display: isloaded ? "none" : "block" }}
          animation="wave"
          variant="rectangular"
          height={400}
        />
        <div className="img-container" style={{ overflow: "hidden" }}>
          <CardMedia
            sx={{
              ["@media (min-width:768px)"]: {
                filter: "brightness(80%)",
              },
              display: isloaded ? "block" : "none",
              transition: "all 0.2s ease-in-out",
            }}
            onLoad={() => setIsloaded(true)}
            component="img"
            height={300}
            image={$.urlToImage || require("../../../src/asset/no_img.png")}
          />
        </div>
        <CardHeader
          title={$.source.name}
          subheader={$.publishedAt.slice(0, -1).split("T")[0]}
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {$.title.split("-")[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <SaveButton saved={saved} handleSave={handleSave}/>
        <ShareButton url={$.url}/>
      </CardActions>
    </Card>
  );
};

export default News;
