// This code holds the boiler plate for the user APIs
// The reason we use this is so that we don't have to rewrite these calls
// everytime we want to hit another user endpoint

const hasJSONResponse = (res) => {
  const contentType = res.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};

/**
 * POSTRequest - Sends a POST Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {object} payload - the payload body of the request
 */
export async function POSTRequest(path, payload) {
  try {
    let config = {
      method: "POST",
      headerss: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(path, config);
    if (res.ok) {
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
      message: `the following error occured: ${e}`,
      status: 500,
    };
  }
}

/**
 * PUTRequest - Sends a PUT Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 * @param {object} payload - the payload body of the request
 */
export async function PUTRequest(path, payload) {
  try {
    let config = {
      method: "PUT",
      headerss: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(path, config);
    if (res.ok) {
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
      message: `the following error occured: ${e}`,
      status: 500,
    };
  }
}

/**
 * GETRequest - Sends a GET Request to the specified endpoint
 * @param {string} path - the extension path to the REST API endpoint
 */
export async function GETRequest(path) {
  try {
    let config = {
      headerss: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(path, config);
    if (res.ok) {
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
