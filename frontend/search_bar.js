# search_bar.js
import { useState, useEffect } from 'react';
import { useWeb3 } from '@web3-react/core';
import { ethers } from 'ethers';
import { NLP } from 'nlp.js';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { account, library } = useWeb3();

  useEffect(() => {
    const nlp = new NLP();
    const search = async () => {
      if (searchQuery.length > 2) {
        const results = await nlp.process(searchQuery);
        const filteredResults = results.filter((result) => {
          return result.score > 0.5;
        });
        setSearchResults(filteredResults);
      }
    };
    search();
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div>
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for AI models, datasets, or services"
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
