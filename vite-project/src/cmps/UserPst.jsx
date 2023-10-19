import { useEffect, useState } from 'react'
import { loadUserLoggedPsts } from '../store/user.actions'

export function UserPst(){
    useEffect(() => {
        loadUserLoggedPsts().catch(err => {
            console.log('err', err)
            showErrorMsg('Cannot load user Logged  psts')
        })
    }
 , [])

    return(
        <h2>users posts</h2>
    )
}