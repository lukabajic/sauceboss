import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { userPropTypes } from './propTypes';

const propTypes = {
  user: userPropTypes,
  isFromServer: PropTypes.bool.isRequired,
};

const defaultProps = {
  user: null,
};

let globalUser = null;

export default function withAuth(
  BaseComponent,
  { loginRequired = true, logoutRequired = false } = {},
) {
  class App extends Component {
    static async getInitialProps(ctx) {
      const isFromServer = typeof window === 'undefined';
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;
      if (isFromServer && user) user._id = user._id.toString();

      const props = { user, isFromServer };

      if (BaseComponent.getInitialProps)
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});

      return props;
    }

    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) globalUser = user;

      const redirectToLogin = loginRequired && !logoutRequired && !user;
      if (redirectToLogin) return Router.push('/public/login', '/login');

      if (logoutRequired && user) return Router.push('/');
    }

    render() {
      const { user } = this.props;

      const redirectToLogin = loginRequired && !logoutRequired && !user;
      if (redirectToLogin) return null;

      if (logoutRequired && user) return null;

      return <BaseComponent {...this.props} />;
    }
  }

  App.propTypes = propTypes;
  App.defaultProps = defaultProps;

  return App;
}
