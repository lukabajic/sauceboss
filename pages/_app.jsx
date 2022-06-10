import App from 'next/app';
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../lib/theme';

import Header from '../components/Header';

const propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Head>
          {/* TODO */}
          {/* <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta httpEquiv="X-UA-Compatible" content="IE=7" />
          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta httpEquiv="refresh" content="0; url=http://example.com" />
          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta name="keywords" content="" /> */}
          {/* END TODO */}

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <CssBaseline />
        <Header {...pageProps} />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
MyApp.propTypes = propTypes;

export default MyApp;
