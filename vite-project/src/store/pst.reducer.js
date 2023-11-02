export const SET_PSTS = 'SET_PSTS'
export const REMOVE_PST = 'REMOVE_PST'
export const ADD_PST = 'ADD_PST'
export const UPDATE_PST = 'UPDATE_PST'
export const UNDO_REMOVE_PST = 'UNDO_REMOVE_PST'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_SELECTED_POST = 'SET_SELECTED_POST'



const initialState = {
    psts: [],
    selectedPost: null,
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
        case SET_SELECTED_POST:
            newState = { ...state, selectedPost: action.post }
            break
        case REMOVE_PST:
            const lastRemovedPst = state.psts.find(pst => pst._id === action.pstId)
            psts = state.psts.filter(pst => pst._id !== action.pstId)
            newState = { ...state, psts, lastRemovedPst }
            break
        case ADD_PST:
            newState = { ...state, psts: [action.pst, ...state.psts] }
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
            newState = { ...state, isModalOpen: true }
            break
        case CLOSE_MODAL:
            newState = { ...state, isModalOpen: false }
            break
        case REMOVE_COMMENT:
            // Find the index of the post containing the comment
            const pstIdx = state.psts.findIndex(pst => pst.comments.some(comment => comment.id === action.commentId));

            if (pstIdx === -1) break;  // Exit if post not found

            // Find the index of the comment to remove
            const commentIdx = state.psts[pstIdx].comments.findIndex(comment => comment.id === action.commentId);

            if (commentIdx === -1) break; // Exit if comment not found

            // Remove the comment without mutating the state directly
            psts = [...state.psts];
            psts[pstIdx] = { ...psts[pstIdx], comments: [...psts[pstIdx].comments.slice(0, commentIdx), ...psts[pstIdx].comments.slice(commentIdx + 1)] };

            newState = { ...state, psts, selectedPost: psts[pstIdx] };
            console.log('newState',newState)
            break;
        case ADD_COMMENT:
            case ADD_COMMENT:
            // Find the index of the post containing the comment
            let pstIndex = state.psts.findIndex(pst => pst._id === action.pstId); // Use action.pstId

            if (pstIndex === -1) return state; // Exit if post not found

            // Create a new post with the updated comments
            const updatedPost = {
                ...state.psts[pstIndex],
                comments: [...state.psts[pstIndex].comments, action.comment]
            };

            // Update the psts array without mutating the state directly
            const updatedPsts = [...state.psts];
            updatedPsts[pstIndex] = updatedPost;

            newState = {
                ...state,
                psts: updatedPsts,
                selectedPost: updatedPost
            }
            break;
        default:
            return state
    }
    return newState
}
