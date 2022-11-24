# picgo-plugin-ipfs-nftstorage

#### [PicGo](https://github.com/Molunerfinn/PicGo)插件，通过使用 nftstorage api 上传至ipfs，只需记录图片的 hash 值，即可永久访问不会丢失，当前 nftsotrage 没有收费而且给每个账号的存储空间是31G，筒子们，羊毛薅起来！

## 使用

### 安装

已发布在npm，可以直接在PicGo插件设置中搜索安装

### nftstorage api key申请
* 进入官网 https://nft.storage/
* 登录注册
* apiKey 生成

### 图床配置

- apiKey: 申请的apiKey
- gateway(可选): ipfs网关 默认使用storage的ipfs网关，当然可以使用其他网关

公共网关：
可以查看当前活跃的网关，但是国内大部分无法直接访问
https://ipfs.github.io/public-gateway-checker/

例如这几个国内可以访问，具体可自行尝试

```
https://nftstorage.link
https://4everland.xyz
https://ipfs.leiyun.org
https://hardbin.com/ipfs
```
### 上传的图片链接
因为ipfs 的文件 hash值是唯一的，所以如果图片链接失效了，只需更换下ipfs网关即可
* 默认使用nftStorage的网关（不自定义gateway）
    * https://nftstorage.link/ipfs/{hash}
        * https://nftstorage.link/ipfs/bafkreihjht6mx7ox6lo4zv4jby6brxincbohctdx3yetwbwffo2ooyy274
    * https://{hash}.ipfs.nftstorage.link
        * https://bafkreihjht6mx7ox6lo4zv4jby6brxincbohctdx3yetwbwffo2ooyy274.ipfs.nftstorage.link/
    * 这两个都能访问，上传默认返回的是第二个图片链接

* 配置了自定义网关
    * https://{gateway}/ipfs/{hash}