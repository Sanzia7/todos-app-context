import { Button } from '../../../button/button'
import { useStateManager } from '../../../../state-manager'
import styles from './sorting.module.css'

export const Sorting = () => {
	const {
		state: {
			options: { isSortingAZ },
		},
		updateState,
	} = useStateManager()

	const onChange = ({ target }) => {
		updateState({
			options: {
				isSortingAZ: target.checked,
			}
		})
	}

	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-btn"
				type="checkbox"
				checked={isSortingAZ}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-btn">
				A&darr;
			</label>
		</Button>
	)
}

