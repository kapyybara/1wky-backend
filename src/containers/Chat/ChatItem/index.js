import clsx from 'clsx'
import styles from './index.module.scss'
import React, { useState, useEffect, forwardRef } from 'react'
import { format } from 'timeago.js'

function MessItem({ text, mine, createdAt, mini }, ref) {
	
	return (
		<span
			className={clsx(styles.chatItem, {
				[styles.mine]: mine,
				[styles.mini]: mini
			})}
			ref={ref}
		>
			{text}

			<span className={clsx(styles.createdAt)}>
				{format(createdAt)}
			</span>
		</span>
	)
}

export default forwardRef(MessItem)
