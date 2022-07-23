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
      <Box
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', p: 2 }}
        borderRadius={4}
        boxShadow={4}
      >
        <Box
          component="img"
          src={img}
          sx={{ display: 'block', maxWidth: '100%', mb: 2 }}
          borderRadius={4}
        />

        <Box sx={{ marginBottom: 3 }}>
          <Typography color="white" component="h6" variant="h6">
            {title}
          </Typography>

          {desc && (
            <Typography
              component="p"
              variant="p"
              color="lightgray"
              sx={{
                height: 48,
                overflow: 'hidden',
                'text-overflow': 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                'line-clamp': '2',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {desc}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            component="h5"
            color="white"
            fontWeight="500"
            sx={{ marginRight: 2 }}
          >
            {price}RSD
          </Typography>

          <Button variant="outlined" color="tertiary" sx={{ flex: 1 }}>
            Buy
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

StoreItem.propTypes = propTypes;
StoreItem.defaultProps = defaultProps;

export default StoreItem;
