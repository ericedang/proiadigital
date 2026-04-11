/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

const HomePage = lazy(() => import('./pages/HomePage'));
const ExpertisePage = lazy(() => import('./pages/ExpertisePage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/boutique" element={<ShopPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// MJ Commit
