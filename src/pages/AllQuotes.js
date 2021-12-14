import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// const dummyQuotes = [
//     {id: 'q1', author: 'max', text: 'Learnong React is fun'}, 
//     {id: 'q2', author: 'maxes', text: 'Learnong React is great'}, 
//     {id: 'q3', author: 'maxy', text: 'Learnong React good'}, 
//     {id: 'q4', author: 'maxer', text: 'Learnong React terrible'}, 
//     {id: 'q5', author: 'maxim', text: 'Learnong React tiring'}, 
// ]

const AllQuotes = () => {
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            sendRequest()
        }
        return () => {
           mounted = false;
        }
    }, [sendRequest]);

    if  (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <p className='centered focused'> {error}</p>
    }
    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound />
    }
    return (
        <QuoteList quotes={loadedQuotes}/>
    )
}

export default AllQuotes
