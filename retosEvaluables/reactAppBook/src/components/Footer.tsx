import React from "react";

function Footer() {
    const styles: React.CSSProperties = {

        color: 'white',
        border: '1px solid white',
        height: '25vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <>
        <footer className="--bg-black" style = {styles}>
        <span style = {{padding: '5%'}}><i><a href="#">Instagram</a></i></span>
        <span style = {{padding: '5%'}}><i><a href="#">Facebook</a></i></span>
        <span style = {{padding: '5%'}}><i><a href="#">GitHub</a></i></span>
        <span style = {{padding: '5%'}}><i><a href="#">X</a></i></span>
        </footer>
        </>
    )
}

export default Footer;