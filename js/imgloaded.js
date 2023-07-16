// 首页头图加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
class ProgressiveLoad {
    constructor(smallSrc, largeSrc) {
      this.smallSrc = smallSrc;
      this.largeSrc = largeSrc;
      this.initTpl();
    }
  
    /**
     * @description 生成ui模板
     */
    initTpl() {
      this.container = document.createElement('div');
      this.smallStage = document.createElement('div');
      this.largeStage = document.createElement('div');
      this.smallImg = new Image();
      this.largeImg = new Image();
      this.container.className = 'pl-container';
      this.smallStage.className = 'pl-img pl-blur';
      this.largeStage.className = 'pl-img';
      this.container.appendChild(this.smallStage);
      this.container.appendChild(this.largeStage);
      this.smallImg.onload = this._onSmallLoaded.bind(this);
      this.largeImg.onload = this._onLargeLoaded.bind(this);
    }
  
    /**
     * @description 加载背景
     */
    progressiveLoad() {
      this.smallImg.src = this.smallSrc;
      this.largeImg.src = this.largeSrc;
    }
  
    /**
     * @description 大图加载完成
     */
    _onLargeLoaded() {
      this.largeStage.classList.add('pl-visible');
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
    }
  
    /**
     * @description 小图加载完成
     */
    _onSmallLoaded() {
      this.smallStage.classList.add('pl-visible');
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
  }
  
  const executeLoad = (config, target) => {
    console.log('执行渐进背景替换');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const loader = new ProgressiveLoad(
      isMobile ? config.mobileSmallSrc : config.smallSrc,
      isMobile ? config.mobileLargeSrc : config.largeSrc
    );
    // 和背景图颜色保持一致，防止高斯模糊后差异较大
    if (target.children[0]) {
      target.insertBefore(loader.container, target.children[0]);
    }
    loader.progressiveLoad();
  };

