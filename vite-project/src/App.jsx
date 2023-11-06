import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AboutUs } from './pages/AboutUs'
import { store } from './store/store'
import { PostIndex } from './pages/PostIndex'
import { PostDetails } from './pages/PostDetails'
import './assets/styles/main.scss'
import { LoginSignupPage } from './pages/LoginSignupPage'
import { ProfileUserPage } from './pages/ProfileUserPage'
import { UserPst } from './cmps/UserPst'
import { UserReel } from './cmps/UserReels'
import { UserSaved } from './cmps/UserSaved'
import { UserTagged } from './cmps/UserTagged'
import { NavHeader } from './cmps/NavHeader'
import { OtherUserProfile } from './pages/OtherUserProfile'
import { UserSinglePstDetails } from './cmps/UserSinglePstDetails'
import { Explore } from './pages/Explore'
// import { addPst } from './store/pst.actions'


export function App() {
    // const user = useSelector(storeState => storeState.userModule.user)
    // const userId = user._id
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <main>
                        <Routes>
                            <Route path="/pst" element={<PostIndex />} >
                                <Route path='/pst/:pstId' element={<PostDetails />} />
                            </Route>
                            <Route path='/explore' element={<Explore />}>
                                <Route path=':pstId' element={<PostDetails />} />
                            </Route>

                            <Route path="/login" element={<LoginSignupPage />} />
                            <Route element={<LoginSignupPage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />

                            <Route element={<ProfileUserPage />} path="/profile/:userId" >
                                <Route path="psts" element={<UserPst />}>
                                    <Route path=":pstId" element={<PostDetails />}></Route>
                                </Route>
                                <Route path="reels" element={<UserReel />}></Route>
                                <Route path="saved" element={<UserSaved />}></Route>
                                <Route path="tagged" element={<UserTagged />}></Route>
                            </Route>

                            
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}