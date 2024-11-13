import React from "react";
import {useParams} from 'react-router-dom';

const WorldView: React.FC = () => {
  let { worldId } = useParams();

  return (
    <div>
      {worldId}
    </div>
  );
};


const Loading = () => {
  return (
    <p>Loading...</p>
  );
};


export default WorldView;