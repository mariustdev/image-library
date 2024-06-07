import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

const Error: FC = () => {
  const navigate = useNavigate();
  const handleHomeNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  }
  return (
    <main>
      <div>
        <h1>Something went wrong</h1>
        <p>You see this message for better user experience. Try again navigation to Gallery</p>
        <div>
          <a
            href=""
            onClick={handleHomeNavigation}
          >
            Go back to Gallery
          </a>
        </div>
      </div>
    </main>
  )
}

export default Error;
