export interface commentInterface {
    user: userInterface;
    body: string;
}

export interface postInterface {
    postBody: string;
    postImage: string;
    like: userInterface[];
    comments: commentInterface[];
    user: string;
}

export interface nameInterface {
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface addressInterface {
    city: string;
    street: string;
    state: string;
    country: string;
    zip: string;
}

export interface contactInterface {
    tel: string;
    email: string;
    website: string;
    address: addressInterface;
}

export interface userInterface {
    _id: string;
    email: string;
    active: Boolean;
    gender: string;
    name: nameInterface;
    contact: contactInterface;
    post: postInterface[];
    bookmark: postInterface[];
    assistant: string;
    message: string[];
    unreadMessage: string[];
    bio: string;
    profilePic: string;
    coverPic: string;
    following: string[];
    follower: string[];
}
