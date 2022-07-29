import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const defaultProps = {
  desc: null,
};

function StoreItem({ id, title, desc, img, price }) {
  const handleClick = (itemId) => {
    console.log(itemId);
  };

  return (
    <Grid item xs={12} sm={4} onClick={() => handleClick(id)}>
      <Box sx={{ backgroundColor: '#F9F9F9', p: 2 }} borderRadius={4} boxShadow={4}>
        <Box
          component="img"
          src={img}
          sx={{ display: 'block', maxWidth: '100%', mb: 2 }}
          borderRadius={4}
        />

        <Box sx={{ marginBottom: 2 }}>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>

          {desc && (
            <Typography
              component="p"
              variant="body2"
              sx={{
                height: 40,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                lineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {desc}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h5" fontWeight="500" marginRight={2} minWidth={100}>
            {price}RSD
          </Typography>

          <Button variant="outlined" color="primary" sx={{ flex: 1 }}>
            Kupi
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

StoreItem.propTypes = propTypes;
StoreItem.defaultProps = defaultProps;

export default StoreItem;
