import { useState, useContext } from "react";
import { UserContext } from "../../App";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginForm = () => {
  const [open, setOpen] = useState(false);

  const { setUser } = useContext(UserContext);

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
        Sign In
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle id="simple-dialog-title">
          Select your login method
        </DialogTitle>
        <List>
          {[
            { name: "Google", icon: <GoogleIcon />, action: "" },
            { name: "Github", icon: <GitHubIcon />, action: "" },
            { name: "Facebook", icon: <FacebookIcon />, action: "" },
            {
              name: "TestUser",
              icon: <AccountCircleIcon />,
              action: () => {
                setUser({
                  id: 1,
                  username: "david",
                  photos: [
                    {
                      value:
                        "https://avatars.githubusercontent.com/u/60896832?v=4",
                    },
                  ],
                });
              },
            },
          ].map(({ name, icon, action }) => (
            <ListItem
              button
              onClick={() =>
                action
                  ? action()
                  : (window.location.href = `/auth/${name.toLowerCase()}`)
              }
              key={name}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default LoginForm;
