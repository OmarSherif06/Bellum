import { useState } from 'react';
import './App.css';

const requestTypes = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]

const requestTypeColors = {
  "GET": "#6BDD9A",
  "POST": "#FFE47E",
  "PUT": "#74AEF6",
  "PATCH": "#C0A8E1",
  "DELETE": "#F79A8E",
  "HEAD": "#6BDD9A",
  "OPTIONS": "#F15EB0",
}

const statusCodes = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error"
};
const statusColors = {
  200: "#013614",
  201: "#013614",
  204: "#013614",
  400: "#591B08",
  401: "#591B08",
  403: "#591B08",
  404: "#591B08",
  500: "#591B08"
};

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
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="request-type-select"
          style={{color: requestTypeColors[requestType]}}
        >
          {requestTypes.map((type) => (
            <option key={type} value={type} style={{color: requestTypeColors[type], fontWeight: 'bold'}}>{type}</option>
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
          <span id="status" style={{backgroundColor: statusColors[response.status]}}>{response.status} {statusCodes[response.status]}</span>
          <span className="separator"></span>
          <span>{requestTime} ms</span>
        </div>
      </div>
      

    </div>

  );
}

export default App;
