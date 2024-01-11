import { Routes, Navigate, Route } from 'react-router-dom'
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User'
import BlogList from './pages/auth/BlogList';
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar"
import BlogDetail from './pages/auth/BlogDetail';
import * as React from 'react'

// 1. import `ChakraProvider` component
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})


function App() {
  return <>
  <ChakraBaseProvider theme={theme}>
    <Navbar />
    <Routes>
      <Route path='/' element={<PersistLogin />}>
        <Route index exact element={<Home />}></Route>
        <Route path='/auth'>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='user' element={<AuthMiddleware />}>
            <Route index element={<User />}></Route>
          </Route>
          <Route path='blog' element={<AuthMiddleware />}>
            <Route index element={<BlogList />}></Route>
          </Route>
          <Route path='blog/:id' element={<AuthMiddleware />}>
            <Route index element={<BlogDetail />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
    </ChakraBaseProvider>
  </>
}

export default App;
