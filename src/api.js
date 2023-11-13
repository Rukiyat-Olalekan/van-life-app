export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch host vans");
    }
    const data = await response.json();
    return data.vans;
  } catch (error) {
    console.log(error);
  }
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch host vans");
    }
    const data = await response.json();
    return data.vans;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(creds) {
  const response = await fetch("/api/login", {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(creds),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: response.statusText,
      status: response.status,
    };
  }
  
  return data;
}
