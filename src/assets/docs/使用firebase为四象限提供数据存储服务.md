<!--
title:使用firebase为四象限提供数据存储服务
date:2024-09-13 05:42:25
tags: -Vue -firebase
-->
### 前言
四象限计划表需要对managementlist进行数据的增删改，然后纯前端项目貌似不支持静态文件的修改。因此需要一些后端服务，一开始试过阿里的oss，有点浪费，因为只是一个很小的json文件，还要解决跨域问题，暂时搁置。后来找到了依赖google cloud服务的firebase，里面有个firestore服务很适合存储文档类型的信息，因此将managementlist.json转到了firebase上，支持使用api增删改查，除了要科学上网外非常方便，关键是文件大小1G以内免费造。

### Firebase简介
Firebase 是由 Google 提供的一套用于构建和管理移动和 Web 应用的综合性平台。它提供了多种开发工具，涵盖了从应用开发到用户体验优化的方方面面。Firebase 的目标是简化开发流程，特别是后端服务，让开发者能够专注于前端和业务逻辑。

Firebase 主要功能：
- Firebase Authentication：提供多种用户身份验证方案（如邮箱、Google、Facebook 等）。  
- Firebase Realtime Database：实时数据库，支持数据的实时同步。  
- Firebase Firestore (Cloud Firestore)：可扩展的云数据库，支持复杂查询和脱机数据访问。  
- Firebase Storage：用于存储和管理用户上传的文件（如图片、视频等）。  
- Firebase Hosting：静态文件托管服务，支持部署 Web 应用。  
- Firebase Functions：无服务器（Serverless）计算功能，支持根据事件自动执行后端逻辑。  

### 在vue中使用Firebase
在 Vue 项目中使用 Firebase Firestore 涉及几个关键步骤：包括安装 Firebase SDK、初始化 Firebase、连接 Firestore 数据库，并在 Vue 中进行数据的读写操作。

#### 步骤 1：安装 Firebase SDK

首先，需要在 Vue 项目中安装 Firebase SDK。

```bash
npm install firebase
```

#### 步骤 2：初始化 Firebase

在项目中创建一个 `firebase.js` 文件用于初始化 Firebase 并连接到 Firestore。将 Firebase 配置信息放入这个文件中。

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 从 Firebase 控制台获取你的 Firebase 配置
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 初始化 Firestore 数据库
const db = getFirestore(app);

export { db };
```

配置参数可进入Firebase控制台-项目设置中可见
![](https://superrabbithero-imgs.oss-cn-beijing.aliyuncs.com/blog/20240914141640.png)

#### 步骤 3：在 Vue 中使用 Firestore

在 Vue 组件中，您可以通过导入 `firebase.js` 文件来访问 Firestore 数据库，执行数据的读写操作。

#### 示例：从 Firestore 读取数据

```HTML
<template>
  <div>
    <h1>Firestore Data</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      items: [] // 用于存储从 Firestore 获取的数据
    };
  },
  async mounted() {
    // 获取 Firestore 中 "users" 集合的数据
    const querySnapshot = await getDocs(collection(db, "users"));
    // 将数据存储到 items 数组中
    this.items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};
</script>
```

#### 示例：向 Firestore 写入数据

```HTML
<template>
  <div>
    <h1>Add User to Firestore</h1>
    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Name" />
      <input v-model="age" type="number" placeholder="Age" />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      name: "",
      age: ""
    };
  },
  methods: {
    async addUser() {
      try {
        // 向 Firestore 中的 "users" 集合添加一个新文档
        await addDoc(collection(db, "users"), {
          name: this.name,
          age: this.age
        });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }
};
</script>
```

#### 步骤 4：设置 Firestore 安全规则

在 Firestore 中，您可以设置安全规则来控制谁可以读取或写入数据。

在 Firebase 控制台中，找到 **Firestore Database**，然后进入 **Rules** 标签页，设置规则。例如，允许所有用户读取和写入数据的简单规则：

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### 步骤 5：离线支持（可选）

Firestore 具有离线数据支持。您可以在断网时继续读写数据，并在网络恢复时同步数据。默认情况下，Firestore 在 Web 端支持离线缓存。

### 总结

- **安装 Firebase SDK**：在 Vue 项目中通过 `npm install firebase` 安装。
- **初始化 Firebase**：通过 `initializeApp` 和 `getFirestore` 初始化 Firebase 和 Firestore。
- **读取数据**：使用 Firestore 的 `getDocs` 方法从数据库中获取文档。
- **写入数据**：使用 `addDoc` 方法向 Firestore 数据库中添加新数据。

通过这些步骤，您可以在 Vue 项目中轻松集成 Firebase Firestore，实现数据的读写功能。