import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import withAuth from '../lib/withAuth';
import StoreItem from '../components/StoreItem';
import { specialCharsRemove } from '../lib/utils';
import { useScrollDetect } from '../lib/hooks';

const STORE_ITEMS = [
  {
    id: '1',
    title: 'Ananas Nana Čili',
    desc: 'Prelepog mirisa i sjajne teksture otvoriće apetit i učiniće svakodnevnu hranu uzbudljivijom. Spojem egzotičnih papričica i voća, sa našim tajnim miksom začina, dobili smo notu ukusa koja će ulepšati mnoga jela.',
    price: 400,
    img: '/store/ananas-nana-chilli.png',
    category: 'special',
  },
  {
    id: '2',
    title: 'Mango Habanero',
    desc: 'Definitivno najpoznatiji sos na svetu. Kako mnogi kažu savršen spoj ukusa. Koristi se širom sveta u različitim kulturama i kuhinjama. Našim spojem ukusa dobili smo pikantni sos sa intezivnim ukusom manga i posebno odabranih začina.',
    price: 400,
    img: '/store/mango-habanero.png',
    category: 'special',
  },
  {
    id: '3',
    title: 'Crveno Voće Čili',
    desc: 'Probali smo uz burito, paste, kao dresing za salate i ne znamo šta nam se više sviđa. Verujemo da ćete pronaći svoj spoj ukusa i da ćete dozvoliti sebi da uživate u novim kombinacijama uzbudljivih jela.',
    price: 400,
    img: '/store/red-fruit-chilli.png',
    category: 'special',
  },
  {
    id: '4',
    title: 'Halapenjo Sos',
    desc: 'Od najpoznatije paprike na svetu, stiže nam Jalapeno sos. Za sve gurmane koji su tražili nešto zbog čega njihova hrana više neće biti dosadna. Pikantnog ukusa, prirodne boje i mirisa koji tera vodu na usta, ovaj sos će biti idealan saputnik uz razna jela.',
    price: 400,
    img: '/store/jalapeno-sauce.png',
    category: 'special',
  },
];

// TODO: fetch server side image content
// TODO: fetch server side initial products
// TODO: change text to serbian

let resizeTimeout = null;

function Store() {
  const [isScrolled] = useScrollDetect();
  const filterForm = useRef(null);
  const [products, setProducts] = useState([]);
  const [filterWidth, setFilterWidth] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    categories: ['classic', 'special'],
    searchTerm: '',
  });

  const handleFilterFormWidth = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setFilterWidth(filterForm.current.clientWidth);
    }, 300);
  };

  useEffect(() => {
    handleFilterFormWidth();
    setProducts(STORE_ITEMS);
    setInitialProducts(STORE_ITEMS);
    window.addEventListener('resize', handleFilterFormWidth);
    return () => window.removeEventListener('resize', handleFilterFormWidth);
  }, []);

  const handleApplyFilters = () => {
    const filteredProducts = initialProducts.filter((i) => {
      let show = true;

      show = show && filters.minPrice <= i.price && i.price <= filters.maxPrice;
      show = show && filters.categories.includes(i.category);

      if (filters.searchTerm) {
        if (!show) return false;
        const search = specialCharsRemove(filters.searchTerm);
        const inTitle = specialCharsRemove(i.title).toLowerCase().includes(search);
        if (inTitle) return true;
        return i.desc && specialCharsRemove(i.desc).toLowerCase().includes(search);
      }

      return show;
    });

    setProducts(filteredProducts);
  };

  const handleSearchInput = (v) => {
    setFilters({
      ...filters,
      searchTerm: v,
    });
  };

  const handleMinPriceInput = (v) => {
    setFilters({
      ...filters,
      minPrice: v,
    });
  };

  const handleMaxPriceInput = (v) => {
    setFilters({
      ...filters,
      maxPrice: v,
    });
  };

  const handleCheckboxClicked = (v, checked) => {
    let categories = [...filters.categories];

    if (checked) {
      categories.push(v);
    } else {
      categories = categories.filter((i) => i !== v);
    }

    setFilters({
      ...filters,
      categories,
    });
  };

  return (
    <>
      <Head>
        <title>Prodavnica - Sauceboss</title>
        <meta
          name="description"
          content="Sauceboss prodavnica. Domaći slatki čili. Različite kategorije. Različiti ukusi. Kupite odmah."
        />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          pt: 10,
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          margin: '0 auto',
        }}
        maxWidth="lg"
      >
        <Grid container spacing={4} sx={{ pt: { xs: 2, sm: 4, md: 6 } }}>
          {isScrolled && (
            <Grid item md={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} />
          )}
          <Grid
            ref={filterForm}
            item
            md={3}
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
              position: isScrolled ? 'fixed' : 'relative',
              width: isScrolled ? filterWidth : '100%',
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', p: 2 }}
              borderRadius={4}
              boxShadow={4}
            >
              <Typography component="h6" variant="h6" marginBottom={4}>
                Filtriraj proizvode
              </Typography>

              <TextField
                id="search"
                label="Pretraga"
                type="search"
                variant="outlined"
                value={filters.searchTerm}
                onChange={({ target }) => handleSearchInput(target.value)}
                margin="none"
                sx={{ width: '100%', mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Typography component="p" variant="body1" marginBottom={1.5}>
                Po ceni (RSD):
              </Typography>

              <Stack spacing={1} direction="row" alignItems="center" mb={3}>
                <TextField
                  id="min"
                  label="Min"
                  type="number"
                  variant="outlined"
                  value={filters.minPrice}
                  onChange={({ target }) => handleMinPriceInput(target.value)}
                />

                <Typography component="p" variant="body2">
                  &mdash;
                </Typography>

                <TextField
                  id="max"
                  label="Maks"
                  type="number"
                  variant="outlined"
                  value={filters.maxPrice}
                  onChange={({ target }) => handleMaxPriceInput(target.value)}
                />
              </Stack>

              <Typography component="p" variant="body1" marginBottom={0}>
                Po kategoriji:
              </Typography>

              <FormGroup sx={{ mb: 3 }}>
                <FormControlLabel
                  onChange={({ target }) => handleCheckboxClicked('classic', target.checked)}
                  control={<Checkbox checked={filters.categories.includes('classic')} />}
                  label="Standardni"
                />
                <FormControlLabel
                  onChange={({ target }) => handleCheckboxClicked('special', target.checked)}
                  control={<Checkbox checked={filters.categories.includes('special')} />}
                  label="Specijalni"
                />
              </FormGroup>

              <Button variant="contained" fullWidth onClick={handleApplyFilters}>
                Primeni filtere
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={2}>
              {products.map((i) => (
                <StoreItem key={i.id} {...i} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withAuth(Store);
