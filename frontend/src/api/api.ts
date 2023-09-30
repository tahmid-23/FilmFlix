const API_BASE_URL = 'https://filmflix.fly.dev';

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

export async function getOwnId(token: string) {
  const response = await getApi('/api/id', token);

  if (response.status === 200) {
    return await response.json();
  }

  throw Error();
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

export async function addFriend(email: string, token: string) {
  const response = await postApi('/api/add-friend', token, {
    email: email
  });

  if (response.status === 200) {
    return;
  }

  throw Error();
}

export async function addReview(
  title: string,
  rating: number,
  description: string,
  token: string
) {
  const response = await postApi('/api/add-review', token, {
    movieTitle: title,
    rating: rating,
    description: description
  });

  if (response.status === 200) {
    return;
  }

  throw Error();
}

export async function addWatchList(
  title: string,
  watchAt: number,
  token: string
) {
  const response = await postApi('/api/add-watch-list', token, {
    movieTitle: title,
    watchAt: watchAt
  });

  if (response.status === 200) {
    return;
  }

  throw Error();
}
