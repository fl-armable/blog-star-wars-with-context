// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useState, useEffect } from "react";


// Define and export the Single component which displays individual item details.
export const Single = () => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()

  // Recupera los parámetros de la URL
  const { theType, theId } = useParams();
  // Busca el objeto correspondiente en el array adecuado usando theType y theId
  const obj = store[theType]?.find(item => item.uid === theId);
  const url = obj.url;
  const [simpleObject, setSimpleObject] = useState(
    { properties: { name: "", url: "" }, description: "" }
  );

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
      fetchObject(url).then(data => setSimpleObject(data.result));
//      console.log("Object fetched:", simpleObject);
    }
  }, []);
  return (
    <div className="container text-center">
      {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
        <div className="card mx-auto w-75 g-0">
            <div className="card-body p-2">
                <div className="d-flex mb-2 gap-2">
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/500px-Star_Wars_Logo.svg.png"}
                    alt="avatar" className="card-image flex-shrink-0" style={{width: '150px', objectFit: 'contain'}} />
                    <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{simpleObject.properties.name}</h5>
                        <p className="card-text mb-0">{simpleObject.description}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between border-top pt-2 overflow-auto flex-nowrap" style={{maxWidth: '100%'}}>
                    {Object.entries(simpleObject.properties)
                        .filter(([key]) => key !== 'created' && key !== 'edited' && key !== 'name')
                        .map(([key, value]) => (
                            <div className="text-center flex-fill" key={key} style={{minWidth: '60px'}}>
                                <div className="text-uppercase small text-secondary" style={{fontSize: '0.7rem'}}>{key.replace(/_/g, ' ')}</div>
                                <div className="fw-bold" style={{fontSize: '0.9rem'}}>{Array.isArray(value) ? value.join(', ') : value}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <Link to="/blog">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
