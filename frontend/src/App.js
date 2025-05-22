import React, { useEffect, useState } from 'react';
import API from './api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/getassetsbyplayer')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#fefefe',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const renderTable = () => {
    return React.createElement(
      'table',
      { style: tableStyle },
      [
        React.createElement(
          'thead',
          { key: 'thead' },
          React.createElement(
            'tr',
            {},
            ['No', 'Player name', 'Level', 'Age', 'Asset name'].map((title, idx) =>
              React.createElement('th', { key: idx, style: thStyle }, title)
            )
          )
        ),
        React.createElement(
          'tbody',
          { key: 'tbody' },
          data.map((item, idx) =>
            React.createElement(
              'tr',
              { key: idx },
              [
                idx + 1,
                item.playerName,
                item.level,
                item.age,
                item.assetName
              ].map((val, i) =>
                React.createElement('td', { key: i, style: tdStyle }, val)
              )
            )
          )
        ),
      ]
    );
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  };

  return React.createElement(
    'div',
    { style: containerStyle },
    [
      React.createElement('h1', { key: 'h1', style: titleStyle }, 'BATTLE GAME - Asset Table'),
      renderTable()
    ]
  );
}

export default App;
