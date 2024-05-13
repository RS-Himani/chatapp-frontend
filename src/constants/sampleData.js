export const sampleChats = [{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Bio",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
},
];

export const sampleUsers = [{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Bio",
    _id: "2",
    
},
];

export const sampleNotifications = [{
    sender:{
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
    },
    id: "1",
},
{
    sender:{
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Bio",
    },
    _id: "2",
    
},
];

export const sampleMessage = [{
        // attachements: [
        //     {
        //         public_id: "abc",
        //         url: "https://www.w3schools.com/howto/img_avatar.png",
        //     },
        // ],
        content: "Thi is Sample Message",
        _id:"xyz",
        sender: {
            _id: "user1",
            name: "user1",
        },
        chat: "chatId",
        groupsChat: false,
        createdAt: "2024-02-12T10:41:30.630Z"
    },
    {
        attachements: [
            {
                public_id: "abc_2",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "Thi is Sample Message",
        _id:"xyz2",
        sender: {
            _id: "user._id",
            name: "user2",
        },
        chat: "chatId",
        groupsChat: true,
        createdAt: "2024-02-12T10:41:30.630Z"
    },
];

export const dashboardData = {
    users: [
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Doe",
            _id: "1",
            username: "john_doe",
            friends: 25,
            groups: 3,
            
        },
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Bio",
            _id: "2",
            username: "john_bio",
            friends: 30,
            groups: 5,
        },
    ],
    chats: [
        {
            name: "Group 1",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: true,
            members: [
                {_id:"1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, 
                {_id:"2", avatar: "https://www.w3schools.com/howto/img_avatar.png"},
            ],
            totalMembers: 2,
            totalMessages: 25,
            creator: {
                name: "John Doe",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            }
        },
        {
            name: "Ofc_Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: true,
            members: [
                {_id:"1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, 
                {_id:"2", avatar: "https://www.w3schools.com/howto/img_avatar.png"},
            ],
            totalMembers: 5,
            totalMessages: 30,
            creator: {
                name: "John Bio",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            }
        },
    ],
    messages:[
        {
            // attachements: [
            //     {
            //         public_id: "abc",
            //         url: "https://www.w3schools.com/howto/img_avatar.png",
            //     },
            // ],
            content: "Thi is Sample Message",
            _id:"xyz",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "user1",
            },
            chat: "chatId",
            groupsChat: false,
            createdAt: "2024-02-12T10:20:30.630Z"
        },
        {
            attachements: [
                {
                    public_id: "abc_2",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content: "Thi is Sample Message",
            _id:"xyz_2",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "user2",
            },
            chat: "chatId",
            groupsChat: true,
            createdAt: "2024-02-12T10:41:30.630Z"
        },
    ],
};