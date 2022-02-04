import { useState, useEffect, useCallback, useRef } from 'react'

import styles from './index.module.scss'
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
import { searchAPI } from 'apis/searchAPI'
import Dropsearch from './DropSearch'
import { GroupItem } from 'components/UI'
import { useClickOutside } from 'hooks'

function SearchBar() {
	const [searchValue, setSearchValue] = useState('')
	const [searchUsers, setSearchUsers] = useState([])

	const inputRef = useRef()
	const dropdownRef = useRef()

	useEffect(() => {
		if (searchValue) {
			const timerId = setTimeout(() => {
				searchAPI.searchUser(searchValue).then(res => {
					setSearchUsers(res?.data)
				})
			}, 1000)
			return () => {
				clearTimeout(timerId)
			}
		} else {
			setSearchUsers([])
		}
	}, [searchValue])

	const handleChangeInput = e => {
		const value = e.target.value
		setSearchValue(value)
	}

	const handleClickOutside = useCallback(() => {
		setSearchValue('')
	}, [])

	useClickOutside(dropdownRef, handleClickOutside, inputRef)

	return (
		<div className={styles.container}>
			<SearchIcon />
			<input
				value={searchValue}
				type="text"
				placeholder="Search user..."
				onChange={handleChangeInput}
				ref={inputRef}
			/>
			{searchUsers.length > 0 && (
				<div
					className={styles.dropssearch}
					onClick={() => setSearchValue('')}
					ref={dropdownRef}
				>
					{searchUsers.map(item => (
						<GroupItem
							key={item._id}
							icon={item.avatar}
							text={item.username}
							pointer
							id={item._id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchBar
