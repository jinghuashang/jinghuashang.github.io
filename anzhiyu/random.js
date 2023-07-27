var posts=["posts/8c137cae.html","posts/b96d.html","posts/943e.html","posts/38e9.html","posts/c437.html","posts/a2cc.html","posts/bfb3.html","posts/536e.html","posts/cd7c.html","posts/de31.html","posts/bcc4b53b.html","posts/b206.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};var friend_link_list=[{"name":"Hexo","hundredSuffix":"","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"安知鱼`Blog","link":"https://blog.anheyu.com/","avatar":"https://img01.anheyu.com/useruploads/90/2023/04/23/6444e85234e51.jpg","descr":"生活明朗，万物可爱","recommend":true,"siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"铭心石刻","link":"https://blog.kouseki.cn","avatar":"https://blog.kouseki.cn/imgs/avatar.webp","descr":"愿岁并谢，与友长兮","siteshot":"https://blog.kouseki.cn/imgs/siteshot.webp"},{"name":"俊晗博客","link":"https://jun.pw","avatar":"https://picbed-local-01.ymzsl.com/allimgs/2023/06/10/648425dc45ac3.png","descr":"俊晗的个人博客，俊晗是一个热爱计算机与篮球的男孩子，博客里会分享一些生活琐事"},{"name":"Ganzhe","link":"https://ganzhe2028.github.io","avatar":"https://img01.anheyu.com/useruploads/151/2023/05/12/645dac23c60a2.jpg","descr":"顺其自然，持之以恒"},{"name":"铭心石刻","link":"https://blog.kouseki.cn","avatar":"https://blog.kouseki.cn/imgs/avatar.webp","descr":"愿岁并谢，与友长兮","recommend":true,"siteshot":"https://blog.kouseki.cn/imgs/siteshot.webp"},{"name":"Mr.喵帕斯","recommend":true,"link":"https://blog.mpsxx.top","avatar":"https://cdn.staticaly.com/gh/miaopasixx/picx-images-hosting@master/cq-询问台.168sjup9d000.webp","descr":"熬夜伤身","siteshot":"https://cdn.staticaly.com/gh/miaopasixx/picx-images-hosting@master/网站截屏/image.5s7l78egk7w0.webp"},{"name":"葱苓","recommend":true,"link":"https://blog.itciraos.cn","avatar":"https://cdn.jsdelivr.net/gh/ciraos/ciraos-static@main/img/avatar1.webp","descr":"Dare && Do","siteshot":"https://cdn.jsdelivr.net/gh/ciraos/ciraos-static@main/img/site-shot.webp"},{"name":"rencai","link":"https://btrencai.top","avatar":"https://picbed.btrencai.top/rencai.4b3i8vcj8vo.webp","descr":"今天你学了么","siteshot":"https://img01.anzhiy.cn/useruploads/122/2023/04/25/644754d072ba1.png"},{"name":"小植の小破站","recommend":true,"link":"https://blog.xiaoztx.top","avatar":"https://blog.xiaoztx.top/img/xiaozhi.jpg","descr":"生生不息，好运不止"},{"name":"Ariasakaの小窝","link":"https://yisous.xyz","avatar":"https://bu.dusays.com/2023/06/30/649e9ec88cf47.png","descr":"人有悲欢离合 月有阴晴圆缺","siteshot":"https://vercel.yisous.xyz/img/siteshot.png"},{"name":"Vincent文朔","link":"https://blog.vincent1230.top","avatar":"https://a.vincent1230.top/blogrol/avatar.jpg","descr":"太阳出来了 雾就会散的","siteshot":"https://a.vincent1230.top/blogrol/siteshot1080.jpg"},{"name":"探人间","link":"https://www.hydsb0.com","avatar":"https://bu.dusays.com/2023/07/10/64abbf448d530.jpg","descr":"努力吃上更贵的雪糕！"},{"name":"神经蛙","link":"https://hexo.sjava.cn/","avatar":"https://hexo.sjava.cn/img/pic.png","descr":"种一棵树最好的时间是十年前，其次是现在。","siteshot":"https://hexo.sjava.cn/img/sjw.png"},{"name":"Pupper","link":"https://pupper.cn","avatar":"https://img.pupper.cn/img/202307151348675.png","descr":"记录学习、生活中的点点滴滴~","siteshot":"https://img.pupper.cn/img/202307181549343.png"},{"name":"Mo的记事簿","link":"https://blog.xiowo.net/","avatar":"https://bu.dusays.com/2023/07/22/64bb7a6a7ddf8.png","descr":"万年鸽王，哈哈OvO"},{"name":"Akilarの糖果屋","link":"https://akilar.top/","siteshot":"https://npm.elemecdn.com/akilar-friends@latest/siteshot/akilar.top.jpg","avatar":"https://npm.elemecdn.com/akilar-friends@latest/avatar/akilar.top.jpg","descr":"欢迎光临糖果屋"},{"name":"青桔气球","recommend":true,"link":"https://blog.qjqq.cn/","avatar":"https://avatar.qjqq.cn/1/646cdb372913c.webp!avatar","descr":"分享网络安全与科技生活","siteshot":"https://avatar.qjqq.cn/1/647571edf20a9.webp!avatar"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };