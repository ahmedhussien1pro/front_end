import { Route } from 'react-router-dom';
import RequireAuth from '../Pages/Auth/RequireAuth';

import Dashboard from '../Pages/Dashboards/Dashboard';

const DashboardRoutes = (
  <>
    {/* Protected Dashboard */}
    <Route element={<RequireAuth allowedRole={['writer', 'admin']} />}>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Route>
  </>
);

export default DashboardRoutes;
