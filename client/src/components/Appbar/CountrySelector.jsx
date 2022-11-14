import { useState, useContext } from "react";
import { LocationContext } from "../../App";
import { countryList } from "../../constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const CountrySelector = () => {
  const { setLocation } = useContext(LocationContext);

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Tooltip title="Select Location">
        <IconButton
          aria-controls="location-selector"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <LocationOnIcon />
        </IconButton>
      </Tooltip>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        id="location-selector"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {countryList.map((country, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setAnchorEl(null);
              setLocation(country.code);
            }}
          >
            {country.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CountrySelector;
