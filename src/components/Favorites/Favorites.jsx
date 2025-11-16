import "./Favorites.css";

function Favorites({ showFavorites, onToggle }) {
  return (
    <button className="fav-filter" onClick={onToggle}>
      {showFavorites ? "Show All" : "Show Favorites"}
    </button>
  );
}

export default Favorites;

