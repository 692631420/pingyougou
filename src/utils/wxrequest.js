export default function(options) {
    return new Promise((resolve, reject) => {

        if (!options.baseurl) {
            options.baseurl = 'https://autumnfish.cn/wx/'
        }
        wx.request({
            url: options.baseurl + options.url,
            data: options.data || {},
            method: options.method || 'get',
            header: options.header || {},
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}