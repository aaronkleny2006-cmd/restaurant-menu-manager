
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getMenuItems } from "./api";
import "./App.css";
import Admin from "./Admin";
import { createMenuItem } from "./api";

const foodImages = {
  Starter:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  Main:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  Dessert:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
};

function Navbar() {
  return (
    <nav className="restaurant-nav">
      <Link to="/" className="brand">
        <span className="brand-mark">S.</span>
        <span>SAFFRON <small>KITCHEN & CO.</small></span>
      </Link>

      <div className="nav-links">
  <Link to="/">Our Menu</Link>
  <a href="#story">Our Story</a>
  <a href="#contact">Contact</a>
  <Link to="/admin">Admin</Link>
</div>

      <a className="nav-cta" href="#menu">Explore Dishes ↗</a>
    </nav>
  );
}

function Dashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadMenu() {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch {
        setError("Our menu couldn't load. Please try again shortly.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  const visibleItems = menuItems.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.availability
  );

  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">GOOD FOOD. GOOD MOOD.</p>
          <h1>A little taste<br />of <em>something special.</em></h1>
          <p className="hero-description">
            Thoughtfully prepared dishes, fresh ingredients,
            and flavours worth coming back for.
          </p>
          <a className="primary-cta" href="#menu">
            Discover our menu <span>↗</span>
          </a>
          <div className="hero-note">
            <span className="status-dot" />
            Freshly prepared, served with love
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85"
            alt="Beautifully presented restaurant food"
          />
          <div className="image-caption">
            <span>MADE WITH CARE</span>
            <span>EST. WITH LOVE · EVERY DAY</span>
          </div>
        </div>
        <div className="hero-number">01 / FRESH · LOCAL · DELICIOUS</div>
      </header>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM OUR KITCHEN</p>
            <h2>Made to be <em>enjoyed.</em></h2>
          </div>
          <p className="section-description">
            Find your favourite, or discover something new.
          </p>
        </div>

        <div className="category-tabs">
          {["All", "Starter", "Main", "Dessert"].map((item) => (
            <button
              key={item}
              className={category === item ? "category-tab active" : "category-tab"}
              onClick={() => setCategory(item)}
            >
              {item === "All" ? "Everything" :
                item === "Main" ? "Main Course" : `${item}s`}
            </button>
          ))}
        </div>

        {loading && <p className="menu-message">Preparing the menu...</p>}
        {error && <p className="menu-message error-message">{error}</p>}

        {!loading && !error && visibleItems.length === 0 && (
          <div className="empty-menu">
            <span className="empty-icon">✳</span>
            <h3>Something delicious is coming.</h3>
            <p>
              Our menu is waiting for its first dishes.
              Add items through your menu manager to see them here.
            </p>
          </div>
        )}

        <div className="dish-grid">
          {visibleItems.map((item) => (
            <article className="dish-card" key={item._id}>
              <div className="dish-image">
                <img
                  src={foodImages[item.category] || foodImages.Main}
                  alt={item.dishName}
                  loading="lazy"
                />
                <span className="dish-category">{item.category}</span>
              </div>
              <div className="dish-details">
                <div className="dish-title-row">
                  <h3>{item.dishName}</h3>
                  <span className="dish-price">₹{item.price}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section" id="story">
        <p className="eyebrow">A SEAT AT OUR TABLE</p>
        <h2>Good meals make<br /> <em>great memories.</em></h2>
        <p>Come hungry. Leave happy. We’ll take care of the rest.</p>
      </section>

      <footer id="contact">
        <Link to="/" className="brand footer-brand">
          <span className="brand-mark">S.</span>
          <span>SAFFRON <small>KITCHEN & CO.</small></span>
        </Link>
        <p>Made with care. Shared with joy.</p>
      </footer>
    </>
  );
}

function AddMenuItem() {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Starter");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      await createMenuItem({
        dishName,
        description,
        category,
        price: Number(price),
      });

      setMessage("Dish added successfully!");
      setDishName("");
      setDescription("");
      setCategory("Starter");
      setPrice("");
    } catch (error) {
      setMessage(error.message || "Could not add the dish.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="admin-placeholder">
      <h1>Add a Dish</h1>
      <p>Enter the details of your new restaurant dish.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dishName">Dish Name</label>
          <br />
          <input
            id="dishName"
            type="text"
            value={dishName}
            onChange={(event) => setDishName(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Starter">Starter</option>
            <option value="Main">Main</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="price">Price (₹)</label>
          <br />
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Dish"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <br />
      <Link to="/admin">← Return to Dashboard</Link>
    </main>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/add"
          element={
            <>
              <Navbar />
              <AddMenuItem />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
