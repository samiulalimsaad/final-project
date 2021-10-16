const data = {
    email: {
        name: "ValidatorError",
        message: "Path `email` is required.",
        properties: {
            message: "Path `email` is required.",
            type: "required",
            path: "email",
        },
        kind: "required",
        path: "email",
    },
    userName: {
        name: "ValidatorError",
        message: "Path `userName` is required.",
        properties: {
            message: "Path `userName` is required.",
            type: "required",
            path: "userName",
        },
        kind: "required",
        path: "userName",
    },
    userId: {
        name: "ValidatorError",
        message: "Path `userId` is required.",
        properties: {
            message: "Path `userId` is required.",
            type: "required",
            path: "userId",
        },
        kind: "required",
        path: "userId",
    },
};

const errors = Object.keys(data).map((v) => data[v].message);

console.log(errors)