/* 定位欢迎卡片（站点外挂脚本，挂载见 _config.flatpaper.yml 的 inject.bottom）
 *
 * 通过腾讯位置服务 WebServiceAPI 获取访客 IP 归属地，在右侧栏资料卡下方
 * 显示欢迎语、与博主的直线距离、访客 IP 和时段问候。请求走 JSONP，
 * Key 会暴露在前端 —— 这是 WebServiceAPI 的固有性质，请务必在腾讯位置
 * 服务后台为该 Key 配置域名白名单与配额限制。
 * 卡片样式见 /css/custom.css 的「定位欢迎卡片」区块。
 */
(function () {
  'use strict';

  var CONFIG = {
    title: '欢迎来访',
    key: 'AHDBZ-7PMRT-7C2XT-VW7ZG-3ZS6Z-UCFXR',
    longitude: 105.43501,
    latitude: 28.87875,
    unit: '公里',
    ipv6Text: '好复杂，咱看不懂~(ipv6)',
    timeout: 8000
  };

  var ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"' +
    ' stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"' +
    ' class="lucide" aria-hidden="true">' +
    '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>' +
    '<circle cx="12" cy="10" r="3"/></svg>';

  var NATION_GREETING = {
    '日本': 'よろしく，一起去看樱花吗',
    '美国': 'Let us live in peace!',
    '英国': '想同你一起夜乘伦敦眼',
    '俄罗斯': '干了这瓶伏特加！',
    '法国': "C'est La Vie",
    '德国': 'Die Zeit verging im Fluge.',
    '澳大利亚': '一起去大堡礁吧！',
    '加拿大': '拾起一片枫叶赠予你'
  };

  var PROVINCE_GREETING = {
    '北京市': '北——京——欢迎你~~~',
    '天津市': '讲段相声吧',
    '河北省': '山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山',
    '山西省': '展开坐具长三尺，已占山河五百余',
    '内蒙古自治区': '天苍苍，野茫茫，风吹草低见牛羊',
    '辽宁省': '我想吃烤鸡架！',
    '吉林省': '状元阁就是东北烧烤之王',
    '黑龙江省': '很喜欢哈尔滨大剧院',
    '上海市': '众所周知，中国只有两个城市',
    '江苏省': '散装是必须要散装的',
    '浙江省': '东风渐绿西湖柳，雁已还人未南归',
    '河南省': '可否带我品尝河南烩面啦？',
    '安徽省': '蚌埠住了，芜湖起飞',
    '福建省': '井邑白云间，岩城远带山',
    '江西省': '落霞与孤鹜齐飞，秋水共长天一色',
    '山东省': '遥望齐州九点烟，一泓海水杯中泻',
    '湖北省': '来碗热干面~',
    '湖南省': '74751，长沙斯塔克',
    '广东省': '来两斤福建人~',
    '广西壮族自治区': '桂林山水甲天下',
    '海南省': '朝观日出逐白浪，夕看云起收霞光',
    '四川省': '康康川妹子',
    '贵州省': '茅台，学生，再塞200',
    '云南省': '玉龙飞舞云缠绕，万仞冰川直耸天',
    '西藏自治区': '躺在茫茫草原上，仰望蓝天',
    '陕西省': '来份臊子面加馍',
    '甘肃省': '羌笛何须怨杨柳，春风不度玉门关',
    '青海省': '牛肉干和老酸奶都好好吃',
    '宁夏回族自治区': '大漠孤烟直，长河落日圆',
    '新疆维吾尔自治区': '驼铃古道丝绸路，胡马犹闻唐汉风',
    '台湾省': '我在这头，大陆在那头',
    '香港特别行政区': '永定贼有残留地鬼嚎，迎击光非岁玉',
    '澳门特别行政区': '性感荷官，在线发牌'
  };

  var CITY_GREETING = {
    '江苏省': {
      '南京市': '这是我挺想去的城市啦',
      '苏州市': '上有天堂，下有苏杭'
    },
    '河南省': {
      '郑州市': '豫州之域，天地之中',
      '南阳市': '臣本布衣，躬耕于南阳此南阳非彼南阳！',
      '驻马店市': '峰峰有奇石，石石挟仙气嵖岈山的花很美哦！',
      '开封市': '刚正不阿包青天',
      '洛阳市': '洛阳牡丹甲天下'
    },
    '湖北省': {
      '黄冈市': '红安将军县！辈出将才！'
    },
    '广东省': {
      '广州市': '看小蛮腰，喝早茶了嘛~',
      '深圳市': '今天你逛商场了嘛~',
      '阳江市': '阳春合水！博主家乡~ 欢迎来玩~'
    }
  };

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function greeting(ad) {
    if (ad.nation === '中国') {
      var cityMap = CITY_GREETING[ad.province];
      if (cityMap && cityMap[ad.city]) return cityMap[ad.city];
      return PROVINCE_GREETING[ad.province] || '带我去你的城市逛逛吧！';
    }
    return NATION_GREETING[ad.nation] || '带我去你的国家逛逛吧';
  }

  function timeGreeting() {
    var hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return '<span>🌤️ 早上好，一日之计在于晨</span>';
    if (hour >= 11 && hour < 13) return '<span>☀️ 中午好，记得午休喔~</span>';
    if (hour >= 13 && hour < 17) return '<span>🕞 下午好，饮茶先啦！</span>';
    if (hour >= 17 && hour < 19) return '<span>🚶‍♂️ 即将下班，记得按时吃饭~</span>';
    if (hour >= 19 && hour < 24) return '<span>🌙 晚上好，夜生活嗨起来！</span>';
    return '夜深了，早点休息，少熬夜';
  }

  function getDistance(lng1, lat1, lng2, lat2) {
    var R = 6371;
    var PI = Math.PI;
    function point(lng, lat) {
      var e = lng * PI / 180;
      var n = lat * PI / 180;
      return { x: Math.cos(n) * Math.cos(e), y: Math.cos(n) * Math.sin(e), z: Math.sin(n) };
    }
    var a = point(lng1, lat1);
    var b = point(lng2, lat2);
    var c = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    return Math.round(Math.asin(c / 2) * 2 * R);
  }

  // JSONP：腾讯位置服务的 output=jsonp 需要一个全局回调函数。
  function jsonp(url, cb) {
    var name = 'jinghuashangWelcomeCb' + Date.now() + Math.floor(Math.random() * 1e4);
    var script = document.createElement('script');
    var settled = false;
    var timer;

    function settle(res) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      delete window[name];
      if (script.parentNode) script.parentNode.removeChild(script);
      cb(res);
    }

    window[name] = function (res) { settle(res); };
    script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + encodeURIComponent(name);
    script.onerror = function () { settle(null); };
    timer = setTimeout(function () { settle(null); }, CONFIG.timeout);
    document.body.appendChild(script);
  }

  function mount() {
    // 防重复注入：脚本被重复引入时只保留一张卡片。
    if (document.querySelector('.welcome-loc-card')) return null;
    var profile = document.querySelector('.paper-sidebar .profile-card');
    if (!profile) return null;
    var section = document.createElement('section');
    section.className = 'side-card welcome-loc-card';
    section.setAttribute('aria-label', CONFIG.title);
    section.innerHTML = '<h2>' + ICON + esc(CONFIG.title) + '</h2>' +
      '<div class="welcome-loc-card__info" aria-live="polite">定位中…</div>';
    profile.insertAdjacentElement('afterend', section);
    return section.querySelector('.welcome-loc-card__info');
  }

  function render(info, result) {
    var ad = result.ad_info || {};
    var coords = result.location || {};
    var dist = getDistance(CONFIG.longitude, CONFIG.latitude, coords.lng, coords.lat);
    var pos = ad.nation === '中国'
      ? [ad.province, ad.city, ad.district].filter(Boolean).join(' ')
      : ad.nation;
    var ip = String(result.ip || '');
    var ipHtml = ip.indexOf(':') > -1
      ? '<br>' + esc(CONFIG.ipv6Text)
      : esc(ip);

    info.innerHTML =
      '欢迎来自 <b>' + esc(pos) + '</b> 的小友💖<br>' +
      esc(greeting(ad)) + '🍂<br>' +
      '当前位置距博主约 <b>' + dist + '</b> ' + esc(CONFIG.unit) + '！<br>' +
      '您的IP地址为：<b>' + ipHtml + '</b><br>' +
      timeGreeting() + '<br>';
  }

  function boot() {
    var info = mount();
    if (!info) return;
    jsonp(
      'https://apis.map.qq.com/ws/location/v1/ip?key=' + encodeURIComponent(CONFIG.key) + '&output=jsonp',
      function (res) {
        if (!res || res.status !== 0 || !res.result) {
          // 腾讯按域名白名单放行：本地预览（localhost）或未加白名单的域名会返回
          // status 110「来源域名未被授权」；失败时保留占位文案，并在控制台给出原因。
          if (window.console && console.warn) {
            console.warn('[welcome-loc] 定位失败：', res && (res.message || '请求超时或网络异常'));
          }
          info.textContent = '定位失败';
          return;
        }
        render(info, res.result);
      }
    );
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
