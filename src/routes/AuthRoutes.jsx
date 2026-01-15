import { Route } from 'react-router-dom';
import UserHome from '../Pages/Website/UserHome/UserHome.jsx';
import ContentCreatorDashboard from '../Pages/Dashboards/ContentCreator/ContentCreator.jsx';
import ContentPreview from '../Pages/Dashboards/ContentCreator/PreviewPage/ContentPreview.jsx';
import LabsPreview from '../Pages/Dashboards/ContentCreator/PreviewPage/LabsPagePreview';
import AddContent from '../Pages/Dashboards/ContentCreator/EditorPage/AddContent.jsx';
import AddCourse from '../Pages/Dashboards/ContentCreator/EditorPage/AddCourse.jsx';
import AddLab from '../Pages/Dashboards/ContentCreator/EditorPage/AddLab.jsx';
import DraftPage from '../Pages/Dashboards/ContentCreator/DraftsPage/DraftsPage.jsx';

import TraineeDashboard from '../Pages/Dashboards/Trainee/TraineeDashboard.jsx';
import Profile from '../Pages/Dashboards/Profile/UserProfile.jsx';
import LearningPaths from '../Pages/Website/Paths/Paths.jsx';
import OurPaths from '../Pages/Website/CareerPaths/CareerPaths.jsx';
import AllLabs from '../Pages/Website/AllLabs/AllLabs.jsx';
import AuthCallback from '../Pages/Auth/AuthCallback.jsx';
import VerifyEmail from '../Pages/Auth/VerifyEmail';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import ResetPassword from '../Pages/Auth/ResetPassword';
const AuthRoutes = (
  <>
    <Route
      path='/content-creator/dashboard'
      element={<ContentCreatorDashboard />}
    />
    <Route path='/trainee-dashboard' element={<TraineeDashboard />} />
    {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
    <Route path='labs/drafts' element={<DraftPage />} />
    <Route path='/content/preview' element={<ContentPreview />} />
    <Route path='/labs/preview' element={<LabsPreview />} />
    <Route path='/create/content' element={<AddContent />} />
    <Route path='/create/course' element={<AddCourse />} />
    <Route path='/create/lab' element={<AddLab />} />
    <Route path='/dashboard/profile' element={<Profile />} />
    <Route path='/home' element={<UserHome />} />
    <Route path='/labs/all-labs' element={<AllLabs />} />
    <Route path='/career-paths' element={<OurPaths />} />
    <Route path='/cybersec/learning-paths' element={<LearningPaths />} />
    <Route path='/verify-email' element={<VerifyEmail />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password' element={<ResetPassword />} />
    <Route path='/auth/callback' element={<AuthCallback />} />
  </>
);

export default AuthRoutes;
