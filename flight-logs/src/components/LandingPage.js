import { Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      }
  }
  render() { 
    return ( 
      <div>
      <Link to={Signup} />
      <Link to={SIgnIn} />
        <h1>Flight Plan</h1>

        <form>
          <input placeholder="username">
          
          </input>
          <input placeholder="password">
          </input>
        </form>
        <p>

        </p>
      </div>
     );
  }
}
 
export default LandingPage;