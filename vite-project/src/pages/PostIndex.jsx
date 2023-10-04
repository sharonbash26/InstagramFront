import { useDispatch, useSelector } from 'react-redux'
import { PstList } from '../cmps/PostList'
import { pstService } from '../services/pst.service.local'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { store } from '../store/store'
import { useEffect, useState } from 'react'
import { loadPsts, removePst, onRemovePstOptimistic} from '../store/pst.actions'
import { ADD_PST } from '../store/pst.reducer.js'

export function PostIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

console.log('indexx')
    useEffect(() => {
        loadPsts().catch(err => {
            console.log('err', err)
            showErrorMsg('Cannot load psts')
        })
    },[])



    return (
        <section className='pst-index'>
            <h1>pst list</h1>
         <PstList psts={psts} />   
        </section>
    )
}