import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMenuItems,
  deleteMenuItem,
  updateMenuItem,
  updateAvailability,
} from "./api";


function Admin() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({
  dishName: "",
  description: "",
  category: "Starter",
  price: "",
});
  async function handleDelete(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this dish?"
  );

  if (!confirmed) return;

  try {
    await deleteMenuItem(id);

    setMenuItems((items) =>
      items.filter((item) => item._id !== id)
    );
  } catch (err) {
    alert(err.message || "Failed to delete the dish.");
  }
}

async function handleAvailabilityToggle(item) {
  try {
    const updatedItem = await updateAvailability(
      item._id,
      !item.availability
    );

    setMenuItems((items) =>
      items.map((currentItem) =>
        currentItem._id === item._id ? updatedItem : currentItem
      )
    );
  } catch (err) {
    alert(err.message || "Failed to update availability.");
  }
}


async function handleUpdate(event) {
  event.preventDefault();

  try {
    const updatedItem = await updateMenuItem(editingId, {
      ...editForm,
      price: Number(editForm.price),
    });

    setMenuItems((items) =>
      items.map((item) =>
        item._id === editingId ? updatedItem : item
      )
    );

    setEditingId(null);
    setEditForm({
      dishName: "",
      description: "",
      category: "Starter",
      price: "",
    });
  } catch (err) {
    alert(err.message || "Failed to update the dish.");
  }
}

  useEffect(() => {
    async function loadMenu() {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError("Could not load menu items. Please check your backend.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const totalItems = menuItems.length;

  const availableItems = menuItems.filter(
    (item) => item.availability
  ).length;

  const unavailableItems = totalItems - availableItems;

  return (

    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/" className="brand admin-brand">
          <span className="brand-mark">S.</span>
          <span>
            SAFFRON
            <small>KITCHEN & CO.</small>
          </span>
        </Link>

        <p className="sidebar-label">WORKSPACE</p>

        <Link to="/admin" className="sidebar-link active">
          <span>▦</span> Dashboard
        </Link>

        <Link to="/add" className="sidebar-link">
          <span>＋</span> Add a dish
        </Link>

        <div className="sidebar-bottom">
          <p>SAFFRON KITCHEN</p>
          <span>Menu management studio</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">WORKSPACE / OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>

          <Link to="/" className="view-site-button">
            ↗ View restaurant website
          </Link>
        </header>

        <section className="admin-welcome">
          <div>
            <p className="admin-greeting">WELCOME BACK</p>
            <h2>Your kitchen, <em>your menu.</em></h2>
            <p>
              Manage your dishes and keep your restaurant menu up to date.
            </p>
          </div>

          <div className="welcome-decoration">S.</div>
        </section>

        <section className="admin-stats">
          <article className="stat-card">
            <span className="stat-icon">▤</span>
            <p>Total menu items</p>
           <h3>{loading ? "..." : error ? "!" : totalItems}</h3>
            <span className="stat-note">Your complete menu</span>
          </article>

          <article className="stat-card">
            <span className="stat-icon">✳</span>
            <p>Available dishes</p>
            <h3>{loading ? "..." : error ? "!" : availableItems}</h3>
            <span className="stat-note">Ready to be served</span>
          </article>

          <article className="stat-card">
            <span className="stat-icon">◷</span>
            <p>Unavailable dishes</p>
            <h3>{loading ? "..." : error ? "!" : unavailableItems}</h3>
            <span className="stat-note">Currently off the menu</span>
          </article>
        </section>

        <section className="admin-panel">
          <div>
            <p className="panel-eyebrow">MENU MANAGEMENT</p>
            <h2>Ready to update your menu?</h2>
            <p>
              Add a new creation to your restaurant menu whenever you're ready.
            </p>
          </div>

          <Link to="/add" className="admin-add-button">
            ＋ Add new dish
          </Link>
        </section>
        <section className="admin-panel">
  <div>
    <p className="panel-eyebrow">YOUR RESTAURANT MENU</p>
    <h2>Menu Items</h2>
    <p>Here are the dishes saved in your database.</p>
  </div>

  {loading ? (
    <p>Loading menu items...</p>
  ) : error ? (
    <p>{error}</p>
  ) : menuItems.length === 0 ? (
    <p>No dishes have been added yet.</p>
  ) : (
    <div className="menu-items-list">
      {menuItems.map((item) => (
        <article className="menu-item-row" key={item._id}>
          {editingId === item._id && (
  <form onSubmit={handleUpdate}>
    <div>
      <label>Dish Name</label>
      <input
        type="text"
        value={editForm.dishName}
        onChange={(event) =>
          setEditForm({
            ...editForm,
            dishName: event.target.value,
          })
        }
        required
      />
    </div>

    <div>
      <label>Description</label>
      <textarea
        value={editForm.description}
        onChange={(event) =>
          setEditForm({
            ...editForm,
            description: event.target.value,
          })
        }
        required
      />
    </div>

    <div>
      <label>Category</label>
      <select
        value={editForm.category}
        onChange={(event) =>
          setEditForm({
            ...editForm,
            category: event.target.value,
          })
        }
      >
        <option value="Starter">Starter</option>
        <option value="Main">Main</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>

    <div>
      <label>Price (₹)</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={editForm.price}
        onChange={(event) =>
          setEditForm({
            ...editForm,
            price: event.target.value,
          })
        }
        required
      />
    </div>

    <button type="submit">Save Changes</button>

    <button
      type="button"
      onClick={() => setEditingId(null)}
    >
      Cancel
    </button>
  </form>
)}
          <div>
            <h3>{item.dishName}</h3>
            <p>{item.description}</p>
            <span>{item.category}</span>
          </div>

          <div>
  <h3>₹{item.price}</h3>
  <p>
    {item.availability ? "Available" : "Unavailable"}
  </p>
  <button
  onClick={() => handleAvailabilityToggle(item)}
>
  {item.availability ? "Mark Unavailable" : "Mark Available"}
</button>

  <button
  onClick={() => {
    setEditingId(item._id);
    setEditForm({
      dishName: item.dishName,
      description: item.description,
      category: item.category,
      price: item.price,
    });
  }}
>
  Edit
</button>

  <button onClick={() => handleDelete(item._id)}>
  Delete
</button>
</div>
        </article>
      ))}
    </div>
  )}
</section>
        <footer className="admin-footer">
          <span>SAFFRON KITCHEN & CO.</span>
          <span>Made with care. Shared with joy.</span>
        </footer>
      </main>
    </div>
  );
}

export default Admin;
