var posts=["2022/02/25/Arch-Liunx (Legacy BIOS)/","2022/02/25/Arch-Liunx (UEFI)/","2021/02/14/My-New-Post/","2021/08/27/arknights/","2022/11/22/blog/","2022/10/22/genshin-server/","2022/10/22/genshin/","2022/08/14/Redmi-K50/","2023/04/02/hexo/","2022/04/01/minecraft/","2022/10/22/misskey/","2023/02/24/root/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};var friend_link_list=[{"name":"安知鱼","hundredSuffix":"","link":"https://anzhiy.cn/","avatar":"https://img02.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg","descr":"生活明朗，万物可爱"},{"name":"屑殇","hundredSuffix":"","link":"https://jinghuashang.cn/","avatar":"https://jinghuashang.cn/img/acc.jpg","descr":"咸鱼"}];
    var refreshNum = 1;
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