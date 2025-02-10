import { BaseUrl } from "./services/apis/apis";


export const jsonToCsv = (json) => {
    const headers = Object.keys(json[0]);
    const csv = [
        headers.join(','), // Header row
        ...json.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(',')) // Data rows
    ].join('\r\n');
    return csv;
};


const fetchApi = async (method, endpoint, payload = null, auth) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`
      },
    };
  
    if (payload) {
      options.body = JSON.stringify(payload);
    }
  
    try {
      const response = await fetch(`${BaseUrl}${endpoint}`, options);
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error response
        return { error: errorText || "Something went wrong!" };
      }
  
      // Directly parse the JSON response
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error("Fetch Error:", error.message);
      return { error: error.message || "Something went wrong!" };
    }
  };
  
  // Export the function
  export const apiCall = async (method, endpoint, payload, auth) => {
    const result = await fetchApi(method, endpoint, payload, auth);
    return result;
  };
  