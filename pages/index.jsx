import Head from 'next/head';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
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
      <p>Email: {user.email}</p>
    </>
  );
}

Index.getInitialProps = async (ctx) => ({ user: ctx.query.user });

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
