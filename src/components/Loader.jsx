function Loader({ mix }) {
  return (
    <div className={`loader ${mix}`}>
      <div className="loader__container">
        <div className="loader__block"></div>
        <div className="loader__block"></div>
      </div>
    </div>
  );
}

export default Loader;
