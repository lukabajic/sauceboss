import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  googleId: PropTypes.string.isRequired,
  googleToken: PropTypes.shape({
    access_token: PropTypes.string,
    refresh_token: PropTypes.string,
    token_type: PropTypes.string,
    expiry_date: PropTypes.number,
  }).isRequired,
  slug: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
});
