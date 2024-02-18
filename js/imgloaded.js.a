const jinghuashang = {
    /**
   * 背景滚动显隐
   */
    BgScrollHide: () => {
      if (document.body.clientWidth <= 768 || !document.querySelector("#jinghuashang-home_bg")) return;
      const $plcontainer = document.querySelector("#jinghuashang-home_bg"),
        $Top_Video = document.querySelector("#jinghuashang-home_bg #Top_Video"),
        Top_Video_toggle = {
          play: ($Top_Video) => {
            if ($Top_Video && $Top_Video.paused) {
              $Top_Video.play()
              // $Top_Video.autoplay = true;
              // console.info("播放");
            }
          },
          pause: ($Top_Video) => {
            if ($Top_Video && !$Top_Video.paused) {
              $Top_Video.pause();
              // console.info("暂停");
            }
          }
        };
      function scrollBg() {
        // 缓存常用dom元素
        const currentTop = window.scrollY || document.documentElement.scrollTop,
          scrollPercent = anzhiyu.getScrollPercent(currentTop, document.body);
        let Plcontainer = scrollPercent / 50;
  
        if ($plcontainer) {
          if (Plcontainer > 1) {
            Plcontainer = 1;
            // 完全隐藏时停止视频播放
            Top_Video_toggle.pause($Top_Video);
          } else {
            // 显现时视频播放
            Top_Video_toggle.play($Top_Video);
          }
          $plcontainer.style.cssText = '--bg_process:' + Plcontainer + ';display: block';
        }
      }
      scrollBg();
      anzhiyu.addEventListenerPjax(window, "scroll", scrollBg, { passive: true });
    },
    /**
   * 随机壁纸 autoplay=""
   */
    setVideosBG: async () => {
      const $VideosBGID = document.querySelector("#jinghuashang-home_bg");
  
      if ($VideosBGID) {
        let videosStore = saveToLocal.get('videosStore');
  
        if (videosStore) {
          getVideosBg()
        } else {
          const response = await fetch("/json/images_videos.json"),
            Array = await response.json();
          videosStore = Array;
          getVideosBg()
          saveToLocal.set('videosStore', videosStore, 1);
        }
  
        function getVideosBg() {
          //用于判断是否第一次加载
          if (sessionStorage.getItem("videoReload") && document.body.clientWidth > 768) {
            const $videoRandomInt = Math.floor(Math.random() * videosStore.videos.length);
            // console.info("video", $videoRandomInt);
            $VideosBGID.classList.add("Top_Video"),
              $VideosBGID.innerHTML = `<video id="Top_Video" width="100%" height="100%" preload="auto" loop="" muted="true" playsinline="" webkit-playsinline="" x5-playsinline="" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint" x-webkit-airplay="allow"><source src="${videosStore.videos[$videoRandomInt]}" type="video/mp4"></video>`;
          } else {
            //若为第一次加载
            const $imgRandomInt = Math.floor(Math.random() * videosStore.images.length);
            // console.info("img", $imgRandomInt);
            $VideosBGID.innerHTML = `<div id="jinghuashang-home_img" style="background-image: url('${videosStore.images[$imgRandomInt]}');"></div>`;
  
            if (document.body.clientWidth > 768) {
              sessionStorage.setItem("videoReload", true);
            }
          }
        }
      }
    }
  }