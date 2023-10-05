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


export function PostIndex() {
    const psts = useSelector(storeState => storeState.pstModule.psts) || []
    console.log('psts', psts)

    useEffect(() => {
        loadPsts().catch(err => {
            console.log('err', err)
            showErrorMsg('Cannot load psts')
        })
    }, [])


    async function onAddPst(urlFromCloud) {
        const pst = pstService.getEmptyPst()
        pst.imgUrl = urlFromCloud
        console.log('pst imgUrlllllll',pst.imgUrl)
        try {
            const savedPst = await addPst(pst)
            console.log('saved pst from index',savedPst)
            showSuccessMsg(`post added (id: ${savedPst._id})`)
        } catch (err) {
            showErrorMsg('Cannot add post')
            console.log('cannot add post')
        }
    }
    return (
        <section className='pst-index'>
            <NavHeader onAddPst={onAddPst}/>
            <div className="nested-route">
                <Outlet />
            </div>
            <PstList psts={psts} />
        </section>
    )
}