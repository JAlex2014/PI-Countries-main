import React, {useState} from 'react';
import {getCountriesSummary} from './../../redux/actions/index';
import { useDispatch } from 'react-redux';

export default function Search({setcurrentPage}) {

    const [input, setinput] = useState('');

    const dispatch = useDispatch();

    const searchInputHandler = (event) => {
        setinput(event.target.value)
    };

    const clickHandler = (event) => {
        event.preventDefault();
        dispatch(getCountriesSummary(input))
        setcurrentPage(1);
        setinput('');
    };

    return( 
        <div>
            <input type='text' placeholder={'Find your country...'} 
                onChange={searchInputHandler} value={input}/>
            <button type="submit" onClick={clickHandler}>Search</button>
        </div>
    )
}; 