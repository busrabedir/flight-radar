import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { flights, isLoading, error } = useSelector((store) => store.flight);
  return (
    <header>
      <Link to="/" className="logo">
        <img src="logo.webp" alt="logo" width={40} />
        <h2>Udemig Radar</h2>
      </Link>

      <nav>
        <NavLink to="/">
          <button>Harita</button>
        </NavLink>
        <NavLink to="/list">
          <button>List</button>
        </NavLink>
      </nav>

      <h3>
        {isLoading
          ? "Radar çalışıyor..."
          : error
          ? `Hata: ${error}`
          : `${flights.length} uçuş bulundu`}
      </h3>
    </header>
  );
};

export default Header;
