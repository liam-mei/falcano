class NavBar extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        <Link to={Flights}></Link>
        <Link to={Aircraft}></Link>
        <Link to={Instructors}></Link>
        <Link to={Billing}></Link>
        <Link to={Settings}></Link>
      </div>
     );
  }
}
 
export default NavBar;