

export const apiFetch = async (
  endpoint: string,
  method: string,
  headers = {},
  body: any = null
) => {
  let response = null;

  if (method in ["GET", "HEAD"]) {
    response = await fetch(endpoint, {
      method: method,
      headers: headers,
    });
  } else {
    response = await fetch(endpoint, {
      method: method,
      headers: headers,
      body: body,
    });
  }

  if (response.status >= 500) {
    throw new Error("Internal server error");
  }

  const data = await response.json();

  if (response.status >= 400 && response.status < 500) {
    if (data.detail) {
      throw new Error(data.detail);
    }
    throw data;
  }

  return data;
};

export const authorizedFetch = async (
  endpoint: string,
  method: string,
  headers = {},
  body: any = null
) => {
  
  return apiFetch(
    endpoint,
    method,
    {
      ...headers,
      Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("token"),
    },
    body
  );
};

const wait = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const authorizedFetchRetry = (
  delay: number,
  tries: number,
  endpoint: string,
  method: string,
  headers = {},
  body: any = null
): any => {
  const onError = (err: any) => {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(delay).then(() =>
      authorizedFetchRetry(delay, triesLeft, endpoint, method, headers, body)
    );
  };
  return authorizedFetch(endpoint, method, headers, body).catch(onError);
};


