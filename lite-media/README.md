# Helper Text

## All python api

```python
@app.route('/')
def get():
    return {'AI_Assistant': wishMe()}
```

```python
@app.route('/textsum', methods=["POST"])
def textsum():
    return Text_Summary_Post()
```

```python
@app.route('/vidsum', methods=["POST"])
def vidsum():
    return Post_Video_Summary()
```

```python
@app.route('/vidsum/video/<vid_name>')
def serve_video(vid_name):
    return Get_Video_Summary(vid_name=vid_name)
```

```python
@app.route('/assistant', methods=["POST"])
def assistant():
    return Assistant()
```

## user Schema

```typescript
{
    userId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    active: Boolean,
    gender: {
        type: String,
        trim: true,
    },
    name: {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            default: "",
        },
        nickName: {
            type: String,
            trim: true,
            default: "",
        },
        fullName: String,
    },
    contact: {
        tel: [Number],
        email: [String],
        address: {
            city: String,
            street: String,
            houseNumber: String,
        },
    },
    post: [String],
    assistant: String,
    message: [String],
    profilePic: {
        type: String,
        trim: true,
    },
    coverPic: {
        type: String,
        trim: true,
    },
    following: [
        {
            type: String,
            trim: true,
        },
    ],
    follower: [
        {
            type: String,
            trim: true,
        },
    ],
    posts: [
        {
            type: String,
            trim: true,
        },
    ],
};

```
