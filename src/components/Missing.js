import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section>
      <p>Requested page not found.</p>
      <p>
        <Link to={"/"}>Click here to return to Home Page.</Link>
      </p>
    </section>
  );
};

export default Missing;
