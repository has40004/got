import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Loader from '../loader/loader';
import './randomChar.css';
export default class RandomChar extends Component {

    gotService = new GotService();

    state ={
       char : {},
       loading : true,
       error : false
    }

    componentDidMount(){
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 8000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacter = () => {
        let id = Math.floor(Math.random() *590 ) + 30;
       
        this.gotService.getCharacter(id)
        .then((char) => {
            this.setState({
                char,
                loading: false
            })
        })
        .catch(this.onError)
    }
    render() {

        const {char , loading, error} = this.state;

        const errorMessage = error? <ErrorMessage/> : null ;
        const spinner = loading ? <Loader/> : null ;
        const content = !(loading || error) ? <View char= {char}/>: null;


        return (
            <div className="random-block rounded">
               { errorMessage }
               { spinner }
               { content}

            </div>
        );
    }
}


const View = ({char}) => {
    const {name, gender, born, died, culture}= char
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}