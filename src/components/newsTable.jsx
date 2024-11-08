
import styles from "./newsTable.module.css";

// import Input from "./Input";


function NewsTable( {newsData, newsHeaderTitle} ) {
  console.log("✔ Table news prop:", newsData);

  // const feedObj = newsResponse.feed[0];

  return (
    <div className={`${styles.newsContainer}`}>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            {newsHeaderTitle === "General News" ? <td>{newsHeaderTitle}</td> : <><td style={{backgroundColor: "#FFFFFF"}}></td><td style={{backgroundColor: "#86adfc"}}>{newsHeaderTitle}</td></>}
            {/* <td style={{backgroundColor: newsHeaderTitle === "General News" ? "inherit": "#e4f7d5"}}>
              {newsHeaderTitle}
            </td> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>
              <p ID={`${styles.newsTitle}`}>{feedObj.title}</p>
              <p ID={`${styles.newsSummary}`}>{feedObj.summary}</p>
              <p className={`${styles.newsSource}`}>
                <b>Source: </b>{feedObj.source}
              </p>
              <p className={`${styles.newsDate}`}>
                <b>Published on: </b>
                {new Date(feedObj.time_published.slice(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </td>  */}
            {newsData.slice(0,3).map((news, i) => (
              <td key={i}>
                <p ID={`${styles.newsTitle}`}>
                  {news.title.length > 200 ? `${news.title.slice(0, 200)}...` : news.title}
                </p>
                <p ID={`${styles.newsSummary}`}>{news.summary}</p>
                <p>
                  <b>Sentiment Score: </b>
                  {news.overall_sentiment_score.toFixed(3)}
                </p>
                <p className={`${styles.newsSource}`}>
                  <b>Source: </b>
                  <a href={news.url} target="_blank" rel="noopener noreferrer"> 
                    {news.source}
                  </a>
                </p>
                <p className={`${styles.newsDate}`}>
                  <b>Published on: </b>
                  {new Date(news.time_published.slice(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </td>
            ) )};
          </tr>
          <tr>
            {newsData.slice(3,6).map((news, i) => (
                <td key={i+3}>
                  <p ID={`${styles.newsTitle}`}>
                    {news.title.length > 200 ? `${news.title.slice(0, 200)}...` : news.title}
                  </p>
                  <p ID={`${styles.newsSummary}`}>{news.summary}</p>
                  <p>
                    <b>Sentiment Score: </b>
                    {news.overall_sentiment_score.toFixed(3)}
                  </p>
                  <p className={`${styles.newsSource}`}>
                    <b>Source: </b>
                    <a href={news.url} target="_blank" rel="noopener noreferrer"> 
                      {news.source}
                    </a>
                  </p>
                  <p className={`${styles.newsDate}`}>
                    <b>Published on: </b>
                    {new Date(news.time_published.slice(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </td>
              ) )};
          </tr>
          <tr>
            {newsData.slice(6,9).map((news, i) => (
                <td key={i+3}>
                  <p ID={`${styles.newsTitle}`}>
                    {news.title.length > 200 ? `${news.title.slice(0, 200)}...` : news.title}
                  </p>
                  <p ID={`${styles.newsSummary}`}>{news.summary}</p>
                  <p>
                    <b>Sentiment Score: </b>
                    {news.overall_sentiment_score.toFixed(3)}
                  </p>
                  <p className={`${styles.newsSource}`}>
                    <b>Source: </b>
                    <a href={news.url} target="_blank" rel="noopener noreferrer"> 
                      {news.source}
                    </a>
                  </p>
                  <p className={`${styles.newsDate}`}>
                    <b>Published on: </b>
                    {new Date(news.time_published.slice(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </td>
              ) )};
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default NewsTable; 