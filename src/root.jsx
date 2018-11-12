import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

import routes from './routes'

type Props = {
  store: Object,
  history: Object
}

export default class Root extends Component<Props> {
    render() {
        const {store, history} = this.props
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>
        )
    }
}
