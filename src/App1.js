import React, { Component }from 'react';
import axios from 'axios';

const Card = (props) => {
    return(
        <div style={{ margin: '1em' }}>
            <img width="100" src={props.avatar_url} alt=""/>
            <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <div style={{ fontSize: '1.25em', fontWeight:'bold' }}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
}

const CardList = (props) => {
    return(
        <div>
            {props.cards.map((card) => <Card key={card.id } {...card}/>)}
        </div>
    );
}   

class Form extends Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { userName: ''}
    }

    handleSubmit(e){
        e.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then((response)=>{
                this.props.onSubmit(response.data)
                this.setState({ userName: '' })
            })

    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                value={this.state.userName}
                onChange={ (event) => this.setState({ userName: event.target.value })}
                type="text" placeholder="Github username"/>
                <button type="submit">Add Card</button>
            </form>
        );
    }
}

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            cards: [
        
 
            ]
        }
        this.addNewCard = this.addNewCard.bind(this);
    }
    addNewCard(cardInfo){
        this.setState( (prevState) => ({
            cards: prevState.cards.concat(cardInfo)
        }))
    
        
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.addNewCard}/>
                <CardList cards={this.state.cards}/>
            </div>
        );
    }
}
export default App;