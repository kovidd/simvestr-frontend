import React from "react";
// This code holds the boiler plate for the APIs
// The reason we use this is so that we don't have to rewrite these calls
// everytime we want to hit another endpoint

export const ApiTokenContext = () => {};

const hasJSONResponse = (res) => {
  const contentType = res.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};

/**
 * POSTRequest - Sends a POST Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {string} apiToken - the apiToken to validate the request
 * @param {object} payload - the payload body of the request
 * @param {{stringify: boolean, headers: HeadersInit}} options - the optional headers
 * @param {number[]} acceptStatus - any other status returned from the result, which we want to classify same as res.ok
 */
export async function POSTRequest(
  path,
  apiToken,
  payload,
  options,
  acceptStatus
) {
  try {
    let config = {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options && { ...options.headers }),
        ...(apiToken && { apiToken }),
      },
      ...(payload && {
        body: !options || options.stringify ? JSON.stringify(payload) : payload,
      }),
    };

    const res = await fetch(path, config);
    if (res.ok || acceptStatus.includes(res.status)) {
      if (hasJSONResponse(res)) {
        const data = await res.json();
        return { error: false, data, status: res.status };
      } else {
        return { error: false };
      }
    } else {
      const { message } = await res.json();
      return { error: true, message, status: res.status };
    }
  } catch (e) {
    return {
      error: true,
      message: `the following error occured: ${e}`,
      status: 500,
    };
  }
}

/**
 * PUTRequest - Sends a PUT Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {string} apiToken - the apiToken to validate the request
 * @param {object} payload - the payload body of the request
 * @param {{stringify: boolean, headers: HeadersInit}} options - the optional headers
 */
export async function PUTRequest(path, apiToken, payload, options) {
  try {
    let config = {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options && { ...options.headers }),
        apiToken,
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(path, config);
    if (res.ok) {
      return { error: false, data: payload };
    } else {
      const { message } = await res.json();
      return { error: true, message, status: res.status };
    }
  } catch (e) {
    return {
      error: true,
      message: `the following error occurred: ${e}`,
      status: 500,
    };
  }
}

/**
 * GETRequest - Sends a GET Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {string} apiToken - the apiToken to validate the request
 * @param {{stringify: boolean, headers: HeadersInit}} options - the optional headers
 * @param {number[]} acceptStatus - any other status returned from the result, which we want to classify same as res.ok
 */
export async function GETRequest(path, apiToken, options, acceptStatus) {
  try {
    let config = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options && { ...options.headers }),
        apiToken,
      },
    };

    const res = await fetch(path, config);
    if (res.ok || acceptStatus.includes(res.status)) {
      if (hasJSONResponse(res)) {
        const data = await res.json();
        return { error: false, data };
      } else {
        return { error: false };
      }
    } else {
      const { message } = await res.json();
      return { error: true, message, status: res.status };
    }
  } catch (e) {
    return {
      error: true,
      message: `the following error occurred: ${e}`,
      status: 500,
    };
  }
}

/**
 * DELETERequest - Sends a DELETE Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {string} apiToken - the apiToken to validate the request
 * @param {{stringify: boolean, headers: HeadersInit}} options - the optional headers
 */
export async function DELETERequest(path, apiToken, options) {
  try {
    let config = {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options && { ...options.headers }),
        apiToken,
      },
    };

    const res = await fetch(path, config);
    if (res.ok) {
      return { error: false };
    } else {
      const { message } = await res.json();
      return { error: true, message, status: res.status };
    }
  } catch (e) {
    return {
      error: true,
      message: `the following error occurred: ${e}`,
      status: 500,
    };
  }
}
