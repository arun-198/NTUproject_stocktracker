import React, { useState } from 'react';
import styles from '../styles/News.module.css';
import NewsTable from '../components/newsTable';
// import { dummyNewsData } from './dummyNewsData';
import getNews from '../api/getNews';
import { finNews } from '../dummyData/getFinNews';
import InputStock from '../components/InputStock';
import { stockNews } from '../dummyData/stockNews';

const AboutUs = () => {
  // const dummyNews = dummyNewsData.feed;
  const dummyNews = finNews.feed;
  const aaplNews = stockNews.feed;
  // console.log(typeof dummyNews);
  const [newsData, setNewsData] = useState(dummyNews);
  const [stockName, setStockName] = useState();
  const [newsIsLoading, setNewsIsLoading] = useState(true);
  const [newsHeaderTitle, setNewsHeaderTitle] = useState("");
  const [sentimentScore, setSentimentScore] = useState(0);
  const [showSentimentScore, setShowSentimentScore] = useState(false);

  const newsResponse = async () => {
    setNewsHeaderTitle("General News");
    setStockName("");
    setShowSentimentScore(false);
    try {
      setNewsIsLoading(true);
      const response = await getNews.get("/query?function=NEWS_SENTIMENT&apikey=1XYTJIKI7X7DX44I");
      // const response = await getNews.get("/query?function=NEWS_SENTIMENT&topics=financial_markets,&apikey=ZHAC5CN9YXPC94GR");
      // const response = await getNews.get("/query");
      if (response.data && response.data.feed) {
        console.log("✔ News:", response.data.feed);
        setNewsData(response.data.feed);
      } else {
        console.log("❌ News: No feed data found, using dummy news");
        window.alert("API Request failed, displaying pre-loaded data");
        setNewsData(dummyNews);
      }
    } catch (error) {
      console.error("🚨 error:", error.message);
      setNewsData(dummyNews);
    } finally {
      setNewsIsLoading(false);
    }
  };
  const newsFinResponse = async () => {
    setNewsHeaderTitle(`${stockName} News`);
    try {
      setNewsIsLoading(true);
      const response = await getNews.get(`/query?function=NEWS_SENTIMENT&tickers=${stockName}&limit=1000&apikey=1XYTJIKI7X7DX44I`);
      // const response = await getNews.get("/query");
      // const response = await getNews.get("/query");
      if (response.data && response.data.feed) {
        console.log("✔ News:", response.data.feed.slice(0,10));
        setNewsData(response.data.feed.slice(0,10));
        setShowSentimentScore(true);
        setSentimentScore(()=>{
        let score = 0;
        response.data.feed.slice(0,10).forEach((news) => {
          const aaplSentiment = news.ticker_sentiment.find(sentiment => sentiment.ticker === `${stockName}`);
          if (aaplSentiment) {
            // Convert ticker_sentiment_score to a number and add to score
            console.log("score", score);
            score = score + parseFloat(aaplSentiment.ticker_sentiment_score);
          }
        });
        console.log("News Feed Length: ", response.data.feed.slice(0,10).length)
        score = score/response.data.feed.slice(0,10).length;
        console.log("News Sentiment Score: ", score)
        return score;
      })
      } else {
        console.log("❌ News: No feed data found, using dummy news");
        window.alert("API Request failed, no pre-loaded data");
        setNewsData(aaplNews);
      }
      ;
    } catch (error) {
      console.error("🚨 error:", error.message);
      setNewsData(aaplNews);
      setSentimentScore(()=>{
        let score = 0;
        aaplNews.feed.forEach((news) => {
          const aaplSentiment = news.ticker_sentiment.find(sentiment => sentiment.ticker === "AAPL");
          if (aaplSentiment) {
            // Convert ticker_sentiment_score to a number and add to score
            console.log("score", score);
            score = score + parseFloat(aaplSentiment.ticker_sentiment_score);
          }
        });
        return score;
      });
    } finally {
      setNewsIsLoading(false);
    }
  };
  const newsEcnResponse = async () => {
    setNewsHeaderTitle("Economy News");
    setStockName("");
    setShowSentimentScore(false);
    try {
      setNewsIsLoading(true);
      const response = await getNews.get("/query?function=NEWS_SENTIMENT&topics=economy_macro&apikey=1XYTJIKI7X7DX44I");
      // const response = await getNews.get("/query");
      if (response.data && response.data.feed) {
        console.log("✔ News:", response.data.feed);
        setNewsData(response.data.feed);
      } else {
        console.log("❌ News: No feed data found, using dummy news");
        window.alert("API Request failed, no pre-loaded data");
        setNewsData(dummyNews);
      }
    } catch (error) {
      console.error("🚨 error:", error.message);
      setNewsData(dummyNews);
    } finally {
      setNewsIsLoading(false);
    }
  };
  const newsTechResponse = async () => {
    setNewsHeaderTitle("Tech News");
    setStockName("");
    setShowSentimentScore(false);
    try {
      setNewsIsLoading(true);
      const response = await getNews.get("/query?function=NEWS_SENTIMENT&topics=technology&apikey=1XYTJIKI7X7DX44I");
      // const response = await getNews.get("/query");
      if (response.data && response.data.feed) {
        console.log("✔ News:", response.data.feed);
        setNewsData(response.data.feed);
      } else {
        console.log("❌ News: No feed data found, using dummy news");
        window.alert("API Request failed, no pre-loaded data");
        setNewsData(dummyNews);
      }
    } catch (error) {
      console.error("🚨 error:", error.message);
      setNewsData(dummyNews);
    } finally {
      setNewsIsLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.newsHeader}>News</div>
      <p className={styles.newsSubheader}>Get the latest news on your bookmarked stocks here!</p>
      <button className={styles.button} onClick={newsResponse}>General News</button>
      <button className={styles.button} onClick={newsEcnResponse}>Economy News</button>
      <button className={styles.button} onClick={newsTechResponse}>Tech News</button>
      <InputStock stockName={stockName} setStockName={setStockName} newsFinResponse={newsFinResponse} sentimentScore={sentimentScore} showSentimentScore={showSentimentScore}/>
      {!newsIsLoading && <NewsTable newsData={newsData} newsHeaderTitle={newsHeaderTitle}/>}
    </div>
  )};
 

export default AboutUs;
