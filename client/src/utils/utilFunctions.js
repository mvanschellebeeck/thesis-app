import React, { Fragment } from 'react';

export function constructTitle(title) {
  return (
    <Fragment>
      <h1 className="detailTitle">
        <b>{title}</b>
      </h1>
    </Fragment>
  );
}
