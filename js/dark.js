/* anzhiyu 星空粒子动画 - 本地修复版
 *
 * 修复内容 (对比 CDN 原版 https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/dark/dark.js):
 *   原版: t() 无条件 requestAnimationFrame(t) 自递归, 页面开多久跑多久。
 *         即使 light 模式(不绘制)也以屏幕刷新率(高刷屏 240Hz)空转,
 *         每次回调还 getElementsByTagName 查询 DOM, 触发每帧样式重算+渲染管线提交。
 *   修复: 仅 dark 模式启动动画; light 模式完全停止 (cancelAnimationFrame)。
 *         通过 MutationObserver 监听 html[data-theme] 切换, 切 dark 启动、切 light 停止。
 *
 * 粒子逻辑与原版一致。
 */
(function () {
  var n, e, i, h, t = .05,
      s = document.getElementById("universe"),
      o = !0,
      a = "180,184,240",
      r = "226,225,142",
      d = "226,225,224",
      c = [],
      rafId = null;

  function f() {
      n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }
  function u() {
      h.clearRect(0, 0, n, e);
      for (var t = c.length, i = 0; i < t; i++) {
          var s = c[i];
          s.move(), s.fadeIn(), s.fadeOut(), s.draw()
      }
  }
  function y() {
      this.reset = function() {
          this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
      }, this.fadeIn = function() {
          this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
      }, this.fadeOut = function() {
          this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do /2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
      } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
          h.closePath(), h.fill()
      }, this.move = function() {
          this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
      }, setTimeout(function() {
          o = !1
      }, 50)
  }
  function m(t) {
      return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }
  function l(t, i) {
      return Math.random() * (i - t) + t
  }
  function isDark() {
      return document.documentElement.getAttribute("data-theme") == "dark"
  }
  function init() {
      f(), window.addEventListener("resize", f, !1), h = s.getContext("2d");
      for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
      u()
  }
  function start() {
      if (rafId !== null || !s || !s.getContext) return;
      if (!h) init();
      var loop = function () {
          u();
          rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
  }
  function stop() {
      if (rafId !== null) { window.cancelAnimationFrame(rafId); rafId = null; }
  }
  // 主题切换监听: dark 启动 / light 停止
  new MutationObserver(function () {
      isDark() ? start() : stop();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  // 页面初始状态
  isDark() && start();
})();
