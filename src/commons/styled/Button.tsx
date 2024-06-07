import styled from "styled-components";

export const StyledButton = styled.button`
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSize};
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-weight: ${props => props.theme.fontWeight};
    font-family: inherit;
    background-color: #f9f9f9;
    transition: border-color 0.25s;

    &:hover {
        color: ${props => props.theme.colors.secondary};
        border-color: ${props => props.theme.colors.secondary};
    }
    
    &:focus,:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`;
