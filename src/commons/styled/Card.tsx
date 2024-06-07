import styled from "styled-components";

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 20%;
    max-width: 20%;
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSize};
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid transparent;
    font-weight: ${props => props.theme.fontWeight};
    font-family: inherit;
    background-color: #f9f9f9;
    box-shadow: -3px 5px 15px rgba(0, 0, 0, 0.11);
    overflow: hidden;
    margin: 10px 0;
    max-height: 320px;
    .title {
        padding: 10px;
        font-weight: bold;
        text-align: center;
    }

    .description {
        padding: 10px;
        text-align: center;
    }

    .image-container {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    &.active {
       border: 1px solid red;
    }

    @media (max-width: 1200px) {
        flex: 1 1 30%;
        max-width: 30%;
    }

    @media (max-width: 800px) {
        flex: 1 1 45%;
        max-width: 45%;
    }

    @media (max-width: 600px) {
        flex: 1 1 100%;
        max-width: 100%;
    }
`;
