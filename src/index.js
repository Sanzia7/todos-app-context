import React from 'react'
import ReactDOM from 'react-dom/client'
import { StateManager } from './state-manager'
import { App, initialState } from './app'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<StateManager initialState={initialState}>
		<App />
	</StateManager>
)
