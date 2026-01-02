import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const params = {
  bl_lat: "34.133475",
  bl_lng: "22.792884",
  tr_lat: "43.92458",
  tr_lng: "47.851927",
  limit: "300",
  speed: "40,99999999",
  altitude: "10,999999999",
};

export const getFlights = createAsyncThunk("flight/getFlights", async () => {
  // api'dan türkiye üzerindeki uçuş verilerini al
  const res = await api.get("/flights/list-in-boundary", { params });

  // api'dan gelen veriyi formatla
  // dizi içerisindeki dizileri nesnelere çevirelim

  const formated = res.data.aircraft.map((i) => ({
    flightId: i[0],
    callsign: i[1],
    lat: i[2],
    lon: i[3],
    direction: i[4],
    altitude: i[5],
    speed: i[6],
  }));

  // aksiyonun payloadını return et
  return formated;
});

export const getDetails = createAsyncThunk(
  "detail/getDetails",
  async (flight) => {
    // api isteğini at
    const res = await api.get("/flights/detail", { params: { flight } });

    // aksiyonun payloadını belirle
    return res.data;
  }
);
