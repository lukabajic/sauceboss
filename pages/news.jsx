import withAuth from '../lib/withAuth';

function News() {
  return <h1>News</h1>;
}

export default withAuth(News);
