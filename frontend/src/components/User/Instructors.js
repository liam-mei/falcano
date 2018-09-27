import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import "./Instructors.css";

class Instructors extends React.Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			name: "",
			license: "",
			photo: "",
			rating: "",
			contact_info: "",
			modal: false,
			closeAll: false
		};

		this.toggle = this.toggle.bind( this );
		this.toggleput = this.toggleput.bind( this );
	}

	toggle()
	{
		this.setState( {
			modal: !this.state.modal
		} );
	}
	toggleput()
	{
		this.setState( {
			modal: !this.state.modal
		} );

		axios( {
			method: "PUT",
			// url: `${URL}/Instructors/${this.state.id}/`,
			data: {
				name: this.state.name,
				license: this.state.license,
				photo: this.state.photo,
				rating: this.state.rating,
				contact_info: this.state.contact_info
			},
			// headers: headers
		} )

			.then( response =>
			{
				console.log( "put response", response );
			} )
			.catch( error =>
			{
				console.log( "put error", error );
			} );
	}

	handleChange = e =>
	{
		this.setState( { [ e.target.name ]: e.target.value } );
	};

	render()
	{
		return <div className="Instructors">
        <TopHeader breadcrumb={["settings"]} />
			<NavBar />
			<div className="Instructors-container">
				<div className="Instructor-card ">
					<div className="card-name">Charles Martinez</div>
					<div className="card-number">141423523537</div>
					<div className="card-img">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVt2jtKbzaWOVWCNUPGs_Uwy0UccqHala9MU19ygYBeSmpeuk" />
					</div>
					<div className="card-description">
						<div className="description-title">Descriptions/Notes</div>
						<div className="description-content">
							Charles is one of newest memeber of Falcano Flight Services
              Instuctors Staff. He holds the following.
            </div>
					</div>
					<div className="card-rating">
						<div className="rating-title">Ratings:</div>
						<div className="rating-details">CFI,CFII,MEI</div>
					</div>
					<div className="card-contact">
						<div className="contact-title">Contact</div>
						<div className="contact-info">
							<div className="contact-email">charlesM@yahoo.com</div>
							<div className="contact-number">301-123-4567</div>
						</div>
					</div>
				</div>
				<div className="Instructor-card ">
					<div className="card-name">Mary Finn</div>
					<div className="card-number">1414235235323</div>
					<div className="card-img">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTteGkDxbUM_3CuLDlWVrBAMlKxIqt0FGg86BR6fMLP4zoaW2pQ" />
					</div>
					<div className="card-description">
						<div className="description-title">Descriptions/Notes</div>
						<div className="description-content">
							Mary is one of the memebers of Falcano Flight Services Instuctors
              Staff. He holds the following.
            </div>
					</div>
					<div className="card-rating">
						<div className="rating-title">Ratings:</div>
						<div className="rating-details">CFI,CFII,MEI</div>
					</div>
					<div className="card-contact">
						<div className="contact-title">Contact</div>
						<div className="contact-info">
							<div className="contact-email">MaryF@yahoo.com</div>
							<div className="contact-number">501-123-4567</div>
						</div>
					</div>
				</div>

				<div className="Instructor-card">
					<span className="Button">+</span>
				</div>
			</div>
      </div>
	}
}
export default Instructors;
