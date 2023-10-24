export const SET_PSTS = 'SET_PSTS'
export const REMOVE_PST = 'REMOVE_PST'
export const ADD_PST = 'ADD_PST'
export const UPDATE_PST = 'UPDATE_PST'
export const UNDO_REMOVE_PST = 'UNDO_REMOVE_PST'
export const OPEN_MODAL='OPEN_MODAL'
export const CLOSE_MODAL='CLOSE_MODAL'


const initialState = {
    psts: [],
    lastRemovedPst: null,
    isModalOpen: false
}

export function pstReducer(state = initialState, action) {
    var newState = state
    var psts
    switch (action.type) {
        case SET_PSTS:
            newState = { ...state, psts: action.psts }
            break
        case REMOVE_PST:
            const lastRemovedPst = state.psts.find(pst => pst._id === action.pstId)
            psts = state.psts.filter(pst => pst._id !== action.pstId)
            newState = { ...state, psts, lastRemovedPst }
            break
        case ADD_PST:
            newState = { ...state, psts: [...state.psts, action.pst] }
            break
        case UPDATE_PST:
            psts = state.psts.map(pst => (pst._id === action.pst._id) ? action.pst : pst)
            newState = { ...state, psts }
            break
        case UNDO_REMOVE_PST:
            if (state.lastRemovedPst) {
                newState = { ...state, psts: [...state.psts, state.lastRemovedPst], lastRemovedPst: null }
            }
            break
        case OPEN_MODAL:
            newState = { ...state, isModalOpen:true }
            break
        case CLOSE_MODAL:
            newState = { ...state, isModalOpen:false }
            break
        default:
    }
    return newState
}
