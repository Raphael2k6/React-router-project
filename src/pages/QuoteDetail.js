import React, {useEffect} from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const dummyQuotes = [
//     {id: 'q1', author: 'max', text: 'Learnong React is fun'}, 
//     {id: 'q2', author: 'maxes', text: 'Learnong React is great'}, 
//     {id: 'q3', author: 'maxy', text: 'Learnong React good'}, 
//     {id: 'q4', author: 'maxer', text: 'Learnong React terrible'}, 
//     {id: 'q5', author: 'maxim', text: 'Learnong React tiring'}, 
// ]

const QuoteDetail = () => {
    const param = useParams()
    const match  = useRouteMatch();
    const { quoteId } = param;

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            sendRequest(quoteId)
        }
        return () => {
           mounted = false;
        }
    }, [sendRequest, quoteId]);


    console.log(match);
    // const quote = dummyQuotes.find(quote => quote.id === param.quoteId)

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className='centered'>{error}</p>
    }

    if(!loadedQuote.text) {
        return<p>No quote found</p>;
    }
    return (
        <div>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">Load Comments</Link>
                </div>
            </Route>
            
            {param.quoteId}
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </div>
    )
}

export default QuoteDetail;
