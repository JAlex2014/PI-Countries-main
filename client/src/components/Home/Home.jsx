import * as actions from  "./../../redux/actions/index";
import CountryCard from "../CountryCard/CountryCard";
import { Component } from "react";
import {connect} from "react-redux";

export class Home extends Component{
    componentDidMount(){
        this.props.getAllCountries()
    }
    render(){
        return(
            <div>
                <h1>Aquí aparecerá el listado de 250 Countries</h1>
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