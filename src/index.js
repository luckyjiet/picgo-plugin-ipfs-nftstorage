const { NFTStorage, Blob } = require('nft.storage')

module.exports = (ctx) => {
  const register = () => {
    ctx.helper.uploader.register('ipfs-nftstorage', {
      handle,
      name: 'ipfs-nftstorage',
      config: config
    })
  }
  const handle = async function (ctx) {
    let userConfig = ctx.getConfig('picBed.ipfs-nftstorage')
    if (!userConfig) {
      throw new Error('Can\'t find uploader config')
    }
    const apiKey = userConfig.apiKey
    const gateway = userConfig.gateway
    try {
      let imgList = ctx.output
      for (let i in imgList) {
        let image = imgList[i].buffer
        if (!image && imgList[i].base64Image) {
          image = Buffer.from(imgList[i].base64Image, 'base64')
        }
        const store = new NFTStorage({ token: apiKey })
        const cid = await store.storeBlob(new Blob([image]))
        delete imgList[i].base64Image
        delete imgList[i].buffer

        let imgUrl = `https://${cid}.ipfs.nftstorage.link`
        if (gateway != null && gateway !== '') {
          imgUrl = `${gateway}/ipfs/${cid}`
        }
        imgList[i]['imgUrl'] = imgUrl
      }
    } catch (err) {
      ctx.emit('notification', {
        title: 'upload fail',
        body: JSON.stringify(err)
      })
    }
  }

  const config = ctx => {
    let userConfig = ctx.getConfig('picBed.ipfs-nftstorage')
    if (!userConfig) {
      userConfig = {}
    }
    return [
      {
        name: 'apiKey',
        type: 'input',
        default: userConfig.apiKey,
        required: true,
        message: 'nftstorage apiKey'
      },
      {
        name: 'gateway',
        type: 'input',
        default: userConfig.gateway,
        required: false,
        message: 'ipfs-gateway 如: https://nftstorage.link',
        alias: 'ipfs-gateway'
      }
    ]
  }

  return {
    uploader: 'ipfs-nftstorage',
    register
  }
}
