export interface userInterface {
    _id: string;
    email: string;
    active: true;
    name: {
        firstName: string;
        lastName: string;
        nickName: string;
        fullName: string;
        _id: string;
    };
    post: string[];
    bookmark: string[];
    assistant: string;
    message: string[];
    unreadMessage: string[];
    following: [string];
    follower: [string];
    story: string[];
    createdAt: string;
    profilePic: string;
    updatedAt: string;
}

export interface postInterface {
    comments: string[];
    createdAt: string;
    updatedAt: string;
    like: string[];
    share: string[];
    _id: string;
    postBody: string;
    postImage: string;
    user: userInterface;
}
export interface bookmarkInterface {
    _id: string;
    postBody: string;
    postImage: string;
    like: string[];
    share: string[];
    user: {
        _id: string;
        name: {
            firstName: string;
            lastName: string;
            nickName: string;
            fullName: string;
            _id: string;
        };
        bookmark: string[];
        createdAt: string;
        profilePic: string;
        updatedAt: string;
    };
    comments: string[];
    createdAt: string;
    updatedAt: string;
}
