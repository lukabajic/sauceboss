import { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import { userPropTypes } from './propTypes';

const propTypes = {
  user: userPropTypes,
  isFromServer: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.object.isRequired,
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
      const { user, isFromServer, router } = this.props;

      if (isFromServer) globalUser = user;

      const redirectToLogin = loginRequired && !logoutRequired && !user;
      if (redirectToLogin) return router.push('/public/login', '/login');

      if (logoutRequired && user) return router.push('/');
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

  return withRouter(App);
}
