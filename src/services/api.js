// src/services/api.js

export const apiRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
}) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(url, config);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || "API Error");
    error.status = res.status;
    throw error;
  }

  return data;
};