  const config = {
    smallSrc: 'https://cn-beijing-data.aliyundrive.net/eFcbbUsm%2F984799311%2F64b3ccfc169b2da64150425aba35da447ceef09b%2F64b3ccfc555407ebf4a24de1a47989ceca5f0287?di=bj29&dr=984799311&f=64b3cd96083e1a9e742d49bc840de8ecc4c356f8&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27106763530_p1_master1200ys.jpg&security-token=CAIS%2BgF1q6Ft5B2yfSjIr5bkLv3CqYdEwZCpZmXSqWNtOv94qPbgjzz2IHFPeHJrBeAYt%2FoxmW1X5vwSlq5rR4QAXlDfNW%2BeIlepqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLukMWr%2Fwq3PIdp2ma447NWQlLnzyCMvvJ9OVDFyN0aKEnH7J%2Bq%2FzxhTPrMnpkSlacGoABCdm0yePcH0BxlzxeEvDmaNb%2BODSfE%2BYYMOkoe6cchR%2F0DIIJ1qeE2n0zIXUR74d2APm3tXTNzN06DnqTz1DNsIXFko7%2FBeGcH3OCSht2sNYtnWtcxCHylqaJ4cyQt2mDiC%2Bjyzm%2B7gWghakStEiiAFPCDw9X52B%2BQkiyZWgMwN8%3D&u=e035635854744282a13b6b3e5053d4ac&x-oss-access-key-id=STS.NUQeGvDXevRBdCcMc86pTG3Km&x-oss-expires=1689519806&x-oss-signature=WIf8wM%2F99MHdjExDs5vsN1KCWtkH3lknXxsONbCawVg%3D&x-oss-signature-version=OSS2', // 小图链接 尽可能配置小于100k的图片
    largeSrc: 'https://cn-beijing-data.aliyundrive.net/m1fVA986%2F984799311%2F64b3ccfcbb20a5186a6a4024a472aa042817438a%2F64b3ccfcd9ddb7fc3523449ab5c0b5c2ecc450e9?di=bj29&dr=984799311&f=64b3cd965ce0b3887a0d4748b36acb4f16890f44&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27106763530_p1_master1200.jpg&security-token=CAIS%2BgF1q6Ft5B2yfSjIr5bYeY3wg7xX57SvRnz0o0s4a%2BhH2onNhjz2IHFPeHJrBeAYt%2FoxmW1X5vwSlq5rR4QAXlDfNTuOClCpqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLukMWr%2Fwq3PIdp2ma447NWQlLnzyCMvvJ9OVDFyN0aKEnH7J%2Bq%2FzxhTPrMnpkSlacGoABb1bsJHGkrEXOc9QErDPwhL80ZMgd%2F6JK1uebpoVooKnhyXeYVPk4ws5GLiOvJrNk4Z6LYHj2uRi%2BoNzk2DunKdgsI44xa2HjnLZpWWyD8ncuQtFbRwP0Gt832S5CpuFYzf3UxDdQEsorlV9j1myxi3dnBhFD%2B%2B0X3K8p5pT%2B24s%3D&u=e035635854744282a13b6b3e5053d4ac&x-oss-access-key-id=STS.NUm27DncvPvDDZEGKmggk5Lfd&x-oss-expires=1689519806&x-oss-signature=9Wca3rhYsoFoNYqaRhaHU1p1i93dyGhSKlMiURr1t4I%3D&x-oss-signature-version=OSS2', // 大图链接 最终显示的图片
    mobileSmallSrc: 'https://cn-beijing-data.aliyundrive.net/eFcbbUsm%2F984799311%2F64b3ccfc169b2da64150425aba35da447ceef09b%2F64b3ccfc555407ebf4a24de1a47989ceca5f0287?di=bj29&dr=984799311&f=64b3cd96083e1a9e742d49bc840de8ecc4c356f8&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27106763530_p1_master1200ys.jpg&security-token=CAIS%2BgF1q6Ft5B2yfSjIr5bkLv3CqYdEwZCpZmXSqWNtOv94qPbgjzz2IHFPeHJrBeAYt%2FoxmW1X5vwSlq5rR4QAXlDfNW%2BeIlepqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLukMWr%2Fwq3PIdp2ma447NWQlLnzyCMvvJ9OVDFyN0aKEnH7J%2Bq%2FzxhTPrMnpkSlacGoABCdm0yePcH0BxlzxeEvDmaNb%2BODSfE%2BYYMOkoe6cchR%2F0DIIJ1qeE2n0zIXUR74d2APm3tXTNzN06DnqTz1DNsIXFko7%2FBeGcH3OCSht2sNYtnWtcxCHylqaJ4cyQt2mDiC%2Bjyzm%2B7gWghakStEiiAFPCDw9X52B%2BQkiyZWgMwN8%3D&u=e035635854744282a13b6b3e5053d4ac&x-oss-access-key-id=STS.NUQeGvDXevRBdCcMc86pTG3Km&x-oss-expires=1689519806&x-oss-signature=WIf8wM%2F99MHdjExDs5vsN1KCWtkH3lknXxsONbCawVg%3D&x-oss-signature-version=OSS2', // 手机端小图链接 尽可能配置小于100k的图片
    mobileLargeSrc: 'https://cn-beijing-data.aliyundrive.net/m1fVA986%2F984799311%2F64b3ccfcbb20a5186a6a4024a472aa042817438a%2F64b3ccfcd9ddb7fc3523449ab5c0b5c2ecc450e9?di=bj29&dr=984799311&f=64b3cd965ce0b3887a0d4748b36acb4f16890f44&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27106763530_p1_master1200.jpg&security-token=CAIS%2BgF1q6Ft5B2yfSjIr5bYeY3wg7xX57SvRnz0o0s4a%2BhH2onNhjz2IHFPeHJrBeAYt%2FoxmW1X5vwSlq5rR4QAXlDfNTuOClCpqFHPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLukMWr%2Fwq3PIdp2ma447NWQlLnzyCMvvJ9OVDFyN0aKEnH7J%2Bq%2FzxhTPrMnpkSlacGoABb1bsJHGkrEXOc9QErDPwhL80ZMgd%2F6JK1uebpoVooKnhyXeYVPk4ws5GLiOvJrNk4Z6LYHj2uRi%2BoNzk2DunKdgsI44xa2HjnLZpWWyD8ncuQtFbRwP0Gt832S5CpuFYzf3UxDdQEsorlV9j1myxi3dnBhFD%2B%2B0X3K8p5pT%2B24s%3D&u=e035635854744282a13b6b3e5053d4ac&x-oss-access-key-id=STS.NUm27DncvPvDDZEGKmggk5Lfd&x-oss-expires=1689519806&x-oss-signature=9Wca3rhYsoFoNYqaRhaHU1p1i93dyGhSKlMiURr1t4I%3D&x-oss-signature-version=OSS2', // 手机端大图链接 最终显示的图片
    enableRoutes: ['/'],
    };

  function initProgressiveLoad(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      executeLoad(config, target);
    }
  }
  
  function onPJAXComplete(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      initProgressiveLoad(config);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    initProgressiveLoad(config);
  });
  
  document.addEventListener("pjax:complete", function() {
    onPJAXComplete(config);
  });
  