const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxa62595205027f2d4',

    // 微信小程序 App Secret
    appSecret: 'c3832ae64ca9cecbdc966ce70047593d',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

  qcloudAppId: '1258221737', 
  qcloudSecretId: 'AKIDh096PXFM4bXyFuumy1vumYBh3EE3aCUb', 
  qcloudSecretKey: '44vb5OWT0NzQjsptpdFgyPhshK6kDVgg',
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxa62595205027f2d4',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
      // fileBucket: 'kankan1205-1258221737',
        fileBucket: 'kankan1205',
        // 文件夹
        uploadFolder: '',
  mimetypes: ['audio/x-aac', 'audio/mpeg', 'video/webm', 'audio/mpeg', 'audio/mp3', 'audio/m4a'],

    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
