import React, { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
   const {sendRequest, status } = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if(status === 'completed') {
                history.push('/quotes')
            }
        }
        return () => {
           mounted = false;
        }
    }, [status, history]);

    const addQUoteHandler = (quoteData) => {
        sendRequest(quoteData);
    }
    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQUoteHandler} />
    )
}

export default NewQuote;
