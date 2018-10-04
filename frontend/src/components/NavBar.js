import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
class NavBar extends Component {
	state = {};
	render() {
		return (
			<div className="NavBar">
				<Link className="NavBar-link" to={'/flights'}>
					<span className="Navbar-icon-large">Flights</span>
					<i class="fas fa-plane-departure fa-lg Navbar-icon-small"
            
              aria-hidden="true"
          />
				</Link>
				<br />
				<Link className="NavBar-link" to={'/aircrafts'}>
				<span className="Navbar-icon-large">Aircraft</span>
				<i class="fas fa-plane fa-lg Navbar-icon-small"
					
						aria-hidden="true"
				/>
				
				</Link>
				<br />
				<Link className="NavBar-link" to={'/instructors'}>
				<span className="Navbar-icon-large">Instructors</span>
				<i class="fas fa-chalkboard-teacher fa-lg Navbar-icon-small"
					
						aria-hidden="true"
				/>	
				</Link>
				<br />
				<Link className="NavBar-link" to={'/billing'}>
				<span className="Navbar-icon-large">Billing</span>
				<i class="fas fa-file-invoice-dollar fa-lg Navbar-icon-small"
					
						aria-hidden="true"
				/>
				</Link>
				<br />
				<Link className="NavBar-link" to={'/settings'}>
				<span className="Navbar-icon-large">Settings</span>
				<i class="fas fa-cog fa-lg Navbar-icon-small"
					
						aria-hidden="true"
				/>
				</Link>
			</div>
		);
	}
}

export default NavBar;
