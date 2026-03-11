import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { roleGuard } from './core/guards/roleGuard/role-guard';
import { hrdashboardResolver } from './core/resolver/hrDashboard/hrdashbord/hrdashboard-resolver';
import { loginRedirectGuard } from './core/guards/loginRedirect/login-redirect-guard';
import { managerslistResolver } from './core/resolver/hrDashboard/managerslist/managerslist-resolver';
import { employeeslistResolver } from './core/resolver/hrDashboard/employeeslist/employeeslist-resolver';
import { hrTeamsResolver } from './core/resolver/hrDashboard/hr-teamsresolver/hr-teams-resolver';
import { hrAllattendanceviewResolver } from './core/resolver/hrDashboard/hrattendanceviews/hr-allattendanceview-resolver';
import { authGuard } from './core/guards/authGuard/auth-guard';
import { hrProfileUpdateResolver } from './core/resolver/hrDashboard/hr-profileUpdate/hr-profile-update-resolver';
import { ManagerOwnAttendanceResolver } from './core/resolver/MgDashboard/managerOwnAttendance/manager-own-attendance-resolver';
import { mgDashboardResolver } from './core/resolver/MgDashboard/Mg-dashboard/mg-dashboard-resolver';
import { managerTeamAttendanceResolver } from './core/resolver/MgDashboard/managerTeamAttendance/manager-team-attendance-resolver';
import { managerOwnTeamViewResolver } from './core/resolver/MgDashboard/managerOwnTeamview/manager-own-team-view-resolver';
import { managertaskviewResolver } from './core/resolver/MgDashboard/managerTasksView/managertaskview-resolver';
import { managerProfileUpdateResolver } from './core/resolver/MgDashboard/manager-profileUpdate/manager-profile-update-resolver';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },


    {
        path :'auth/login',
        component : Login,
        canActivate :[loginRedirectGuard]
    },


    {
        path : 'dashboard/hr',
        loadComponent : ()=> 
            import('./features/dashboard/hr-dashboard/hr-dashboard')
            .then(m => m.HrDashboard),
        canActivate:[authGuard,roleGuard],
        resolve: {hrDashBoardData : hrdashboardResolver},
        data: {role: 'hr'}
    },


    {
        path : 'auth/managers',
        loadComponent : ()=> 
            import('./features/hr/manager-list/manager-list')
            .then(m => m.ManagerList),
        canActivate:[authGuard,roleGuard],
        resolve: {managerslistData : managerslistResolver},
        data: {role: 'hr'}
    },

    {
        path : 'auth/employees',
        loadComponent : ()=> 
            import('./features/hr/employee-list/employee-list')
            .then(m => m.EmployeeList),
        canActivate:[authGuard,roleGuard],
        resolve: {employeeslistData : employeeslistResolver},
        data: {role: 'hr'}
    },

    {
        path: 'auth/register',
        loadComponent: () => import('./features/hr/employee-creation/employee-creation')
            .then(m => m.EmployeeCreation),
        canActivate: [authGuard,roleGuard],
        data :{role:'hr'}
    },

    {
        path: 'auth/assign-employees',
        loadComponent: () => import('./features/hr/manager-assign/manager-assign')
            .then(m => m.ManagerAssign),
        canActivate: [authGuard,roleGuard],
        resolve:{
            managerslistsData:managerslistResolver,
            employeeslistsData: employeeslistResolver,
            teamsData : hrTeamsResolver
        },
        data :{role:'hr'}
    },

    
    {
        path: 'attendance/hr/all',
        loadComponent: () => import('./features/hr/attendance-view/attendance-view')
            .then(m => m.AttendanceView),
        canActivate: [authGuard,roleGuard],
        resolve:{
            attendanceData : hrAllattendanceviewResolver
        },
        data :{role:'hr'}
    },

    {
        path: 'hr/profile',
        loadComponent:()=>
            import('./features/hr/hr-profile-update/hr-profile-update')
            .then(m => m.HrProfileUpdate),
        canActivate:[authGuard, roleGuard],
        resolve :{profileData :hrProfileUpdateResolver},
        data:{role:'hr'}
    },








    {
        path : 'dashboard/manager',
        loadComponent : ()=> 
            import('./features/dashboard/manager-dashboard/manager-dashboard')
            .then(m => m.ManagerDashboard),
        canActivate:[authGuard,roleGuard],
        resolve:{dashboardData : mgDashboardResolver},
        data: {role: 'manager'}
    },


    {
        path : 'manager/mark-attendance',
        loadComponent : ()=> 
            import('./features/manager/mark-attendance/mark-attendance')
            .then(m => m.MarkAttendance),
        canActivate:[authGuard,roleGuard],
        resolve:{attendanceData : ManagerOwnAttendanceResolver},
        data: {role: 'manager'}
    },



    {
        path : 'manager/team',
        loadComponent : ()=> 
            import('./features/manager/team-attendance/team-attendance')
            .then(m => m.TeamAttendance),
        canActivate:[authGuard,roleGuard],
        resolve:{managerTeamAttendanceData : managerTeamAttendanceResolver},
        data: {role: 'manager'}
    },


    {
        path : 'my-employees',
        loadComponent : ()=> 
            import('./features/manager/our-team-view/our-team-view')
            .then(m => m.OurTeamView),
        canActivate:[authGuard,roleGuard],
        resolve:{managerOurTeamEmployeesData : managerOwnTeamViewResolver},
        data: {role: 'manager'}
    },


    {
        path:'manager/tasks',
        loadComponent:()=>
            import('./features/manager/manager-view-tasks/manager-view-tasks')
            .then(m=> m.ManagerViewTasks),
        canActivate:[authGuard, roleGuard],
        resolve:{viewTasksData : managertaskviewResolver},
        data:{role: 'manager'}
    },

    {
        path: 'manager/profile',
        loadComponent:()=>
            import('./features/manager/manager-profile-update/manager-profile-update')
            .then(m => m.ManagerProfileUpdate),
        canActivate:[authGuard, roleGuard],
        resolve :{profileData :managerProfileUpdateResolver},
        data:{role:'manager'}
    },











    {
        path : 'dashboard/employee',
        loadComponent : ()=> 
            import('./features/dashboard/employee-dashboard/employee-dashboard')
            .then(m => m.EmployeeDashboard),
        canActivate:[authGuard,roleGuard],
        data: {role: 'employee'}
    },


    {
        path :'**',
        redirectTo : 'auth/login'
    }

];
