# All python api

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
