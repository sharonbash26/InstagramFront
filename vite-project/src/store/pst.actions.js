import { pstService } from "../services/pst.service.local.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_PST, REMOVE_PST, SET_PSTS, UNDO_REMOVE_PST, UPDATE_PST } from "./pst.reducer.js";

// Action Creators:
export function getActionRemovePst(pstId) {
    return {
        type: REMOVE_PST,
        pstId
    }
}
export function getActionAddPst(pst) {
    return {
        type: ADD_PST,
        pst
    }
}
export function getActionUpdatePst(pst) {
    return {
        type: UPDATE_PST,
        pst
    }
}

export async function loadPsts() {
    try {
        const psts = await pstService.query()
        console.log('Psts from DB:', psts)
        store.dispatch({
            type: SET_PSTS,
            psts
        })

    } catch (err) {
        console.log('Cannot load psts', err)
        throw err
    }

}

export async function removePst(pstId) {
    try {
        await pstService.remove(pstId)
        store.dispatch(getActionRemovePst(pstId))
    } catch (err) {
        console.log('Cannot remove pst', err)
        throw err
    }
}

export async function addPst(pst) {
    try {
        const savedPst = await pstService.save(pst)
        console.log('Added Pst', savedPst)
        store.dispatch(getActionAddPst(savedPst))
        return savedPst
    } catch (err) {
        console.log('Cannot add pst', err)
        throw err
    }
}

export function updatePst(pst) {
    return pstService.save(pst)
        .then(savedPst => {
            console.log('Updated Pst:', savedPst)
            store.dispatch(getActionUpdatePst(savedPst))
            return savedPst
        })
        .catch(err => {
            console.log('Cannot save pst', err)
            throw err
        })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemovePstOptimistic(pstId) {
    store.dispatch({
        type: REMOVE_PST,
        pstId
    })
    showSuccessMsg('Pst removed')

    pstService.remove(pstId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove pst')
            console.log('Cannot load psts', err)
            store.dispatch({
                type: UNDO_REMOVE_PST
            })
        })
}
