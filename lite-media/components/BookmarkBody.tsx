const BookmarkBody = () => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((item: any) => (
                <div
                    className="h-28 w-48 bg-red-500 rounded grid place-items-center"
                    key={item._id}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default BookmarkBody;
