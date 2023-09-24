const API_BASE_URL = 'http://10.200.152.96:3000';

function getApi(route: string, token: string) {
  return fetch(`${API_BASE_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

function postApi(route: string, token: string, body: any) {
  return fetch(`${API_BASE_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function getProfile(id: number, token: string) {
  const response = await getApi(`/api/user/${id}`, token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
}

export async function getFeed(token: string) {
  const response = await getApi('/api/feed/', token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
}

export async function getFriends(token: string) {
  const response = await getApi(`/api/friends/`, token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
}


export async function addFriend(username: string, token: string) {
  const response = await postApi('/api/add-friend', token, {
    username: username
  });

  if (response.status === 200) {
    return;
  }

  throw Error();
}

