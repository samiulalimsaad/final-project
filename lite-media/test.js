const users = [
    { name: { firstName: "aaa", fullName: "aaa aaa", lastName: "aaa" } },
    {
        name: {
            firstName: "Samiul",
            lastName: "Alim",
            fullName: "Samiul Alim",
            createdAt: "2022-01-10T13:14:26.904Z",
        },
    },
    {
        name: {
            firstName: "MD Mustafizur",
            lastName: "Rahaman",
            fullName: "MD Mustafizur  Rahaman",
            _id: "61dc320e124b8107b0bc6803",
            createdAt: "2022-01-10T13:18:06.502Z",
        },
    },
    {
        name: {
            firstName: "Sharmin",
            lastName: "Joty",
            fullName: "Sharmin Joty",
            _id: "61e300f0fae79790b0e667e9",
            createdAt: "2022-01-15T17:14:24.689Z",
        },
    },
];
console.log(users.filter((v) => v.name.fullName.toLowerCase().includes("a")));
