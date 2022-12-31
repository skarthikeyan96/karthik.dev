---
title: "How to setup a Cluster using MongoDB atlas ?"
metaTitle: "How to setup a Cluster using MongoDB atlas ?"
metaDesc: "Hello everyone,   In this blog , we will be seeing how to create a cluster using MongoDB atlas.     ..."
date: "2022-11-25"
slug: how-to-setup-a-cluster-using-mongodb-atlas--2nni
coverImage: "null"
published: true
---

Hello everyone, 

In this blog , we will be seeing how to create a cluster using MongoDB atlas. 

## Process 🚀

- Go to the [MongoDB Atlas landing page](https://www.mongodb.com/cloud/atlas/register)  and create an account with necessary information and also verify your email id. 

![Step 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w3nih52uarwfu961lbdn.png)


- After that , Click on the `New project` from the top left of the `projects dropdown`

![Step 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4bemf6xa5iwmp8k2cdtv.png)


- Give the project name , go with default options and **create a project**. 


![Step 3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p54p4hev0rvz73wifew4.png)


- Now you will be on your created project console. Click on  `Build a database`.


![Step 4](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5krg9x0s624rty8towjw.png)


- Now click on the shared cluster and click Create. You will be then navigated to the cluster configuration page. Go with default options and click on `Create Cluster`.


![Step 5](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xxs2vqgjepli76vdp6l8.png)


- For authenticating the connection , enter a user name for eg, `admin` and autogenerate the password. Keep both username and password safe, as we will be needing it while establishing a connection from any server side framework with your mongodb atlas. Click on `Create User`.

![Step 6](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/txpdb2musomzmck7cxqp.png)

- For `Where would you like to connect from` , choose the local environment , click on `Add my current IP address` and click on `Add Entry`. Finally , click on `Finish and close`. 

Congratulations  🎉 🥳 🥂 . You have finally created your shared cluster. 

## Next Steps 🪜

1. You can connect your MongoDB cluster to any of the following 
    1. MongoDB shell.
    2. Server side application using native MongoDB drivers.
    3. MongoDB Compass.
    4. MongoDB host in VSCode.
2. You can create a collection and database and play around with it. 

## Conclusion 🎉

Thanks for reading everyone. In the next blog , we will see how to create an API with FastApi ( Python web framework ) and MongoDB.

![https://media.giphy.com/media/lOJKLVYkNDWN8GoPoA/giphy.gif](https://media.giphy.com/media/lOJKLVYkNDWN8GoPoA/giphy.gif)
