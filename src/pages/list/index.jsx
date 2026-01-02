import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Error from "../../components/error";
import c from "../../utils/null-check";
import { open } from "../../redux/slices/detailSlice";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, flights } = useSelector((store) => store.flight);

  // kaçıncı elemandan itibaren gösterilecek
  const [start, setStart] = useState(0);

  // sayfa başına gösterilecek eleman sayısı
  const limit = 12;

  // gösterilecek son elemanı hesapla
  const end = start + limit;

  //belirlediğimiz aralıktaki elemanları al
  const currentFlights = flights.slice(start, end);

  // yeni sayfa seçildiğinde startı güncelle
  const handleChange = (e) => {
    setStart(e.selected * limit);
  };

  if (error) return <Error message={error} />;

  return (
    <div className="list-container ">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Kod</th>
              <th>Enlem</th>
              <th>Boylam</th>
              <th>Derece</th>
              <th>Hız</th>
              <th>İrtifa</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? new Array(12).fill("").map((i, key) => (
                  <tr key={key}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              : currentFlights.map((flight) => (
                  <tr key={flight.flightId}>
                    <td>{c(flight.flightId)}</td>
                    <td>{c(flight.callsign)}</td>
                    <td>{c(flight.lat)}</td>
                    <td>{c(flight.lon)}</td>
                    <td>{c(flight.direction)}°</td>
                    <td>{c(flight.speed)} kt</td>
                    <td>{c(flight.altitude)} ft</td>
                    <td>
                      <button onClick={() => dispatch(open(flight.flightId))}>
                        Detay
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handleChange}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(flights.length / limit)}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="pagination"
          pageClassName="page-item"
          previousClassName="page-item"
          nextClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default List;
