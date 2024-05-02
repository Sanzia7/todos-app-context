import { createContext, useContext, useState } from 'react'

const StateManagerContext = createContext({
	state: null,
	setState: () => {},
	//перзаписываем только отдельно указанные данные, а не всё сосотояние в целом(как при setState)
	updateState: () => {},
})

//Разработка собственного StateManager(индивидуальная библиотека с конкретными действиями:

//updateState({ existedKey: value }) - перезаписание в одном из объектов/item=элемент/ значения/value/ одного из уже существующих его свойств/existedKey

//updateState([{ id: existedId, ...data }]) - перезаписание в массиве с объектами одного из его объектов/item по уже существующему его existedId

//updateState([{ id: newdId, ...data }]) - добавление в массив нового объекта/newItem по создаваемому для него нового newdId

//updateState([{ id: existedId }]) - удаление из массива одного из объектов/item/ по существующему его existedId

const checkEmptyObject = (obj) => Object.keys(obj).length === 0;

const getUpdatedState = (state, newStateData) =>
	Array.isArray(newStateData)
		? updateStateArray(state, newStateData)
		: updateStateObject(state, newStateData)

const updateStateArray = (state, newStateData) =>
	newStateData.reduce((updatedState, { id, ...newItemData }) => {

		if (checkEmptyObject(newItemData)) {
			return updatedState.filter(({ id: idToCheck }) => idToCheck !== id)
		}

		const foundItem = state.find(({ id: itemId }) => itemId === id)

		if (!foundItem) {
			return [{ id, ...newItemData }, ...updatedState];
		}

		return updatedState.map((item) =>
			item.id === id ? { ...item, ...newItemData } : item
		)
	}, state)

const updateStateObject = (state, newStateData) =>
	Object.entries(newStateData).reduce(
		(updatedState, [key, value]) => ({
			...updatedState,
			[key]:
				typeof value === 'object' && value !== null
					? getUpdatedState(updatedState[key], value)
					: value,
		}),
		state,
	)


export const StateManager = ({ children, initialState }) => {
	const [state, setState] = useState(initialState);

	const updateState = (newStateData) => setState(getUpdatedState(state, newStateData));

	return (
		<StateManagerContext.Provider value={{ state, setState, updateState }}>
			{children}
		</StateManagerContext.Provider>
	);
}


export const useStateManager = () => useContext(StateManagerContext)


