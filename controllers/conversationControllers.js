import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

export const createOrGetConversation = async (req, res) => {
	if (req.body.senderId == req.body.receiverId){
		res.status(400).json("Không thể tự tạo hội thoại cho chính mình");

	}
  console.log([req.body.receiverId, req.body.senderId],)
  const conversation = await Conversation.find({
    members: {
      $eq: [req.body.senderId, req.body.receiverId] || [req.body.receiverId,req.body.senderId] 
    },
    
  })
  
  console.log(conversation)
  if (conversation.length != 0) {
      const memberData = await Promise.all(
        conversation[0].members.map(async (member) => {
          const membersInfo = await User.findById(member);
          return membersInfo;
        })
      );
      console.log({...conversation[0]._doc, members:memberData })

    return res.status(200).json( {...conversation[0]._doc, members:memberData });
  } else {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    

    try {
      const savedConversation = await newConversation.save();
      res.status(200).send(savedConversation);
    } catch (err) {
      res.status(500).json(error);
    }
  }
};




export const getConversation = async (req, res) => {
  try {
    let conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    conversations = await Promise.all(
      conversations.map(async (c) => {
        const memberData = await Promise.all(
          c.members.map(async (member) => {
            const membersInfo = await User.findById(member);
            // memberData.push(membersInfo);
            return membersInfo;
          })
        );

		let lastMessage = await Message.find({
			sendBy: { $in: c.members },
      conversationId: {$eq : c.id}
		  }).sort({ createdAt: 'descending' });
        return {...c._doc, members:memberData , lastMessage:lastMessage[0] };
      })
    );

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete success" + req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteAllConversation = async (req, res) => {
  try {
    const conversation = await Conversation.deleteMany();
    res.status(200).json("Xoas thanh cong ");
  } catch (error) {
    res.status(500).json(error);
  }
};
