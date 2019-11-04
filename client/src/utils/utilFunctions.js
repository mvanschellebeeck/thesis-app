import React from 'react';

export function constructTitle(title) {
  return (
    <>
      <h1 className="detailTitle">
        <b>{title}</b>
      </h1>
    </>
  );
}
