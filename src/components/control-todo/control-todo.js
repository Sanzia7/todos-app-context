import {  Search, Sorting } from './actions'
import { Button } from '../button/button'
import { useStateManager } from '../../state-manager'
import { NEW_TODO_ID } from '../../constants'
import styles from './control-todo.module.css'

export const ControlTodo = () => {
	const { updateState } = useStateManager()

	const onAddTodo = () => {
		updateState({
			todos: [
				{
					id: NEW_TODO_ID,
					title: '',
					completed: false,
				},
			],
			editingTodo: {
				id: NEW_TODO_ID,
				title: '',
			},
		})
	}

	return (
		<div className={styles.controlPanel}>
			<Search />
			<Sorting />
			<Button  onClick={onAddTodo}>☝</Button>
		</div>
	)
}




//https://www.w3schools.com/charsets/ref_utf_symbols.asp

