import React from "react";
import './Quote.module.css';

const Quote = props => {
   return(
       <ul className='quote-list'>
           <li className='quote'>
               <h2>{props.Quote.author}</h2>
               <p>{props.Quote.quote}</p>
           </li>
       </ul>
   );
}

export default Quote;