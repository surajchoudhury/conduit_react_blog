import React from 'react';

// Relative imports

import Articles from './Articles'

const Middle = () => {
  return (
    <section className="middle">
      <div className="middle_sub_container">
        <p className="global_feed">Global Feed</p>
        <Articles />
      </div>
    </section>
  )
}

export default Middle;