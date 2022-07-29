import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';

const propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const clampSX = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  lineClamp: '2',
  WebkitBoxOrient: 'vertical',
};

// large
// marginBottom={isFirst ? 2 : 0}

const getItemSX = (xs, sm, md, lg, xl, first, second) => {
  if (xs) return { gridColumn: 'span 12' };

  if (sm) {
    if (first) return { gridColumn: 'span 12' };
    if (second) return { gridColumn: 'span 6' };
    return { gridColumn: 'span 4' };
  }
  if (first) return { gridColumn: 'span 8', gridRow: 'span 2' };
  return { gridColumn: 'span 4' };
};

const getTitleProps = (xs, sm, md, lg, xl, first, second) => {
  if (xs) return { component: 'h6', variant: 'h6', fontWeight: 500 };
  if (sm) {
    if (first) return { component: 'h4', variant: 'h4', marginBottom: 0.5, fontWeight: 500 };
    if (second) return { component: 'h5', variant: 'h5', marginBottom: 0.5, fontWeight: 500 };
    return { component: 'h6', variant: 'h6' };
  }
  if (first) return { component: 'h3', variant: 'h3', marginBottom: 1, fontWeight: 500 };
  return { component: 'h5', variant: 'h5', fontWeight: 500 };
};

const getDescProps = (xs, sm, md, lg, xl, first, second) => {
  if (xs) return { component: 'p', variant: 'body2' };
  if (sm) {
    if (first) return { component: 'p', variant: 'body1' };
    if (second) return { component: 'p', variant: 'body1' };
    return { component: 'p', variant: 'body2' };
  }
  if (first) return { component: 'p', variant: 'h6', fontWeight: 400 };
  return { component: 'p', variant: 'body1' };
};

function BlogItem({ img, title, desc, index, slug }) {
  const isXL = useMediaQuery('(min-width:1536px)');
  const lg = useMediaQuery('(min-width:1200px)');
  const md = useMediaQuery('(min-width:900px)');
  const sm = useMediaQuery('(min-width:600px)');

  const isXS = !sm;
  const isSM = sm && !md;
  const isMD = md && !lg;
  const isLG = lg && !isXL;

  const isFirst = index === 0;
  const isSecond = [1, 2].includes(index);

  const itemSX = getItemSX(isXS, isSM, isMD, isLG, isXL, isFirst, isSecond);
  const titleProps = getTitleProps(isXS, isSM, isMD, isLG, isXL, isFirst, isSecond);
  const descProps = getDescProps(isXS, isSM, isMD, isLG, isXL, isFirst, isSecond);

  const link = `/blog/${slug}`;

  return (
    <Link href={link}>
      <Box
        component="a"
        sx={{
          backgroundColor: '#F9F9F9',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'block',
          borderRadius: 4,
          boxShadow: 4,
          ...itemSX,
        }}
      >
        <Box component="img" src={img} sx={{ display: 'block', maxWidth: '100%', mb: 2 }} />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography {...titleProps}>{title}</Typography>
          <Typography {...descProps} sx={clampSX}>
            {desc}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

BlogItem.propTypes = propTypes;

export default BlogItem;
