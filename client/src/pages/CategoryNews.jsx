import NewsList from "../components/News/NewsList";
import { useEffect } from "react";
const CategoryNews = ({cate="", q=""}) => {

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="container">
      <NewsList key={cate} category={cate} q={q}/>
    </div>
  );
};

export default CategoryNews;
