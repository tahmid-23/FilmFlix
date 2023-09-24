const API_BASE_URL = 'http://10.200.152.96:3000';

function fetchApi(route: string, token: string) {
  return fetch(`${API_BASE_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getProfile(id: number, token: string) {
  const response = await fetchApi(`/api/user/${id}`, token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
}

export async function getFeed(token: string) {
  const response = await fetchApi(`/api/feed/`, token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
}

