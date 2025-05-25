import { Link, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const location = useLocation();
    const { store, dispatch } = useGlobalReducer();

    // Ahora cada favorito es un objeto: { name, typeObj, id }
    const favorites = Object.entries(store)
        .flatMap(([type, arr]) =>
            arr
                .filter(item => item.favorite)
                .map(item => ({
                    name: item.result?.properties?.name,
                    typeObj: type,
                    id: item.uid
                }))
        )
        .filter(fav => fav.name); // Elimina undefined o strings vacíos

    const handleDeleteFavorite = (fav) => {
        dispatch({
            type: 'delete_favorite',
            payload: fav
        });
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                {location.pathname === "/blog" ? (
                    <span className="navbar-brand mb-0 h1">Go to Star Wars Blog</span>
                ) : (
                    <Link to="/blog">
                        <span className="navbar-brand mb-0 h1">Go to Star Wars Blog</span>
                    </Link>
                )}
                <div className="ml-auto dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle position-relative"
                        type="button"
                        id="favoritesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites
                        {favorites.length > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: "0.7em" }}
                            >
                                {favorites.length}
                                <span className="visually-hidden">unread favorites</span>
                            </span>
                        )}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                        {favorites.length === 0 ? (
                            <li><span className="dropdown-item-text text-muted">No favorites</span></li>
                        ) : (
                            favorites.map((fav, idx) => (
                                <li key={fav.typeObj + fav.id} className="d-flex align-items-center justify-content-between">
                                    <Link
                                        className="dropdown-item-text"
                                        to={`/single/${fav.typeObj}/${fav.id}`}
                                    >
                                        {fav.name}
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-danger ms-2"
                                        onClick={() => handleDeleteFavorite(fav)}
                                        title="Eliminar favorito"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};