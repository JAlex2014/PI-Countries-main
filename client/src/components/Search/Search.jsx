import React, {useState} from 'react';
import {getCountriesSummary} from './../../redux/actions/index';
import { useDispatch } from 'react-redux';

export default function SearchBar() {

    const [input, setinput] = useState('');

    const dispatch = useDispatch();

    const searchHandler = (event) => {
        setinput(event.target.value)
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getCountriesSummary(input))
        setinput('');
    };

    return( 
        <div>
            <input type='text' placeholder={'Search your country...'} 
                onChange={searchHandler} value={input}/>
            <button type="submit" onClick={submitHandler}>Search</button>
        </div>
    )
}; 