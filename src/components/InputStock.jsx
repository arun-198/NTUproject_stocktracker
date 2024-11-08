// inputStock.js
import React from 'react';
import styles from "./inputStock.module.css";

function InputStock({stockName, setStockName, newsFinResponse, sentimentScore, showSentimentScore}) {
    const handleChange = (event) => {
        setStockName(event.target.value.toUpperCase());
    };

    return (

        <div>
            <label className={styles.inputLabel}><b>Ticker: </b></label>
            <input className={styles.inputBox} value={stockName} onChange={handleChange} />
            <button onClick={newsFinResponse}>
                Search
            </button>
            <br />
            {showSentimentScore && 
            <div> 
                <b>Overall Score: </b>
                <sub className={styles.scoreBox}>
                    {(sentimentScore).toFixed(3)}
                </sub>
                <sub style={{fontSize: 25}}>{(sentimentScore > 0.35) ? "👍" : ""}</sub> 
                <sub style={{fontSize: 25}}>{(sentimentScore < 0) ? "👎" : ""}</sub> 
            </div>}

        </div>
    );
};

export default InputStock;