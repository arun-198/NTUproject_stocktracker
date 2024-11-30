import styles from "./newsTable.module.css";

function NewsTable({ newsData, newsHeaderTitle }) {
  console.log("✔ Table news prop:", newsData);

  return (
    <div className={`${styles.newsContainer}`}>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            {newsHeaderTitle === "a" ? (
              <td>{newsHeaderTitle}</td>
            ) : (
              <>
                
                <td style={{ backgroundColor: "#0da7a7" }}>{newsHeaderTitle}</td>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {newsData.slice(0, 9).map((news, index) => (
            <tr key={index}>
              <td>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p ID={`${styles.newsTitle}`}>
                    {news.title.length > 200
                      ? `${news.title.slice(0, 200)}...`
                      : news.title}
                  </p>
                  <p ID={`${styles.newsSummary}`}>{news.summary}</p>
                  <p>
                    <b>Sentiment Score: </b>
                    {news.overall_sentiment_score.toFixed(3)}
                  </p>
                  <p className={`${styles.newsSource}`}>
                    <b>Source: </b>
                    {news.source}
                  </p>
                  <p className={`${styles.newsDate}`}>
                    <b>Published on: </b>
                    {new Date(
                      news.time_published
                        .slice(0, 8)
                        .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewsTable;
