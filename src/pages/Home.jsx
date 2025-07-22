import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail"); 

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome {email || "user@example.com"}!</h1>
        <p>This is a protected page only for logged-in users.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
