 /* global document */
require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
require('./css/main.css');
import React from 'react';
import ReactDOM from 'react-dom';
let source = require("./source.json");

export class App extends React.Component {

  render() {
    console.log("source", source);
    return (
      <div className="top" style={styles.container}>
        <div className="fill" style={styles.fill}>
          <div style={styles.quotation}>
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

const styles = {
  top: {
    flexDirection: 'row',
  },
  fill: {
    display: 'flex',
    background: `url(/images/${source.image.path}) no-repeat center center fixed`,
    flex: 1,
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
