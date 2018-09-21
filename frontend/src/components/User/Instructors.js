import React, { Component } from 'react';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import Auth from './../Auhenication/Auth';

import './Instructors.css';
class Instructors extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Instructors">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'instructors' ]} />
				<NavBar />
				<section class="card-container">
					<article class="card">
						<header class="card__title">
							<h4>Charles Martinez</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVt2jtKbzaWOVWCNUPGs_Uwy0UccqHala9MU19ygYBeSmpeuk" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Charles is one of newest memeber of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experience:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>charlesM@yahoo.com</p>
							</main>
						</div>
					</article>

					<article class="card">
						<header class="card__title">
							<h4>Mike Warner</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNLoxG-UHDR9ByptEA0RMr_nvT-gk2iQoe04EjsPx-DRRm56ykzQ" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Mike is one of the memebers of Falcano Flight Services Instuctors
								Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experience:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>MikeW@yahoo.com</p>
							</main>
							</div>
					</article>
					<article class="card">
						<header class="card__title">
							<h4>Mary Finn</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTteGkDxbUM_3CuLDlWVrBAMlKxIqt0FGg86BR6fMLP4zoaW2pQ" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Mary is one of the memebers of Falcano Flight Services Instuctors
								Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experience:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>MaryF@yahoo.com</p>
							</main>
						</div>
					</article>

					<article class="card">
						<header class="card__title">
							<h4>Christopher Pine</h4>
							<p>Chief Pilot</p>
							
						</header>
						<figure class="card__thumbnail">
							<img src="https://qph.fs.quoracdn.net/main-qimg-b83054ef214471c6d8d998881a5a8953-c" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Christopher is one of the memebers of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experience:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>ChrisP@yahoo.com</p>
							</main>
						</div>
					</article>
					<article class="card">
						<header class="card__title">
							<h4>Thomas Sanders</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="http://www.eatsleepfly.com/v2/wp-content/uploads/2015/09/become-a-pilot.jpg" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Thomas is one of memebers of Falcano Flight Services Instuctors
								Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experienc:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>TomS@yahoo.com</p>
							</main>
						</div>
					</article>
					<article class="card">
						<header class="card__title">
							<h4>Sandra Klien </h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://www.thehindu.com/migration_catalog/article10092976.ece/alternates/FREE_660/18nov_tyramns01+19TH_WOMAN_LOCO_PIL.jpg" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Sandra is one of newest memeber of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									  CFI,CFII
              </p>
								<h4>Air Experienc:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>SandraK@yahoo.com</p>
							</main>
						</div>
					</article>
					<article class="card">
						<header class="card__title">
							<h4>Samather Meyer</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://i1.wp.com/www.siasat.com/wp-content/uploads/2018/08/Iram-Habib-800x500.jpg?fit=800%2C500&ssl=1" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Samather is one of newest memeber of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									HELICOPTER, Commercerical Helicopter Instructor,Instrumnet,
									CFI,CFII
              </p>
								<h4>Air Experienc:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>SamM@yahoo.com</p>
							</main>
						</div>
					</article>
					<article class="card">
						<header class="card__title">
							<h4>Kevin Collins</h4>
							<h4>Chief Pilot</h4>
						</header>
						<figure class="card__thumbnail">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaunK1MwAh7DbpA6A3hZnMyYSofJUceEXe_HBvmMJSWw6qKHbf-w" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Kevin is one of newest memeber of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experienc:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>KevinC@yahoo.com</p>
							</main>
						</div>
					</article>

					<article class="card">
						<header class="card__title">
							<h4>Baker MayFeild</h4>
							<p>Chief Pilot</p>
						</header>
						<figure class="card__thumbnail">
							<img src="https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1536783975/pilot-sleeping-on-flight-PILOTSLEEP0918.jpg?itok=SHvJeHM7" />
						</figure>
						<div className="InstructorInfo">
							<p>
								Baker is one of newest memeber of Falcano Flight Services
								Instuctors Staff. He holds the following.
            </p>
							<main class="card__description">
								<h4>Ratings:</h4>
								<p>
									AIRCRAFT, Commercerical Aircraft Instructor,Instrument,
									CFI,CFII
              </p>
								<h4>Air Experienc:</h4>
								<p>S300 AS50BA A109</p>
								<h4>Contact Info:</h4>
								<p>BakerM@yahoo.com</p>
							</main>
						</div>
					</article>
				</section>
			</div>
		);
	}
}

export default (Instructors) ;
