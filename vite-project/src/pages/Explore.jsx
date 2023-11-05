import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPsts } from '../store/pst.actions';
import { showErrorMsg } from '../services/event-bus.service';
import { NavHeader } from '../cmps/NavHeader';
import { Link, Outlet } from "react-router-dom";

export function Explore() {
  const psts = useSelector((storeState) => storeState.pstModule.psts) || [];
  useEffect(() => {
  
    loadPsts().catch(err => {
        console.log('err', err)
        showErrorMsg('Cannot load psts')
    })
}
    , [])

  return (
    <section className="explore">
      <NavHeader />
      <div className="table-container">
      <div className="grid">
        {psts.map((pst) => (
          <div className="grid-item" key={pst._id} >
            {/* <Link to={`/explore/${pst._id}`}> */}
            <img src={pst.imgUrl} alt={pst.txt} />
            {/* </Link> */}
          </div>
        ))}
      </div>
      </div>
      <Outlet />
    </section>
  );
}
