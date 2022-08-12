import React from 'react';
import { State } from '../../state/Context';

export default function Menu() {

  const { state } = State();

  return (
    <div id='menu'>
        <span className={state.mobileMenu? 'open' : 'close'}></span>
        <span className={state.mobileMenu? 'open' : 'close'}></span>
        <span className={state.mobileMenu? 'open' : 'close'}></span>
    </div>
  )
}
