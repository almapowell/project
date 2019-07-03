import React from 'react';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import routes from './routes'
import { loggedIn } from './Redux/Reducers/index'
import { connect } from 'react-redux'



class App extends React.Component {
  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {
    // if(!this.props.admin_id){
      this.props.loggedIn()
    // }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {routes}
        <Footer />
      </div>
    );
  }

}

function mapStateToProps(reduxState) {
  console.log(reduxState)
  return {
       admin_id: reduxState.admin_id,
       email: reduxState.email
  }
}

let mapDispatchToProps = {
 loggedIn 
}


export default connect(mapStateToProps, mapDispatchToProps )(App)
