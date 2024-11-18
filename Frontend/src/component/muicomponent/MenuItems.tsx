import React, { useState } from 'react'
import { Drawer, List, ListItem, Toolbar, Divider, ListItemButton, ListItemText, Box, AppBar, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Button, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, OutlinedInput, FormHelperText, Menu, } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IProps {
    data?: any[];
    homeslider?: boolean;
}

const MenuItems = ({ data, homeslider }: IProps) => {

    const menuitems = [
        { title: 'Simple' },
        { title: 'Standard' },
        { title: 'Premium' },
    ]

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let Dataformap = homeslider ? data : menuitems

    const Allmenuitems = Dataformap?.map((element) => {
        const { title } = element
        return (
            <>
                <MenuItem > {title}</MenuItem>
            </>
        )
    })

    return (
        <>
            <Button
                sx={{ color: 'white' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    homeslider ? "City" : 'Category'
                }
               <ArrowDropDownIcon/>         
                  </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    Allmenuitems
                }
            </Menu>
        </>
    )
}

export default MenuItems