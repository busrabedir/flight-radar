const Error = ({ message }) => {
  return (
    <div className="loader-wrapper">
      <b>Uçuş Verisi Alınamadı</b>
      <p>{message}</p>
    </div>
  );
};

export default Error;
