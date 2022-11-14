import { mainCategory, newsCategory } from "../../constants";
import { Stack, Divider, Tabs, Tab } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../App";

const Categorybar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const mainCategoryList = user
    ? mainCategory
    : mainCategory.slice(0, mainCategory.length - 1);

  return (
    <Stack
      spacing={2}
      component="ul"
      direction="row"
      style={{
        position: "absolute",
        top: "74px",
        left: "50%",
        height: "32px",
        transform: "translateX(-50%)",
      }}
    >
      <Tabs value={location.pathname} centered>
        {mainCategoryList.map((category, index) => (
          <Tab
            key={index}
            component={NavLink}
            to={category.link}
            label={category.name}
            value={category.link}
          />
        ))}

        <Divider orientation="vertical" variant="middle" flexItem />

        {newsCategory.map((category, index) => (
          <Tab
            key={index}
            component={NavLink}
            to={category.link}
            label={category.name}
            value={category.link}
          />
        ))}
      </Tabs>
    </Stack>
  );
};

export default Categorybar;
