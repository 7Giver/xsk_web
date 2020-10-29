function Wxshare(title, desc, imgUrl, url, share_url) {
  console.log(title, desc, imgUrl, url, share_url);
  this.$http.get(`${URL}/H5/Share/getSign`, { params: { url: url } }).then(
    (response) => {
      if (response.body.errCode == 0) {
        let res = response.data.data;
        wx.config({
          debug: false,
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
        });
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: share_url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              //alert("分享成功")
            },
            cancel: function () {
              //alert("分享失败,您取消了分享!")
            },
          });
          //微信分享菜单测试
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: share_url, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
              //alert("分享成功")
            },
            cancel: function () {},
          });
        });
      } else {
        console.log("code is not 200");
      }
    },
    (err) => {
      console.log("请求失败");
    }
  );
}
