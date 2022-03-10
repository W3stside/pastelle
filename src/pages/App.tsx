import { Suspense } from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'

import AboutUs from 'pages/AboutUs'
import Popups from 'components/Popups'
import Web3ReactManager from 'components/blockchain/Web3ReactManager'

import Header from 'components/Header'
// import Footer from 'components/Footer'

import Catalog from 'pages/Catalog'
import Navigation from 'components/Navigation'
import NotFound from './Error/NotFound'
import { useCatalogByYearAndSeason } from 'state/catalog/hooks'
import { FixedAnimatedLoader } from 'components/Loader'

// TODO: move
// Redirects to swap but only replace the pathname
const DEFAULT_CATALOG_YEAR = '2022'
const DEFAULT_CATALOG_SEASON = 'FALL'
const DEFAULT_CATALOG_START_ITEM = 'LEER'
export function RedirectPathToCatalogOnly({ location }: RouteComponentProps) {
  return (
    <Redirect
      to={{
        ...location,
        pathname: `/catalog/${DEFAULT_CATALOG_YEAR}/${DEFAULT_CATALOG_SEASON}/${DEFAULT_CATALOG_START_ITEM}`
      }}
    />
  )
}

export default function App() {
  // We need something to show. We'll go with catalog by year and season, why not.
  // if there isn't yet data, show something else
  const catalogBySeason = useCatalogByYearAndSeason({ year: '2022', season: 'FALL' })

  if (!catalogBySeason) return <FixedAnimatedLoader loadText="PSTL" />

  return (
    <Web3ReactManager>
      <Suspense fallback={null}>
        <Popups />
        {/* HEADER */}
        <Header />
        {/* SIDE-NAV */}
        <Navigation />
        {/* ARTICLE CONTENT */}
        <Switch>
          <Route exact strict path="/catalog/:year/:season/:itemName" component={Catalog} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/404" component={NotFound} />
          <Route component={RedirectPathToCatalogOnly} />
          <Route component={NotFound} />
        </Switch>
        {/* FOOTER */}
        {/* <Footer /> */}
      </Suspense>
    </Web3ReactManager>
  )
}
