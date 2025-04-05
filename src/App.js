import { useState } from 'react';
import './App.css';

const requestTypes = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]

// test

function App() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestTime, setRequestTime] = useState(null);
  const [requestType, setRequestType] = useState(requestTypes[0]);

  async function handleRequest() {
    const startTime = Date.now();
    setIsLoading(true);
    try {
      const res = await fetch(url, {method: requestType});
      const data = await res.json();

      setResponse({"status": res.status, "data": data});

    } catch(error) {
      console.error(error);
      setResponse("Error: " + error);
    } finally {
      setRequestTime(Date.now() - startTime);
      setIsLoading(false);
    }
  }

  return (
    <div id='App'>
      <div className='input-row'>
        <select
          id="request-type"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="request-type-select"
        >
          {requestTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input id="request-url"
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter API URL'
        />
        <button 
          onClick={handleRequest}
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? "Cancel" : "Send"}
        </button>

      </div>

      <div id='output'>
        <pre style={{ visibility: response === '' ? 'hidden' : 'visible' }}>
          {JSON.stringify(response.data, null, 2)}
        </pre>
        <div id='stats' style={{ visibility: response === '' ? 'hidden' : 'visible' }}>
          <span id="status">{response.status}</span>
          <span>{requestTime} ms</span>
        </div>
      </div>
      

    </div>

  );
}

export default App;
