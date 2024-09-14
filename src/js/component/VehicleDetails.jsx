import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const VehicleDetails = () => {
    const { id } = useParams(); // Obtiene el ID del vehículo desde la URL
    const [vehicleDetails, setVehicleDetails] = useState(null); // Estado para los detalles del vehículo
    const [error, setError] = useState(null); // Estado para manejar errores

    // useEffect que se ejecuta cuando el componente se monta o cuando cambia el id del vehículo
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
                if (!response.ok) throw new Error("Failed to fetch vehicle details");
                const data = await response.json();
                setVehicleDetails(data); // Actualiza el estado con los datos del vehículo
            } catch (err) {
                setError(err.message); // Si hay un error, lo guarda en el estado de error
            }
        };
        fetchVehicleDetails(); // Llama a la función fetchVehicleDetails
    }, [id]); // Dependencia de id, para que se ejecute cuando cambie el ID del vehículo

    // Si ocurre un error, se muestra un mensaje de error
    if (error) return <p>Error: {error}</p>;

    // Retorno del componente para mostrar los detalles del vehículo o un spinner de carga
    return (
        <div className="container mt-5">
            {vehicleDetails ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                            onError={(e) => e.target.src = "/path-to-default-image.jpg"} 
                            className="img-fluid" 
                            alt={vehicleDetails.name} 
                        />
                    </div>
                    <div className="col-md-6">
                        <h1>{vehicleDetails.name}</h1>
                        <p><strong>Model:</strong> {vehicleDetails.model || "N/A"}</p>
                        <p><strong>Manufacturer:</strong> {vehicleDetails.manufacturer || "N/A"}</p>
                        <p><strong>Cost in Credits:</strong> {vehicleDetails.cost_in_credits || "N/A"}</p>
                        <p><strong>Length:</strong> {vehicleDetails.length || "N/A"} meters</p>
                        <p><strong>Max Speed:</strong> {vehicleDetails.max_atmosphering_speed || "N/A"} km/h</p>
                        <p><strong>Crew:</strong> {vehicleDetails.crew || "N/A"}</p>
                        <p><strong>Passengers:</strong> {vehicleDetails.passengers || "N/A"}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading vehicle details...</p>
                </div>
            )}
        </div>
    );
};
