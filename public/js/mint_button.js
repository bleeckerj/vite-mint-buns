'use strict';

const e = React.createElement;

class MintButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minted: false };
    console.log("Hello?");
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }
    // return React.createElement(
    //     'button',
    //     { style : {background : 'background(255,255,255,0.5)'}},
    //     { onClick: () => window.tokenUri() },
    //     "Mint Bun"
    // )
    // return e(
    //   'button',
     // { onClick: () => this.setState({ liked: true }) },
     //'Like'

    //  { onClick: () => window.tokenUri() },"Get Token 3 URI",
    // );
    return (
      React.createElement('button',
      {
      style: {background : 'rgb(255,255,255, 0.5'},
      onClick: () => window.tokenUri()
      },
      "Mint Brioche Bun"
      )
    )
    }
}

const domContainer = document.querySelector('#like_button_container');
console.log(domContainer);
ReactDOM.render(e(MintButton), domContainer);