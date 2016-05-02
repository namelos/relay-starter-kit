import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'

let HelloApp = ({ greetings }) =>
  <h1>{ greetings.hello }</h1>

HelloApp = Relay.createContainer(HelloApp, {
  fragments: {
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello,
      }
    `
  }
})

class HelloRoute extends Relay.Route {
  static routeName = 'Hello'
  static queries = {
    greetings: Component => Relay.QL`
      query GreetingsQuery {
        greetings {
          ${Component.getFragment('greetings')}
        }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer Component={HelloApp} route={new HelloRoute()}/>,
  document.getElementById('root')
)

// import 'babel-polyfill'
//
// import App from './components/App'
// import AppHomeRoute from './routes/AppHomeRoute'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Relay from 'react-relay'
//
// ReactDOM.render(
//   <Relay.RootContainer
//     Component={App}
//     route={new AppHomeRoute()}
//   />,
//   document.getElementById('root')
// )
