import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PrivateRoute from "./components/PrivateRoute";


// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Layout = lazy(() => import("./components/Layout"));
const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Users = lazy(() => import("./pages/Admin/Users"));
const TeachersLayout = lazy(() => import("./pages/Teachers/TeachersLayout"));
const TeachersDashboard = lazy(() => import("./pages/Teachers/TeachersDashboard"));
const StudentsLayout = lazy(() => import("./pages/Students/StudentsLayout"));
const StudentsDashboard = lazy(() => import("./pages/Students/StudentsDashboard"));
const ClassesList=lazy(()=>import("./pages/Admin/ClassesList"));
const Profile=lazy(()=>import("./pages/Auth/Profile"));
const CreateStudent=lazy(()=>import("./pages/Admin/CreateStudent"));
const StudentList=lazy(()=>import("./pages/Students/StudentList"));
const StudentDetails=lazy(()=>import("./pages/Students/StudentDetails"));
const StudentUpdate=lazy(()=>import("./pages/Students/StudentUpdate"));
const CreateTeacher=lazy(()=>import("./pages/Admin/CreateTeacher"));
const TeacherList=lazy(()=>import("./pages/Teachers/TeacherList"));
const TeacherDetails=lazy(()=>import("./pages/Teachers/TeacherDetails"));
const TeacherUpdate=lazy(()=>import("./pages/Teachers/TeacherUpdate"));
const CreateSchoolNews=lazy(()=>import("./pages/Teachers/CreateSchoolNews"));
const SchoolNewsList=lazy(()=>import("./pages/Teachers/SchoolNewsList"));
const CreateEvents=lazy(()=>import("./pages/Teachers/CreateEvents"));
const EventsList=lazy(()=>import("./pages/Teachers/EventsList"));
const CreateAcademics=lazy(()=>import("./pages/Teachers/CreateAcademics"));
const AcademicsList=lazy(()=>import("./pages/Teachers/AcademicsList"));
const CreateHighlights=lazy(()=>import("./pages/Teachers/CreateHighlights"));
const HighlightsList=lazy(()=>import("./pages/Teachers/HighlightsList"));
const CreateFunContent=lazy(()=>import("./pages/Teachers/CreateFunContent"));
const FunContentList=lazy(()=>import("./pages/Teachers/FunContentList"));
const CreateSubject=lazy(()=>import("./pages/Admin/CreateSubject"));
const CreateResult=lazy(()=>import("./pages/Admin/CreateResult"));
const StudentResult=lazy(()=>import("./pages/Students/StudentResult"));
const CreateFee=lazy(()=>import("./pages/Admin/CreateFee"));

const App = () => {
  // Define router with nested routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        

        {/* Private route wrapper */}
        {/* <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/> */}
        <Route path="/profile" element={<Profile/>}/>

        {/* Admin routes */}
        <Route path="adminDashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="classesList" element={<ClassesList />} />
          <Route path="createStudent" element={<CreateStudent />} />
          <Route path="createTeacher" element={<CreateTeacher />} />
          <Route path="createSubject" element={<CreateSubject />} />
          <Route path="createResult" element={<CreateResult />} />
          <Route path="createFee" element={<CreateFee />} />
        </Route>

        {/* Teachers routes */}
        <Route path="teachersDashboard" element={<TeachersLayout />}>
          <Route index element={<TeachersDashboard />} />
          <Route path="teacherList" element={<TeacherList />} />
          <Route path="teachers/:id" element={<TeacherDetails />} />
          <Route path="teachers/:id/edit" element={<TeacherUpdate />} />
          <Route path="schoolNews" element={<CreateSchoolNews />} />
          <Route path="schoolNewsList" element={<SchoolNewsList />} />
          <Route path="events" element={<CreateEvents />} />
          <Route path="eventsList" element={<EventsList />} />
          <Route path="academics" element={<CreateAcademics />} />
          <Route path="academicsList" element={<AcademicsList />} />
          <Route path="highlights" element={<CreateHighlights />} />
          <Route path="highlightsList" element={<HighlightsList />} />
          <Route path="funContent" element={<CreateFunContent />} />
          <Route path="funContentList" element={<FunContentList />} />
        </Route>

        {/* Students routes */}
        <Route path="studentsDashboard" element={<StudentsLayout />}>
          <Route index element={<StudentsDashboard />} />
          <Route path="studentsList" element={<StudentList />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/:id/edit" element={<StudentUpdate />} />
          <Route path="studentResult" element={<StudentResult />} />
        </Route>
      </Route>
    )
  );

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
};

export default App;
