import { useRef } from 'react'
//import { Button } from '../../../button/button'
import { debounce } from './utils-search'
import { useStateManager } from '../../../../state-manager'
import styles from './search.module.css'

export const Search = () => {
	const {
		state: {
			options: {searchInput, isSortingAZ},
		},
		updateState,
	} = useStateManager()

	const runSearch = (text, sorting) => {
		updateState({
			options: {
				searchInput: text,
				searchText: text,
				isSortingAZ: sorting,
			}
		})
	}

	const debouncedRunSearch = useRef(debounce(runSearch, 2000)).current

	const onChange = ({ target }) => {
		updateState({
			options: {
				searchInput: target.value,
			},
		})
		debouncedRunSearch(target.value, isSortingAZ)
	}

	const onSubmit = (event) => {
		event.preventDefault()
		runSearch(searchInput)
	}

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input
				className={styles.search}
				type="text"
				placeholder="debounced searching ..."
				value={searchInput}
				onChange={onChange}
			/>
				{/* <Button type="submit">🧐</Button> */}
		</form>

	)
}
