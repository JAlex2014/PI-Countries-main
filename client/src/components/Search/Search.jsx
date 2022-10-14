import React, {useState} from 'react';
import {getCountriesSummary} from './../../redux/actions/index';
import { useDispatch } from 'react-redux';

export default function SearchBar(props) {

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
            <form onSubmit={submitHandler}>
                <input type='text' placeholder={'Search your country...'} 
                    onChange={searchHandler}/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}; 