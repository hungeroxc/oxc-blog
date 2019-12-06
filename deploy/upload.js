// @ts-nocheck

// 只针对正式环境

const fs = require('fs')
const qiniu = require('qiniu')

const accessKey = process.env.QINIUAK
const secretKey = process.env.QINIUSK

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const staticPath = 'dist/prod/static'
const bucket = 'oxc-blog'

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)
let putExtra = new qiniu.form_up.PutExtra()
putExtra = null

// 文件上传
const uploadFile = localFile => {
    // 配置路径
    const key = localFile.replace(staticPath + '/', '')
    const options = {
        scope: `${bucket}:${key}`
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    // 生成凭证
    const uploadToken = putPolicy.uploadToken(mac)
    // 上传文件
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
        if (respErr) throw respErr
        if (respInfo.statusCode == 200) {
            console.log(respBody)
        } else {
            console.log(respInfo.statusCode)
            console.log(respBody)
            throw new Error()
        }
    })
}

// 目录上传
const uploadDir = dirPath => {
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err

        files.forEach(item => {
            const path = `${dirPath}/${item}`

            fs.stat(path, (err, state) => {
                if (err) throw err

                if (state.isDirectory()) {
                    uploadDir(path)
                } else {
                    uploadFile(path)
                }
            })
        })
    })
}

// 生成404页面，该页面与首页一样，因为静态文件上传至cdn之后，跳转/xxx会试图寻找xxx.html文件
// 而该文件不存在的时候跳到404，也就是跳回首页，用于模拟nginx中的try files效果
const copyIndexHtmlTo404 = () => {
    fs.writeFileSync(`${staticPath}/errno-404`, fs.readFileSync(`${staticPath}/index.html`))
    fs.readdir(staticPath, (e, r) => {
        console.log(r)
    })
}

copyIndexHtmlTo404()

fs.exists(staticPath, exists => {
    if (!exists) {
        console.log('目录不存在', staticPath)
    } else {
        console.log('开始上传')
        uploadDir(staticPath)
    }
})
