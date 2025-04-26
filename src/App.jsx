import React, { useEffect } from 'react';
import ContainerView from './view/containerView.js';

function App({ data }) {
  useEffect(() => {
    // Initialize ContainerView with data after component mounts
    new ContainerView(data);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="container" className="container mx-auto py-8"></div>
    </div>
  );
}

export default App; 