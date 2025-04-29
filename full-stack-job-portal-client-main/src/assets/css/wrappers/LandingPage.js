import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 100vh; */
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding: calc(1.5rem + 1.5vh) calc(1.2rem + 1.75vw);

    .hero-content {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(auto, 600px) minmax(auto, 450px);
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: calc(1.2rem + 1.75vw);
        font-weight: 700;
        letter-spacing: 1.5px;
    }
    h1 .fancy {
        color: var(--color-primary);
    }
    p {
        font-size: calc(0.8rem + 0.2vw);
        font-weight: 300;
        line-height: 24px;
        text-align: justify;
        margin-top: 2rem;
        margin-bottom: 2.2rem;
    }
    .btn-grp {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        gap: 1rem;
    }

    .btn {
        text-decoration: none;
        text-transform: capitalize;
        font-weight: 400;
        font-size: calc(1rem + 0.2vw);
        color: var(--color-white);
        background-color: var(--color-primary);
        border: 1px solid var(--color-primary);
        padding: calc(5px + 0.15vw) calc(15px + 0.3vw);
        border-radius: 6px;
        transition: all 0.3s ease-in;
    }
    .btn:hover {
        background-color: var(--color-secondary);
        box-shadow: var(--shadow-1);
    }
    .placeholder {
        display: flex;
        justify-content: end;
    }
    .placeholder img {
        width: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 768px) {
        .hero-content {
            display: flex;
            flex-direction: column-reverse;
        }
        .text-content {
            margin-top: 1.75rem;
        }
        .placeholder {
            justify-content: center;
        }
        .placeholder img {
            width: 100%;
            max-width: 400px;
            object-fit: cover;
        }
        p {
            margin-top: 1.5rem;
            margin-bottom: 2.2rem;
        }
    }
`;

export default Wrapper;
