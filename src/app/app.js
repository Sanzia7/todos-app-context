import { useEffect } from 'react';
import { useStateManager } from '../state-manager';
import { requestReadTodos } from '../api';
import { ControlTodo, Todo } from '../components';
import styles from './app.module.css';


export const App = () => {
	const { state, setState } = useStateManager()

	const {
		todos,
		options: { searchText, isSortingAZ },
	} = state

	useEffect(() => {
		requestReadTodos(searchText, isSortingAZ).then((loadedTodos) => {
				setState({
					...state,
					todos: loadedTodos,
					options: {
						...state.options,
						isLoading: false,
					}
				})
		})
	}, [searchText, isSortingAZ])


	return (
		<div className={styles.app}>
			<h1>Todos-Context Json-Server </h1>
			<ControlTodo />
				<div className={styles.container}>
					{todos.map(({ id, title, completed }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
						/>
					))}
				</div>
		</div>
	)
}


	// { isLoading
	//         ?(<div className={ styles.loader }></div>)
	//		   : ( ... )
	//
//
// 		"rules": {
//		"react-hooksexhaustive-deps":"off"
// 		}
