import withAuth from '../lib/withAuth';

function Store() {
  return <h1>Store</h1>;
}

export default withAuth(Store);
