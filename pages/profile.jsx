import withAuth from '../lib/withAuth';

function Profile() {
  return <h1>Profile</h1>;
}

export default withAuth(Profile);
