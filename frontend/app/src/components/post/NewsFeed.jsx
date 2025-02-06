import React, { useEffect, useState } from "react";
import "./News.css";

const API_KEY = "8e46bdf865834d449c56522e26d5faaa";
const url = "https://newsapi.org/v2/everything?q=";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("India");
  const [searchText, setSearchText] = useState("");
  const [activeNav, setActiveNav] = useState(null);

  useEffect(() => {
    fetchNews(query);
  }, [query]);

  async function fetchNews(query) {
    try {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  const handleCategoryClick = (category) => {
    setQuery(category);
    setActiveNav(category);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setQuery(searchText.trim());
      setActiveNav(null);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="container flex">
          <a href="#" className="logo">
            News App BY MT
          </a>
          <div className="nav-links">
            <ul className="flex">
              <li
                className={`hover-link nav-item ${
                  activeNav === "ipl" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("ipl")}
              >
                IPL
              </li>
              <li
                className={`hover-link nav-item ${
                  activeNav === "finance" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("finance")}
              >
                Finance
              </li>
              <li
                className={`hover-link nav-item ${
                  activeNav === "politics" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("politics")}
              >
                Politics
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="cards-container container">
          {articles.length > 0 ? (
            articles.map(
              (article, index) =>
                article.urlToImage && (
                  <div
                    className="card"
                    key={index}
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    <div className="card-header">
                      <img src={article.urlToImage} alt="news" />
                    </div>
                    <div className="card-content">
                      <h3>{article.title}</h3>
                      <h6 className="news-source">
                        {article.source.name} •{" "}
                        {new Date(article.publishedAt).toLocaleString("en-US", {
                          timeZone: "Asia/Jakarta",
                        })}
                      </h6>
                      <p className="news-desc">{article.description}</p>
                    </div>
                  </div>
                )
            )
          ) : (
            <p className="no-articles">No news articles available.</p>
          )}
        </div>
      </main>

      <footer className="search-container">
        <input
          type="text"
          className="news-input"
          placeholder="Search for news..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </footer>
    </div>
  );
}

export default NewsFeed;
