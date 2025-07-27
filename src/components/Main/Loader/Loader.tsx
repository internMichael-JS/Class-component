import './Loader.css';

const Loader = () => {
  return (
    <div
      className="loader-wrapper"
      role="status"
      aria-label="Loading..."
      aria-live="polite"
    >
      <div className="spinner-ring" />
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;
