import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notfound-wrapper">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
			</div>
			<h2>Oops, The Page you are looking for can't be found!</h2>
			<form className="notfound-search">
				<input type="text" placeholder="Search..."/>
				<button type="button">Search</button>
			</form>
			<Link to="/"><span class="arrow"></span>Go Home</Link>
		</div>
	</div>

    )
}

export default NotFound;
