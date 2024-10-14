# 基于 Vue 和 SpringBoot技术的工具网站

使用的框架：

前端：Vue + Vite

后端：Spring



使用到的依赖或库（通过npm list命令获取）：

```
+-- @types/crypto-js@4.2.2
+-- @types/node-forge@1.3.11
+-- @vitejs/plugin-vue@5.1.4
+-- axios@1.7.7
+-- crypto-js@4.2.0
+-- element-plus@2.8.3
+-- file-type@19.5.0
+-- github-markdown-css@5.7.0
+-- markdown-it@14.1.0
+-- node-forge@1.3.1
+-- qr-code-styling@1.6.0-rc.1
+-- unplugin-auto-import@0.18.3
+-- unplugin-element-plus@0.8.0
+-- unplugin-vue-components@0.27.4
+-- uuid@10.0.0
+-- vite@5.4.7
+-- vue-router@4.4.5
`-- vue@3.5.8
```

主要完成功能：

简单的文字转图片、随机抽签、端口连通性测试、Markdown文件预览、简易二维码生成、文件/Base64互转、UUID生成、随机字符串生成、哈希计算、加密解密

简单的文字转图片：通过canvas的特性实现。

随机抽签：通过洗牌算法实现随机排序后抽取指定个数元素

端口连通性测试：通过后端接口实现测试。

Markdown文件预览：可通过输入源码或上传源文件读取源码。通过markdown-it库提供解析，使用github-markdown-css提供样式。

简易二维码生成：通过qr-code-styling库实现简易二维码生成。实现了大部分的API。

文件/Base64互转：通过上传文件自动转换。

UUID生成：使用uuid库生成UUID，可生成v1、v3、v4、v5、v6、v7版本的UUID。可批量生成多个UUID，也可根据名称和命名空间生成指定UUID。

随机字符串生成：根据自定义生成选择可实现生成指定长度、指定个数

哈希计算：通过crypto-JS库实现计算MD5、SHA-1、SHA-224、SHA-256、SHA-384、SHA-512、SHA-3和RIPEMD160以及对应的Hmac值。

加密解密。通过crypto-JS库实现AES对称算法的加密和解密，可完全自定义五个标准参数，但需要根据提示输入正确的参数才能执行。通过node-forge和@types/node-forge库实现RSA非对称算法的加密和解密，密钥可自动生成，可选择两种填充方式PKCS#1或OAEP并输入对应参数