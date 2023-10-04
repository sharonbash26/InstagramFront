import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { AboutUs } from './pages/AboutUs'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { PostIndex } from './pages/PostIndex'
import { PostDetails } from './pages/PostDetails'
import './assets/styles/main.scss'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <main>
                        <Routes>
                            {/* <Route element={<HomePage />} path="/" /> */}
                            <Route element={<PostIndex />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                        
                            {/* <Route element={<PostDetails />} path="/post/:postId" /> */}
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}