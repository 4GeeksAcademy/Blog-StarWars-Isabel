import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from '../store/FavoriteContext.js'; // Asegúrate de que esté correctamente importado

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, addFavorite } = useFavorites(); // Usa el contexto de favoritos

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/vehicles/");
                const data = await response.json();
                setVehicles(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFavorite = (vehicle) => {
        addFavorite(vehicle); // Llama a la función para añadir/quitar favoritos
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div id="vehiclesCarousel" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex overflow-auto">
                                    {vehicles.map((vehicle, index) => {
                                        const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${index + 1}.jpg`;

                                        return (
                                            <div className="card" key={vehicle.name} style={{ width: '18rem', flex: '0 0 auto' }}>
                                                <img 
                                                    src={imageUrl} 
                                                    className="card-img-top" 
                                                    alt={vehicle.name}
                                                    onError={(e) => e.target.src = "/path-to-default-image.jpg"} // Imagen de respaldo
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{vehicle.name}</h5>
                                                    <p className="card-text">
                                                        <strong>Model:</strong> {vehicle.model || "N/A"}<br />
                                                        <strong>Manufacturer:</strong> {vehicle.manufacturer || "N/A"}<br />
                                                        <strong>Cost in Credits:</strong> {vehicle.cost_in_credits || "N/A"}
                                                    </p>
                                                    <Link to={`/vehicle/${index + 1}`} className="btn btn-info">Read More</Link>
                                                    <button 
                                                        className={`btn ms-2 ${favorites.some(fav => fav.name === vehicle.name) ? 'btn-danger' : 'btn-outline-primary'}`} 
                                                        onClick={() => handleFavorite(vehicle)}
                                                    >
                                                        <i className={`bi ${favorites.some(fav => fav.name === vehicle.name) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#vehiclesCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};