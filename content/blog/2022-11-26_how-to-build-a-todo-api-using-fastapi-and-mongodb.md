---
title: "How to build a Todo API using FastAPI and MongoDB"
metaTitle: "How to build a Todo API using FastAPI and MongoDB"
metaDesc: "Hello everyone,   In this tutorial, we will be seeing how to create API for todo list application..."
date: "2022-11-26"
slug: how-to-build-a-todo-api-using-fastapi-and-mongodb-1en8
coverImage: "null"
published: true
---

Hello everyone, 

In this tutorial, we will be seeing how to create API for todo list application using FastAPI and MongoDB.

## Requirements 📝

1. Python 3.8+
2. Shared cluster in MongoDB atlas. 

Note: For creating a shared cluster in MongoDB atlas. Please follow this [tutorial](https://dev.to/imkarthikeyan/how-to-setup-a-cluster-using-mongodb-atlas--2nni)

## Setting up your FastAPI server

Let’s create our project. Open up your terminal and type in the following command

```bash
mkdir fastapi-mongo-backend
cd fastapi-mongo-backend
```

### Creating your python virtual environment:

**What is the purpose of virtual environment ?**

The purpose of virtual environment is to have separate environment for your python projects. You can have a python project which is running python2 and one project which is running on python3 and also you can install python packages for one project which will not affect the another project.

Now to create a virtual environment , open up your terminal and type in the following command 

```bash
python3 -m venv env
```

The above command creates a virtual environment. In order to activate the created virtual environment. Please type in the following command

```bash
source env/bin/activate
```
You should see this in your terminal

```bash
(env) ➜  fastapi-mongo-backend
```

### Adding requirements.txt

**What is requirements.txt ?**


**requirements.txt** file will contains the list of dependencies and packages used in the particular python project. Let’s  install the packages needed to develop the API. Open your terminal and run the following command 

```bash

# packages which we will be needing for the API

pip3 install 'fastapi[all]' 'pymongo[srv]' python-dotenv
```

Once the installation is complete, run the following command this will create requirements.txt automatically in your root folder. 

```bash
pip3 freeze > requirements.txt
```

### Creating your FastAPI server

Now create `main.py` and add in the following code

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the PyMongo tutorial!"}
```

Save the file and run the application using the `uvicorn`package, which was installed together with the `fastapi`package.

```python
uvicorn main:app --reload
```

You should see something like this in your terminal. This spins up a web server which is live on port `8000`.

```python
INFO:     Will watch for changes in these directories: ['/Users/karthikeyan.shanmuga/.karthikeyan/fastapi-mongo-backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [3022] using WatchFiles
INFO:     Started server process [3024]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Visit the url `[localhost:8000](http://localhost:8000)`  to see the following in your web browser.


![Step 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g9uyaxealugbsxyjfe9v.png)


Now with server successfully running , let’s connect it our MongoDB cluster which we have created at the start. 


## Connecting FastAPI with MongoDB

Login to your mongodb cloud and head over to the cluster which we have created and click on `Connect`.

![Step 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rk3jyg2hngi104pi92ds.png)

Choose the connection method as `Connect to your application` and `Choose language as python and version as 3.6 or later.`Copy the connection string and create a `.env` file and add in the connection string replacing the password section. 

```

MONGODB_CONNECTION_URI=mongodb+srv://admin:<password>@cluster0.vry70dn.mongodb.net/?retryWrites=true&w=majority

DB_NAME=todo_backend
```

Now open up your `[main.py](http://main.py)` file and add in the following code

```python
from fastapi import FastAPI
from dotenv import dotenv_values
from pymongo import MongoClient

config = dotenv_values(".env")

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "API using Fast API and pymongo"}

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["MONGODB_CONNECTION_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()
```

**Code overview:**

As the name suggests `@app.on_event('startup')` , if you run something when your application starts up insert a piece a function under this event. More details about this event in the official [FastAPI docs](https://fastapi.tiangolo.com/advanced/events/). 


If you check your terminal , you should see the following printed 

```bash
(env) ➜  fastapi-mongo-backend  uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['/Users/karthikeyan.shanmuga/.karthikeyan/fastapi-mongo-backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [45572] using WatchFiles
INFO:     Started server process [45574]
INFO:     Waiting for application startup.
**Connected to the MongoDB database!**
INFO:     Application startup complete.
```

## Creating the models

Let’s start with models. Create a file `models.py` in the root of your application and add in the following content.

```python
# models.py

from typing import Optional
import uuid;
from pydantic import BaseModel, Field

class ListModel(BaseModel):
    id:str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str
    description: str

class ListUpdateModel(BaseModel):
    title: Optional[str]
    description: Optional[str]
```

---

## Coding the routes
 

### Creating an item in the list


Let’s see how we can create an item for our todo list. Create a file called `[routes.py](http://routes.py)`  and add in the following changes.

```python
from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from models import ListModel, ListUpdateModel

router = APIRouter()

@router.post("/", response_description='create a todo list', status_code=status.HTTP_201_CREATED,response_model=ListModel)
def create_list(request: Request, list: ListModel = Body(...)):
    list = jsonable_encoder(list)
    new_list_item = request.app.database["lists"].insert_one(list)
    created_list_item = request.app.database["lists"].find_one({
        "_id": new_list_item.inserted_id
    })

    return created_list_item
```

Note : The reason for / route is because we will be prefixing the route under /lists endpoint in our main.py file
 

**Code walkthrough:**

We will be using the APIRouter object from the fastAPI package to create our endpoints. We have also imported the models which we have create earlier. 

The response_description is for displaying in the API documentation. 

1. We encode the body in the json format before sending it to the DB. 
2. We query the collections `lists` in our `todo_backend` DB which we created in atlas and insert the document using `insert_one` method from `pymongo`.
3. We query the same collection `lists` to find the inserted document using `find_one` method from `pymongo` and return it as the response.

Let’s register the routes. Open up your `[main.py](http://main.py)` and add this piece of code

```python
from routes import router as list_router

app.include_router(list_router, tags=["list"], prefix="/list")
```

Now open your browser and type in the url `[localhost:8000/docs](http://localhost:8000/docs)` and you should see there will be `POST` endpoint created for us `/list create list`

![Step 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ywldcurxzqgljv1pnqdy.png)

Now click on the accordion and click on `Try it out` . Add in the request body contents `title, description` and remove the `_id` as it will be automatically generated. 

```python
{
  "title": "todo list 2",
  "description": "testing out from mongodb"
}
```

Now click on execute to the see the response


![Create post](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o7bdlchadpgwtbtju2b7.png)

### Listing the items:

```python
@router.get("/", response_description="list all the todos", response_model=List[ListModel])
def show_list(request: Request):
    todos = list(request.app.database["lists"].find(limit=50))
    return todos
```

**Code Walkthrough :**

In the response model we have specified that to be `List[ListModel]`. This means that it will be a list of the todo objects. We will use the `find` method to get the items from the `lists collection.`

**Response in the swagger UI**

![response](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mxmypyiaji4c97r6fkdk.png)


### Deleting an item

We'll implement is the `DELETE /list/{id}` endpoint for deleting a single list by its `id`. Add the following to the end of the `routes.py` file:

```python
@router.delete("/",response_description="delete a item from list")
def delete_list(id: str, request: Request, response: Response):
    delete_result = request.app.database["lists"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Item with {id} not found")
```

Once we delete the item , we send a status code `204` stating that the item which we deleted is not in the DB.

Response in the swagger UI

![deleting an item](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v50pf7mwoo2n7hrdb67d.png)

### Updating an item in the list

```python
@router.put("/",response_description="update the item in list", response_model=ListModel)
def update_item(id: str, request: Request, list: ListUpdateModel = Body(...)):
    listItems = {}
    for k,v in list.dict().items():
        if v is not None:
            listItems = {k:v}
    
    print(listItems)
    # if list.title | list.description:
    update_result = request.app.database["lists"].update_one({"_id": id }, {"$set": listItems })
    # print("update result ",update_result.modified_count)

    if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail=f"Item with ID {id} has not been modified")
    

    if (
        updated_list_item := request.app.database["lists"].find_one({"_id": id})
    ) is not None:
        return updated_list_item

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"ListItem with ID {id} not found")
```

**Code walkthrough:**

The reason for creating a separate model is we don’t need to update the `id` of the particular item in the list. 

Let’s first build an object which we will use to update the item in the `lists` collection and based on the `id` given in the `params` we will fetch the `item` which we want to update and using `$set` we update only specified files not the whole document.

We return `404` in two cases 

1. If we try to update the  item with same piece of text
2. If the item is not present in the collection.

Request:


![Update Request](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ra3xeaylafndzfrr74us.png)

Response: 

![Update Response](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/09q5h6ayxl58wy6l32to.png)


## Conclusion

Thanks for reading the blog everyone. If I have missed something let me know in the comments section. 

In the next blog , I will be documenting how I built the back end for Odesey. 

![https://i.giphy.com/media/lOJKLVYkNDWN8GoPoA/giphy.gif](https://i.giphy.com/media/lOJKLVYkNDWN8GoPoA/giphy.gif)

## References

1. [PyMongo Tutorial](https://www.mongodb.com/languages/python/pymongo-tutorial)















