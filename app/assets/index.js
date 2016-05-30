 /* global document */
require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
require('./css/main.css');
import React from 'react';
import ReactDOM from 'react-dom';
let source = require("../source.json");
console.log("Hi");

export class App extends React.Component {

  render() {
    console.log("source", source);
    return (
      <div className="top" style={styles.container}>
        <div className="fill" style={styles.fill}>
          <div className="quotation" style={styles.quotation}>
            <div style={styles.text}>
              {source.quotation.text}
            </div>
            <div style={styles.attribution}>
              &ndash;{source.quotation.attribution}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const styles = {
  top: {
    flexDirection: 'row',
  },
  fill: {
    background: `url(/images/${source.image.path}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },

  quotation: {
    backgroundColor: 'black',
    opacity: '0.5',
    fontFamily: 'Lora',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: '1em',
  },

  text: {
    fontSize: '2em',
    color: 'white',
  },

  attribution: {
    fontSize: '1.4em',
    color: 'white',
    fontStyle: 'italic',
  },
};

ReactDOM.render(<App/>, document.querySelector("#myApp"));
