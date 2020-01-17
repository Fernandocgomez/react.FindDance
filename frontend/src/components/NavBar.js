import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    


    render() {
        console.log(this.props)

        return (

            <div className='navbar-item'>
                <Navbar variant="dark">
                    <Link to="/">
                        <img src={require('../assets/logo-white.png')} className='navbar-item-img' alt='logo'></img>
                    </Link>
                    <Nav className="mr-auto">
                    </Nav>


                    {this.props.showLoginBtnState ? (<>
                    <h3>Howdy {localStorage.userName.charAt(0).toUpperCase() + localStorage.userName.slice(1)}!</h3>
                        <Link className='navbar-link' to="/login" onClick={this.props.logout}>Logout</Link>
                    </>) : (<>
                        <Link className='navbar-link' to="/login">Login</Link>
                        <Link className='navbar-link' to='/signup'>Signup</Link>
                        
                    </>)}

                    
                </Navbar>
            </div>

        );
    }
}

export default NavBar;