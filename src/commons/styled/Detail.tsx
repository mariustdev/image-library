import styled from "styled-components";

export const StyledDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    
    .image-container {
        height: 50vh;
    }
    
    img {
        object-fit: contain;
        height: 100%;
    }
`;
