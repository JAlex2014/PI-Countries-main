import * as actions from  "./../../redux/actions/index";
import CountryCard from "../CountryCard/CountryCard";
import { Component } from "react";
import {connect} from "react-redux";
import Search from "../Search/Search";

export class Home extends Component{

    componentDidMount(){
        this.props.getAllCountries()
    }

    render(){
        return(
            <div>
                <Search/>
                <select>
                    <option hidden selected>Order by ABCs</option>
                    <option value="up">From A to Z</option>
                    <option value="down">From Z to A</option>
                </select>
                <select>
                    <option hidden selected>Order by Population</option>
                    <option value="more">From most to least</option>
                    <option value="less">From least to most</option>
                </select>
                <select> 
                    <option hidden selected>Filter by Region</option>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="South America">South America</option>
                </select>
                <select>
                    <option hidden selected>Filter by Activities</option>
                </select> 
                    <>
                        {this.props.countries?.map(country => <CountryCard
                        key = {country.id}
                        name = {country.name}
                        id = {country.id}
                        img = {country.flag_img}
                        continent = {country.continent}
                        capital = {country.capital}
                        subregion = {country.subregion}
                        area = {country.area}
                        population = {country.population}
                        tours = {country.tours}
                    />)}
                    </>
            </div>
        );
    }
};

export const mapStateToProps = (state) => {
    return{
        countries: state.countries
    }
};

export const mapDispatchToProps = (dispatch) =>{
    return{
        getAllCountries: () => dispatch(actions.getAllCountries())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);