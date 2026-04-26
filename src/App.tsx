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
// Legacy
const SocialLayout = lazy(() => import('./social/Layout'));
const SocialDashboard = lazy(() => import('./social/Dashboard'));
const SocialCalendar = lazy(() => import('./social/Calendar'));
const SocialPosts = lazy(() => import('./social/Posts'));
const SocialAnalytics = lazy(() => import('./social/Analytics'));
const SocialMedia = lazy(() => import('./social/Media'));
const SocialSettings = lazy(() => import('./social/Settings'));

const ProjectsList = lazy(() => import('./social/ProjectsList'));
const ProjectControlCenter = lazy(() => import('./social/ProjectControlCenter'));

// IA Components
const IAControlCenter = lazy(() => import('./social/IAControlCenter'));
const IAChat = lazy(() => import('./social/IAChat'));
const IAClients = lazy(() => import('./social/IAClients'));
const IAOnboarding = lazy(() => import('./social/IAOnboarding'));

// New SocialGenius Pro Layout
const ResponsiveLayout = lazy(() => import('./social/ResponsiveLayout'));
const HomeView = lazy(() => import('./social/HomeView'));
const ProjectChat = lazy(() => import('./social/ProjectChat'));
const AccountsScreen = lazy(() => import('./social/AccountsScreen'));
const CreateScreen = lazy(() => import('./social/CreateScreen'));
const UnifiedCalendar = lazy(() => import('./social/UnifiedCalendar'));
const YouTubeStudio = lazy(() => import('./social/YouTubeStudio'));
const IntegrationDashboard = lazy(() => import('./social/IntegrationDashboard'));

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
          <Route path="/social" element={<ResponsiveLayout />}>
            <Route index element={<HomeView />} />
            <Route path="chat/:id" element={<ProjectChat />} />
            <Route path="onboarding" element={<IAOnboarding />} />
            <Route path="calendar" element={<UnifiedCalendar />} />
            <Route path="create" element={<CreateScreen />} />
            <Route path="accounts" element={<AccountsScreen />} />
            <Route path="youtube" element={<YouTubeStudio />} />
            <Route path="settings" element={<IntegrationDashboard />} />
            {/* Legacy Routes Kept for safety */}
            <Route path="projects/:id" element={<ProjectControlCenter />} />
            <Route path="dashboard" element={<SocialDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// MJ Commit

