import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TransactionGraph from './TransactionGraph';

const Graph = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Fetch transaction data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/get');
        setTransactionData(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Transaction Graph</h1>
      <TransactionGraph transactionData={transactionData} />
    </div>
  );
};

export default Graph;
