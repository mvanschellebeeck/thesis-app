import React from 'react';
import '../index.css';

import Map from '../components/map2';

// import groupedButtons from '../components/groupedButtons';
import GroupedButton from '../components/groupedButtons';

export default class InlandDeslination extends React.Component {
    render() {
    return (
      <div className="inland">
        <GroupedButton />
        <Map />
      </div>
    );
  }
}
