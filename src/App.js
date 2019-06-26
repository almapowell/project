import React from 'react';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import routes from './routes'


function App() {
  return (
    <div className="App">
        <Header />
        {routes}
        <Footer />
    </div>
  );
}

export default App;
