import React from 'react'
import Relay, { Route, createContainer, RootContainer } from 'react-relay'
import { render } from 'react-dom'

let HelloApp = ({ greetings: { hello } }) =>
  <h1>{hello}</h1>

HelloApp = createContainer(HelloApp, {
  fragments: {
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello,
      }
    `
  }
})

class HelloRoute extends Route {
  static routeName = 'Hello'
  static queries = {
    greetings: (Component) => Relay.QL`
      query GreetingsQuery {
        greetings {
          ${Component.getFragment('greetings')},
        },
      }
    `
  }
}

render(
  <RootContainer Component={HelloApp} route={new HelloRoute()}/>,
  document.getElementById('root')
)
