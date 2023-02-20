import { Routes, Route } from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/HomePage/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/Auth/NotFound";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';

const Layout = (props) => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='/users' element={
                        <PrivateRoute><ListQuiz /></PrivateRoute>
                    } />
                </Route>

                <Route path='/quiz/:id' element={<DetailQuiz />} />

                <Route path='admins' element={
                    <PrivateRoute><Admin /></PrivateRoute>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quiz' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/test' element={<PrivateRoute />} />
                <Route path='*' element={<NotFound />} />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    );
}

export default Layout;