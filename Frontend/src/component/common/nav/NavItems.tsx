import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Toolbar,
  Divider,
  ListItemButton,
  ListItemText,
  Box,
  AppBar,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Button,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Menu,
} from "@mui/material";
import MenuItems from "../../muicomponent/MenuItems.tsx";
import { useNavigate } from "react-router-dom";

interface IProps {
  intoDrawer?: boolean;
}

const NavItems = ({ intoDrawer }: IProps) => {
  const navigate = useNavigate();

  const items = [
    { title: "Home" },
    { title: "All Rooms" },
    { title: "About" },
    { title: "Contact Us" },
  ];

  const handleClick = (e) => {
    // console.log(e.title,'dfdfdfdf');

    if (e.title === "Home") {
      navigate("/");
    }
    if (e.title === "All Rooms") {
      navigate("/filter");
    }
    if (e.title === "About") {
      navigate("/About");
    }
    if (e.title === "Contact Us") {
      navigate("/Contact");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const Allitems = items.map((element) => {
    const { title } = element;
    return (
      <>
        <Typography
          onClick={() => handleClick(element)}
          sx={{
            marginLeft: intoDrawer ? "0px" : "15px",
            cursor: "pointer",
            fontSize: "20px",
            backgroundColor: "balck",
          }}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </>
    );
  });

  return (
    <>
      <Box
        sx={{
          marginTop: intoDrawer ? "55px" : null,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: intoDrawer ? "column" : "row",
        }}
      >
        {Allitems}
        {/* <Box >
                    <MenuItems  />
                </Box> */}
      </Box>
    </>
  );
};

export default NavItems;
