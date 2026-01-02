import { divIcon } from "leaflet";

// İkonun yönünü uçağın yönüyle eşitle
// Aktif bir uçuş varsa aktif olan dışında hepsini gizle
export const getIcon = (flight, activeFlightId) => {
  return divIcon({
    html: `
    <div style="transform:rotate(${flight.direction - 45}deg)"> 
    <img src="/plane.svg" width="30px" height="30px"/>
    </div>
    `,
    iconSize: [30, 30],
    className: `marker ${activeFlightId && "passive-flight"} ${
      flight.flightId === activeFlightId && "active-flight"
    }`,
  });
};

// Unix Zaman Formatı: 1970'den süre gelen saniye cinside tarih
// Param: 1765385100
// Return: 20:15

export const formatDate = (unixTime) => {
  // değer yoksa null döndür
  if (!unixTime || !unixTime === 0) return null;

  // saniye formatındaki veriyi milisaniye formatına çevir
  const formatted = new Date(unixTime * 1000);

  // saat ve dakikayı döndür
  return formatted.toLocaleTimeString("tr", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
