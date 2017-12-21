
<script>
    var ImgList = [
        {
            src: 'https://photo.tuchong.com/443122/f/11585728.jpg',
            width: 800,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
            width: 1200,
            height: 800
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
            width: 800,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585744.jpg',
            width: 1041,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
            width: 1200,
            height: 800
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
            width: 800,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585726.jpg',
            width: 800,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585744.jpg',
            width: 1041,
            height: 1200
        },
        {
            src: 'https://photo.tuchong.com/443122/f/11585739.jpg',
            width: 1200,
            height: 800
        }
    ];

    window.imgWaterfall = (function () {
        var waterfall = function () {
            this.dom = document.body;
            this.imgList = [];
            this.showNum = 4;
            this.showAll = false;
            this.maxWidth = window.screen.width;
            this.fn = function () {
                console.warn('可以传入回调函数')
            }
        }
        waterfall.prototype = {
            init: function (dom, imgList, options, fn) {
                var meta = document.getElementsByTagName('meta');
                var hasMeta = false;
                for (var i = 0;i < meta.length;i++) {
                    if (meta[i].name === 'viewport') {
                        hasMeta = true;
                    }
                }
                if (!hasMeta) {
                    var viewport = document.createElement('meta');
                    viewport.setAttribute('name','viewport');
                    viewport.setAttribute('content','width=device-width, initial-scale=1, shrink-to-fit=no,user-scalable=no');
                    document.head.appendChild(viewport);
                }
                if (dom) {
                    this.dom = dom;
                }
                if (options) {
                    if (options.showNum) {
                        this.showNum = options.showNum
                    }
                    if (options.showAll) {
                        this.showAll = options.showAll
                    }
                    if (options.maxWidth) {
                        this.maxWidth = options.maxWidth
                    }          
                }
                if (fn) {
                    this.fn = fn;
                }
                try {
                    this.imgList = imgList
                } catch (err) {
                    throw(err)
                }
                this.show();
            },
            show: function () {
                var i = 0;
                var outer = document.createElement('div');
                var loadMore = document.createElement('div');
                loadMore.style.fontSize = '14px';
                loadMore.style.textAlign = 'center';
                loadMore.style.color = '#666';
                loadMore.style.background = '#efefef';
                loadMore.innerText = '共有' + this.imgList.length + '张图片  点击查看更多';
                while (i <= this.imgList.length - 1) {
                    if (i+2 > this.showNum&&!this.showAll) {
                        var _this = this;
                        outer.appendChild(loadMore);
                        loadMore.addEventListener('click', _this.fn);
                        break;
                    }
                    if (!this.imgList[i + 1]) {
                        var lastOne = document.createElement('div');
                        lastOne.style.fontSize = 0;
                        var img = new Image();
                        img.src = this.imgList[i].src;
                        img.style.maxWidth = this.maxWidth + 'px';
                        lastOne.appendChild(img);
                        outer.appendChild(lastOne);
                    } else {
                        let rate1 = this.imgList[i].height / this.imgList[i].width,
                            rate2 = this.imgList[i + 1].height / this.imgList[i + 1].width,
                            totalRate = rate1 + rate2,
                            width1 = rate2 / totalRate * (this.maxWidth-1),
                            width2 = rate1 / totalRate * (this.maxWidth-1),
                            height = width1 * rate1;
                        var group = document.createElement('div');
                        group.style.fontSize = 0;
                        var img1 = new Image();
                        img1.src = this.imgList[i].src;
                        img1.style.width = width1 + 'px';
                        img1.style.height = height + 'px';
                        img1.style.marginBottom = '1px';
                        var img2 = new Image();
                        img2.src = this.imgList[i + 1].src;
                        img2.style.width = width2 + 'px';
                        img2.style.height = height + 'px';
                         img2.style.float = 'right';
                        img2.style.marginBottom = '1px';
                        group.appendChild(img1);
                        group.appendChild(img2);
                        outer.appendChild(group);
                    }
                    i = i + 2;
                }
                this.dom.appendChild(outer)
            }
        };
        
        return waterfall
    })();

    /*
     * @param dom<Document>   组件插入的容器(默认为body)
     * @param imgList<Array>  图片集合数组，每个元素包括src,width,height
     * @param options<Object> 组件选项 showNum<NUmber>:显示数目(默认4) showAll<Boolean>:显示全面(默认false)  maxWidth<Number>:图片显示的最大宽度(默认为屏幕宽度)  
     * @param fn<Function>  查看更多回调(与showNum、showAll配合使用)
     * */
     var showAll = false;
    var waterfall = new imgWaterfall();
    waterfall.init('', ImgList, {},function() {
         waterfall.init('', ImgList, {showAll: true});
    });
</script>
