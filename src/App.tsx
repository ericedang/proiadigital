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

// Social Media Manager Lazy Pages
const SocialLayout = lazy(() => import('./social/Layout'));
const SocialDashboard = lazy(() => import('./social/Dashboard'));
const SocialCalendar = lazy(() => import('./social/Calendar'));
const SocialPosts = lazy(() => import('./social/Posts'));
const SocialAnalytics = lazy(() => import('./social/Analytics'));
const SocialMedia = lazy(() => import('./social/Media'));
const SocialAccounts = lazy(() => import('./social/Accounts'));
const SocialSettings = lazy(() => import('./social/Settings'));

// IA Components
const IAControlCenter = lazy(() => import('./social/IAControlCenter'));
const IAChat = lazy(() => import('./social/IAChat'));
const IAClients = lazy(() => import('./social/IAClients'));
const IAOnboarding = lazy(() => import('./social/IAOnboarding'));

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
          
          {/* Social Platform Routes */}
          <Route path="/social" element={<SocialLayout />}>
            <Route index element={<IAControlCenter />} />
            <Route path="ai-center" element={<IAControlCenter />} />
            <Route path="ai-chat" element={<IAChat />} />
            <Route path="clients" element={<IAClients />} />
            <Route path="onboarding" element={<IAOnboarding />} />
            <Route path="dashboard" element={<SocialDashboard />} />
            <Route path="calendar" element={<SocialCalendar />} />
            <Route path="posts" element={<SocialPosts />} />
            <Route path="analytics" element={<SocialAnalytics />} />
            <Route path="media" element={<SocialMedia />} />
            <Route path="accounts" element={<SocialAccounts />} />
            <Route path="settings" element={<SocialSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// MJ Commit

