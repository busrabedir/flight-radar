import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { getIcon } from "../../utils/helpers";
import { open } from "../../redux/slices/detailSlice";
import AirportMarker from "./airport-marker";
import { useEffect } from "react";
import { getFlights } from "../../redux/actions";

const Map = () => {
  const dispatch = useDispatch();
  const { flights } = useSelector((store) => store.flight);
  const { flightId, info, isLoading, route } = useSelector(
    (store) => store.detail
  );

  useEffect(() => {
    const id = setInterval(() => dispatch(getFlights()), 10000);

    return () => clearInterval(id);
  }, []);

  return (
    <MapContainer
      center={[38.95342, 35.428109]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Uçakları Listele */}
      {flights.map((flight) => (
        <Marker
          key={flight.flightId}
          position={[flight.lat, flight.lon]}
          icon={getIcon(flight, flightId)}
        >
          <Popup>
            <div className="popup">
              <span>Kod: {flight.callsign}</span>
              <button onClick={() => dispatch(open(flight.flightId))}>
                Detay
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Kalkış noktasını işaretle */}
      {!isLoading && info && (
        <AirportMarker info={info.airport.origin} title="Kalkış" />
      )}
      {/* Varış noktasını işaretle */}
      {!isLoading && info && (
        <AirportMarker info={info.airport.destination} title="Varış" />
      )}
      {/* Uçağın gittiği yolu çiz */}
      {!isLoading && route && (
        <Polyline positions={route} pathOptions={{ color: "red" }} />
      )}
    </MapContainer>
  );
};

export default Map;
