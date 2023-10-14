import { useDispatch, useSelector } from 'react-redux'
import { PstList } from '../cmps/PostList'
import { pstService } from '../services/pst.service.local'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { store } from '../store/store'
import { useEffect, useState } from 'react'
import { loadPsts, removePst, onRemovePstOptimistic } from '../store/pst.actions'
import { ADD_PST } from '../store/pst.reducer.js'
import { NavHeader } from '../cmps/NavHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { addPst } from '../store/pst.actions'
import { AppFooter } from '../cmps/AppFooter'
import { Loading } from '../cmps/Loading'


export function PostIndex() {
    const psts = useSelector(storeState => storeState.pstModule.psts) || []
    const [isLoading,setIsLoading]=useState(true)
    console.log('psts', psts)

    useEffect(() => {
        loadPage()
        loadPsts().catch(err => {
            console.log('err', err)
            showErrorMsg('Cannot load psts')
        })
    }, [])

    
    const loadPage = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }


    async function onAddPst(urlFromCloud) {
        const pst = pstService.getEmptyPst()
        pst.imgUrl = urlFromCloud
        console.log('pst imgUrlllllll', pst.imgUrl)
        try {
            const savedPst = await addPst(pst)
            console.log('saved pst from index', savedPst)
            showSuccessMsg(`post added (id: ${savedPst._id})`)
        } catch (err) {
            showErrorMsg('Cannot add post')
            console.log('cannot add post')
        }
    }


    
    if (isLoading) return <Loading />;
    return (
        <section className='pst-index'>
            <NavHeader onAddPst={onAddPst} />

            <div className="nested-route">
                <Outlet />
            </div>
            <div className='index-content'>
            {/* <PstList psts={psts} onRemovePst={(pstId) => onRemovePst(pstId)} /> */}
            <PstList psts={psts} ></PstList>
                <AppFooter />
            </div>


        </section>
    )
}