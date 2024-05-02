/* eslint-disable no-unused-vars */
import { RiTodoFill } from 'react-icons/ri'
import { useStateManager } from '../../state-manager'
import { requestCreateTodo, requestDeleteTodo, requestUpdateTodo } from '../../api'
import { Button } from '../button/button'
import { KEYBOARD, NEW_TODO_ID } from '../../constants'
import styles from './todo.module.css'

export const Todo = ({ id, title, completed }) => {
	const {
		state: {
			editingTodo: {
				id: editingTodoId,
				title: editingTodoTitle,
			},
			options: { isLoading },
		},
		updateState,
	} = useStateManager()

	const isEditing = id === editingTodoId

	const onEdit = () => {
		if (id === NEW_TODO_ID) {
			updateState({ editingTodo: { id, title } })
		} else {
				updateState({
				todos: [{ id: NEW_TODO_ID }],
				editingTodo: { id, title },
			})
		}
	}

	const onChangeTitle = ({ target }) => {
		updateState({ editingTodo: { title: target.value }})
	}

	const onChangeCompleted = ({ target: { checked } }) => {
		updateState({ options: { isLoading: true } })

		requestUpdateTodo({ id, completed: checked })
			.then(() => {
				updateState({
					todos: [{ id, completed: checked }],
					options: { isLoading: false},
				})
		})
	}

	const onNewTodoSave = () => {
		if (editingTodoTitle.trim() === '') {
			updateState({ todos: [{ id }] });
			return;
		}

		requestCreateTodo({ title: editingTodoTitle, completed })
			.then((todo) => {
				updateState({
					todos: [{ id: NEW_TODO_ID }, todo],
					options: { isLoading: false },
				})
			})
	}

	const onEditingTodoSave = () => {
		if (editingTodoTitle.trim() === '') {
			onRemove()
			return
		}

		requestUpdateTodo({ id, title: editingTodoTitle })
			.then(() => {
				updateState({
					todos: [{ id, title: editingTodoTitle }],
					editingTodo: { id: null },
					options: { isLoading: false },
				})
			})
	}

	const onSave = () => {
		updateState({ options: { isLoading: true } })

		if (id === NEW_TODO_ID) {
			onNewTodoSave()
		} else {
			onEditingTodoSave()
		}
	}

	const onRemove = () => {
		updateState({ options: { isLoading: true } })

		requestDeleteTodo(id)
			.then(() =>
				updateState({
					todos: [{ id }],
					options: { isLoading: false },
				})
			)
	}

	const onTitleKeyDown = ({ key }) => {
		if (key === KEYBOARD.ENTER) {
			onSave();
		} else if (key === KEYBOARD.ESCAPE) {
			if (id === NEW_TODO_ID) {
				updateState({ todos: [{ id }], editingTodo: { id: null } });
			} else {
				updateState({ editingTodo: { id: null } });
			}
		}
	}

	return (
		<div className={`${styles.todo} ${completed ? styles.completedTodo : ''}`}>
			<RiTodoFill className={styles.todoIcon} />
			<div className={styles.title}>
				{isEditing ? (
					<input
						type="text"
						autoFocus={true}
						disabled={isLoading}
						value={editingTodoTitle}
						onChange={onChangeTitle}
						onKeyDown={onTitleKeyDown}
					/>
				) : (
					<div onClick={onEdit}>{title}</div>
				)}
			</div>
			<div>
				{isEditing ? (
					<Button onClick={onSave}>✍</Button>
				) : (
					<Button onClick={onRemove}>✖</Button>
				)}
			</div>

			<input
				className={styles.checkbox}
				type="checkbox"
				disabled={isEditing || isLoading}
				checked={completed}
				onChange={onChangeCompleted}
			/>
		</div>
	)
}

//  {RiDeleteBin2Line,}

// <RiDeleteBin2Line
// 	className={styles.deleteIcon}
// 	onClick={onDeleteTodo}
// />
//<Button onClick={onDeleteTodo}>&#x2717;</Button>
