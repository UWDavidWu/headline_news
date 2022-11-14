import { useContext,useState,useEffect } from "react";
import { UserContext } from "../App";
import SavedNewsList from "../components/News/SavedNewsList";
import axios from "axios";

const SavedNews = () => {
  //get user from context

  const [news, setNews] = useState([]);
  const { user } = useContext(UserContext);


  useEffect(() => {
    axios
      .get(`/news/getSaved`)
      // .get(`http://localhost:8000/auth/news`)
      .then((res) => {
        setNews(res.data);

      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <div className="container">
      {news ?(
        <SavedNewsList saved={news} />

      ): (
        <h1>No bookmark yet</h1>
      )  } 
    </div>
  );
};

export default SavedNews;
