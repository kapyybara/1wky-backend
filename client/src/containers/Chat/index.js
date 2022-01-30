import { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowDimensions } from 'hooks'

import { Divider, HorSlider, IconWrapper } from 'components/UI'
import ChatItem from './ChatItem'
import ChatContainer from './ChatContainer'
import ChatInput from './ChatInput'
import styles from './index.module.scss'
import Conversation from 'containers/Chat/Conversation'
import {
    getConversations,
    getMessages,
    sendMessage,
    setLoading,
    updateMessage,
} from 'data/slices/chatSlice'
import { getOnlineUsers } from 'data/slices/userSlice'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import socket from 'service/SocketContext'
import ChatInfo from './ChatInfo'
import { ReactComponent as Return } from 'assets/icons/return.svg'
import clsx from 'clsx'

export default function Chat({ mini }) {
    const dispatch = useDispatch()
    const scrollRef = useRef()
    const [showMess, setShowMess] = useState(true)
    const userId = localStorage.getItem('userId')

    const {
        conversations,
        messages,
        next,
        loading,
        currentConversation,
        nonScroll,
    } = useSelector((state) => state.chat)
    const me = useSelector((state) => state.user)

    const [labelImg, setLabelImg] = useState(defaultAvatar)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (userId) {
            dispatch(setLoading(true))
            dispatch(getConversations(userId))
        }
        socket.on('getUsers', (users) => {
            dispatch(getOnlineUsers(users))
        })
    }, [userId])

    useEffect(() => {
        socket.on('getMessage', ({ senderId, message }) => {
            const createdAt = new Date()
            dispatch(
                updateMessage({
                    conversationId: currentConversation._id,
                    sendBy: senderId,
                    text: message,
                    createdAt,
                }),
            )
        })

        currentConversation._id &&
            dispatch(getMessages({ id: currentConversation._id, next: 1 }))
        return () => {
            socket.removeListener('getMessage')
        }
    }, [currentConversation])

    useEffect(() => {
        scrollRef?.current &&
            !nonScroll &&
            scrollRef?.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages, nonScroll])

    const handleSubmit = () => {
        const receiverId = currentConversation.members.find((id) => {
            return id !== userId
        })

        //socket.io
        socket.emit('sendMessage', {
            senderId: me.myInfo._id,
            receiverId,
            message: message,
        })

        dispatch(
            sendMessage({
                conversationId: currentConversation._id,
                sendBy: me.myInfo._id,
                text: message,
            }),
        )
        setMessage('')
    }

    if (!mini) {
        return (
            <div className={styles.container}>
                {!showMess && (
                    <span
                        className={styles.backButton}
                        onClick={() => setShowMess((prev) => !prev)}
                    >
                        <IconWrapper icon={<Return />} />
                    </span>
                )}
                <div className={styles.left}>
                    {conversations?.length > 0 &&
                        conversations.map((conversation, index) => (
                            <Conversation
                                key={index}
                                conversation={conversation}
                                setLabelImg={setLabelImg}
                                current={
                                    currentConversation._id === conversation._id
                                }
                                handleClickProp={() =>
                                    setShowMess((prev) => !prev)
                                }
                            />
                        ))}
                </div>
                <div
                    className={clsx(styles.right, {
                        [styles.show]: !showMess,
                    })}
                >
                    <ChatInfo />
                    <ChatContainer
                        labelImg={labelImg}
                        loading={loading}
                        ref={scrollRef}
                        nonlabel
                        id={currentConversation._id}
                        next={next}
                        heigthFill
                    >
                        {messages.map((message, index) => (
                            <ChatItem
                                ref={
                                    index === messages.length - 1
                                        ? scrollRef
                                        : null
                                }
                                key={index}
                                text={message.text}
                                mine={message.sendBy === me.myInfo._id}
                                createdAt={message.createdAt}
                            />
                        ))}
                    </ChatContainer>
                    <ChatInput
                        value={message}
                        setValue={setMessage}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className={styles.miniChat}>
            <HorSlider>
                {conversations?.length > 0 &&
                    conversations.map(
                        (conversation, index) =>
                            index <= 3 && (
                                <Conversation
                                    key={index}
                                    conversation={conversation}
                                    setLabelImg={setLabelImg}
                                    mini
                                />
                            ),
                    )}
            </HorSlider>
            <ChatContainer
                labelImg={labelImg}
                loading={loading}
                ref={scrollRef}
                next={next}
                id={currentConversation._id}
                mini
            >
                {messages.map((message, index) => (
                    <ChatItem
                        ref={index === messages.length - 1 ? scrollRef : null}
                        key={index}
                        text={message.text}
                        mine={message.sendBy === me.myInfo._id}
                        createdAt={message.createdAt}
                        mini
                    />
                ))}
            </ChatContainer>
            <ChatInput
                value={message}
                setValue={setMessage}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
