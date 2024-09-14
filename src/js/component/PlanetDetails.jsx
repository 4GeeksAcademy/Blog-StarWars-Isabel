import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PlanetDetails = () => {
    const { id } = useParams();
    const [planetDetails, setPlanetDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanetDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                if (!response.ok) throw new Error("Failed to fetch character details");
                const data = await response.json();
                setPlanetDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPlanetDetails();
    }, [id]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            {planetDetails ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                            onError={(e) => e.target.src = "/path-to-default-image.jpg"} 
                            className="img-fluid" 
                            alt={planetDetails.name} 
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <h1>{planetDetails.name}</h1>
                        <p><strong>Climate:</strong> {planetDetails.climate || "N/A"}</p>
                        <p><strong>Terrain:</strong> {planetDetails.terrain || "N/A"}</p>
                        <p><strong>Population:</strong> {planetDetails.population || "N/A"}</p>
                        <p><strong>Diameter:</strong> {planetDetails.diameter || "N/A"} km</p>
                        <p><strong>Rotation Period:</strong> {planetDetails.rotation_period || "N/A"} hours</p>
                        <p><strong>Orbital Period:</strong> {planetDetails.orbital_period || "N/A"} days</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading planets details...</p>
                </div>
            )}
        </div>
    );
};

