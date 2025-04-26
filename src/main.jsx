import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Model } from './model/model.js'
import ContainerView from './view/containerView.js'
import './styles/container.css'

// Initialize Model and get data
const model = new Model();
const data = model.getData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
) 