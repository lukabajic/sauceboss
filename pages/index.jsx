import Head from 'next/head';

import { userPropTypes } from '../lib/propTypes';
import withAuth from '../lib/withAuth';

const propTypes = {
  user: userPropTypes,
};

const defaultProps = {
  user: null,
};

function Index({ user }) {
  return (
    <>
      <Head>
        <title>Sauceboss</title>
        <meta name="description" content="This is the description of the Index page" />
      </Head>
      <p>Content on Index page</p>
      {user && <div>{user.email}</div>}
    </>
  );
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
