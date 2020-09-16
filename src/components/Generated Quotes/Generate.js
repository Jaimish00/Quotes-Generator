import React, { Component } from 'react';

class GetQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded : false,
            quote: null
        }
    }

    generate(){
        fetch("https://programming-quotes-api.herokuapp.com/quotes/random/lang/en/").then(
            response => response.json()
        ).then(
            (result) => {
                this.setState({   
                    isLoaded: true,
                    quote: result 
                });
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                })
            }
        )
    }

    render(){
        const{error, isLoaded, quote} = this.state;

        if(error){
            return <div>Error</div>
        }
        else if(!isLoaded){
            return <div>Loading</div>
        }else{
            return(
                <div>
                    <div>
                        <p>{quote.en}</p>
                        <blockquote>{quote.author}</blockquote>
                    </div>
                </div>
            );
        }
    }

}