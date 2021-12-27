import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const App = () => {
  return <div>Hello world</div>;
};

export const hydrate = async () => ReactDOM.hydrate(<App />, document.body);

export default async () => {
  const renderBody = document.createElement('div');
  ReactDOM.render(<App />, renderBody);
  return renderBody.innerHTML;
};
