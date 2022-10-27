import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Select, FormControl, MenuItem, Box } from '@mui/material';

interface IHeaderProps {
    userType: any;
    setUserType: React.Dispatch<React.SetStateAction<any>>;
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

const Header: React.FC<IHeaderProps> = ({
    userType,
    setUserType,
    state,
    setState,
}) => {
    const location = useLocation()
    useEffect(() => {
        if (location.pathname.split('/')[1] === 'representative') {
            setUserType('rep')
        }
        else if (location.pathname.split('/')[1] === 'senators') {
            setUserType('sen')
        }
        if (location.pathname.split('/')[2] !== undefined) {
            setState(location.pathname.split('/')[2])
        }
    }, []);

    const navigate = useNavigate();

    const navigateURL = (_state: any, _userType: any) => {
        let url = _userType === 'rep' ? 'representatives/' : 'senators/';
        url += _state;
        navigate(url);
    }

    return (
        <Box sx={{ minWidth: 200, mt: 1 }}>
            <h2 className="heading">Who's My
                {
                    userType === 'rep' ? ' Representative' : ' Sentator'
                }?
            </h2>
            <FormControl>
                <Select
                    onChange={(e) => {
                        navigateURL(state, e.target.value);
                        setUserType(e.target.value);
                    }}
                    value={userType || ''}
                    sx={{ width: 160 }}
                >
                    <MenuItem value={'rep'}>Representative</MenuItem>
                    <MenuItem value={'sen'}>Senator</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ ml: 1, mr: 2 }}>
                <Select
                    onChange={(e) => {
                        navigateURL(e.target.value, userType);
                        setState(e.target.value);
                    }}
                    value={state || ''}
                >
                    <MenuItem value={'AL'}>Alabama</MenuItem>
                    <MenuItem value={'AK'}>Alaska</MenuItem>
                    <MenuItem value={'AZ'}>Arizona</MenuItem>
                    <MenuItem value={'AR'}>Arkansas</MenuItem>
                    <MenuItem value={'CA'}>California</MenuItem>
                    <MenuItem value={'CO'}>Colorado</MenuItem>
                    <MenuItem value={'CT'}>Connecticut</MenuItem>
                    <MenuItem value={'DE'}>Delaware</MenuItem>
                    <MenuItem value={'FL'}>Florida</MenuItem>
                    <MenuItem value={'GA'}>Georgia</MenuItem>
                    <MenuItem value={'HI'}>Hawaii</MenuItem>
                    <MenuItem value={'ID'}>Idaho</MenuItem>
                    <MenuItem value={'IL'}>Illinois</MenuItem>
                    <MenuItem value={'IN'}>Indiana</MenuItem>
                    <MenuItem value={'IA'}>Iowa</MenuItem>
                    <MenuItem value={'KS'}>Kansas</MenuItem>
                    <MenuItem value={'KY'}>Kentucky</MenuItem>
                    <MenuItem value={'LA'}>Louisiana</MenuItem>
                    <MenuItem value={'ME'}>Maine</MenuItem>
                    <MenuItem value={'MD'}>Maryland</MenuItem>
                    <MenuItem value={'MA'}>Massachusetts</MenuItem>
                    <MenuItem value={'MI'}>Michigan</MenuItem>
                    <MenuItem value={'MN'}>Minnesota</MenuItem>
                    <MenuItem value={'MS'}>Mississippi</MenuItem>
                    <MenuItem value={'MO'}>Missouri</MenuItem>
                    <MenuItem value={'MT'}>Montana</MenuItem>
                    <MenuItem value={'NE'}>Nebraska</MenuItem>
                    <MenuItem value={'NV'}>Nevada</MenuItem>
                    <MenuItem value={'NH'}>New Hampshire</MenuItem>
                    <MenuItem value={'NJ'}>New Jersey</MenuItem>
                    <MenuItem value={'NM'}>New Mexico</MenuItem>
                    <MenuItem value={'NY'}>New York</MenuItem>
                    <MenuItem value={'NC'}>North Carolina</MenuItem>
                    <MenuItem value={'ND'}>North Dakota</MenuItem>
                    <MenuItem value={'OH'}>Ohio</MenuItem>
                    <MenuItem value={'OK'}>Oklahoma</MenuItem>
                    <MenuItem value={'OR'}>Oregon</MenuItem>
                    <MenuItem value={'PA'}>Pennsylvania</MenuItem>
                    <MenuItem value={'RI'}>Rhode Island</MenuItem>
                    <MenuItem value={'SC'}>South Carolina</MenuItem>
                    <MenuItem value={'SD'}>South Dakota</MenuItem>
                    <MenuItem value={'TN'}>Tennessee</MenuItem>
                    <MenuItem value={'TX'}>Texas</MenuItem>
                    <MenuItem value={'UT'}>Utah</MenuItem>
                    <MenuItem value={'VT'}>Vermont</MenuItem>
                    <MenuItem value={'VA'}>Virginia</MenuItem>
                    <MenuItem value={'WA'}>Washington</MenuItem>
                    <MenuItem value={'WV'}>West Virginia</MenuItem>
                    <MenuItem value={'WI'}>Wisconsin</MenuItem>
                    <MenuItem value={'WY'}>Wyoming</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Header;