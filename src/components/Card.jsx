import { Link } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useState, useEffect } from "react";

export default function Card({ url, type }) {
    const { store, dispatch } = useGlobalReducer();
    const [objectShared, setobjectShared] = useState(
        { properties: { name: "", url: "" }, description: "" }
    );
    const isFavorite = store[type]
        .find(item => item.uid === objectShared.uid)?.favorite === true;
    const typeColors = {
        vehicles: "green",
        peoples: "blue",
        planets: "orange"
    };
    const color = typeColors[type] || "gray";

    const localHandleClick = () => {
        dispatch({
            type: "shift_favorite",
            payload: { id: objectShared.uid, typeObj: type }
        })
        //        console.log('Is clicked' + type + '#' + objectShared.uid);
    }

    useEffect(() => {
        const fetchObject = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching the object:', error);
            }
        };

        if (url) {
            fetchObject(url).then(data => {
                setobjectShared(data.result);
                dispatch({
                    type: "updated_object",
                    payload: { object: data.result, id: data.result.uid, typeObj: type }
                });
            });
        }
    }, []);

    return (
        <div className="card mb-1 g-0" style={{ width: '200px' }}>
            <div className="card-body">
                <div className="card-header bg-white">
                    <img
                        src={`https://placehold.co/300/${color}/white?text=${type}`}
                        alt="avatar"
                        className="card-image flex-shrink-0"
                        style={{ width: '150px', objectFit: 'contain' }}
                    />
                </div>
                <h5 className="card-title">{objectShared.properties.name}</h5>
                <div className="row">
                    <div>
                        <h6>Properties</h6>
                        <ul className="list-group list-group-flush">
                            {Object.entries(objectShared.properties)
                                .filter(([key]) => key !== 'created' && key !== 'edited' && key !== 'name')
                                .slice(0, 3)
                                .map(([key, value]) => (
                                    <li className="list-group-item p-1" key={key}>
                                        <strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="card-footer bg-white d-flex justify-content-between p-1 flex-column">
                        <h6>Description</h6>
                        <p className="card-text card-description-ellipsis">{objectShared.description}</p>
                        <div className="d-flex w-100 justify-content-between mt-0">
                            {/* Link to the detail page */}
                            <Link
                                to={`/single/${type}/${objectShared.uid}`}
                                className="btn btn-learn-more"
                                style={{ border: 'none', background: 'none', color: '#0d6efd', padding: 0, textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#e7f1ff'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                            >
                                Learn more!
                            </Link>
                            <button
                                className={`btn btn-fav-star${isFavorite ? ' star-filled' : ''}`}
                                style={{ border: 'none', background: 'none', color: '#ffc107', padding: 0 }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fffbe7'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                onClick={localHandleClick}
                            >
                                <span className="star-label">✰</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}