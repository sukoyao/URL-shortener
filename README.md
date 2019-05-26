# 短網址產生器

運用 Express & MongoDB 打造的網頁，進行短網址生成。[HEROKU連結](https://vast-ravine-92996.herokuapp.com/)

## Pic

![畫面截圖](https://imgur.com/qM9jAGM.jpg)
![畫面截圖](https://imgur.com/TqdFKSR.jpg)

## Environment SetUp

- [MongoDB](https://www.mongodb.com/download-center/community) - Database

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built

- [Express](https://expressjs.com/zh-tw/starter/installing.html) - Node.js web framework

## Installing

### 安裝下載並啟動專案

打開終端機，啟動本地 MongoDB 資料庫

```
mongod --dbpath /Users/[user]/mongodb-data --bind_ip 127.0.0.1
```

再開啟另一個終端機，`Clone` 這個專案，完成後會顯示 Done 訊息

```
git clone https://github.com/sukoyao/URL-shortener.git
```

從終端機導入目標檔案，並下載工具包

```
npm install
```

```
npm run seeder
```

開啟本地伺服器。

```
node app.js
```

成功連結後，瀏覽器輸入 http://localhost:3000
網頁即可運行並執行動作。

## Features

- 使用者輸入網址後，即可進行短網址生成

## Contributor

[Yao](https://github.com/sukoyao)"# URL-shortener"  git init git add README.md git commit -m "first commit" git remote add origin https://github.com/sukoyao/URL-shortener.git git push -u origin master
"# URL-shortener" 
