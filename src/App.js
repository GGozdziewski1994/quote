import React from "react";
import './App.css';
import 'regenerator-runtime/runtime'
import { useState, useRef, useEffect, Fragment } from "react";
import Quote from "./components/Quote.js";
import Spinner from "./components/UI/Spinner.js";

function App() {
    const [quote, setQuote] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const prevRef = useRef([]);

    useEffect(() => {
        prevRef.current = quote;
    });

    const prevState = prevRef.current;

    const prevQuoteHandler = () => {
        setQuote(prevState);
    }

    async function fetchQuoteHandler() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')

            if(!response.ok) throw new Error('Something went wrong!');

            const data = await response.json();

            setIsLoading(false);

            const randomQuote = Math.floor(Math.random() * (data.length + 1));

            const transformQuote = {
                author: data[randomQuote].author,
                quote: data[randomQuote].quote
            }
            setQuote(transformQuote);

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <Fragment>
            <section>
                <button onClick={fetchQuoteHandler}>Search Quote</button>
                <button onClick={prevQuoteHandler}>Prev Quote</button>
            </section>
            <section>
                {!isLoading && quote?.author?.length > 0 && <Quote Quote={quote}/>}
                {!isLoading && quote.length === 0 && !error && <p>No quote</p>}
                {isLoading && !error && <Spinner />}
                {isLoading && error && <p>{error}</p>}
            </section>
        </Fragment>
    );

}

export default App;
