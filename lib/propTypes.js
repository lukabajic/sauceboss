import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
});
