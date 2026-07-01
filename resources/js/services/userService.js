const API_BASE = '/api/users';

async function parseResponse(response) {
  const content = await response.json().catch(() => null);
  if (!response.ok) {
    const error = content?.message || 'API request failed';
    throw new Error(error);
  }
  return content;
}

export async function fetchUsers(page = 1) {
  const response = await fetch(`${API_BASE}?page=${page}`, {
    headers: { Accept: 'application/json' },
  });
  return parseResponse(response);
}

export async function fetchUser(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    headers: { Accept: 'application/json' },
  });
  return parseResponse(response);
}

export async function createUser(payload) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}
