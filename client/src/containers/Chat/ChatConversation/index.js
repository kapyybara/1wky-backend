import Conversation from 'containers/Chat/Conversation'
import { HorSlider } from 'components/UI'

function ChatConversation({
    mini,
    conversations,
    styles,
    setLabelImg,
    currentConversation,
    setShowMess,
}) {
    return mini ? (
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
    ) : (
        <div className={styles.left}>
            {conversations?.length > 0 &&
                conversations.map((conversation, index) => (
                    <Conversation
                        key={index}
                        conversation={conversation}
                        setLabelImg={setLabelImg}
                        current={currentConversation._id === conversation._id}
                        handleClickProp={() => setShowMess((prev) => !prev)}
                    />
                ))}
        </div>
    )
}

export default ChatConversation
