const API_URL = "http://localhost:5000/api/menu";

export async function getMenuItems() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }

  return response.json();
}
export async function createMenuItem(menuItem) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add menu item");
  }

  return data;
}
export async function updateMenuItem(id, menuItem) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update menu item");
  }

  return data;
}

export async function deleteMenuItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete menu item");
  }

  return data;
}

export async function updateAvailability(id, availability) {
  const response = await fetch(`${API_URL}/${id}/availability`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ availability }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update availability");
  }

  return data;
}
