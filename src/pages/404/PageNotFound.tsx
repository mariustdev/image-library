import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

const PageNotFound: FC = () => {
    const navigate = useNavigate();
    const handleHomeNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <main>
            <div>
                <p>404</p>
                <h1>Page not found</h1>
                <p>Sorry, we could’t find the page you’re looking for.</p>
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

export default PageNotFound;
