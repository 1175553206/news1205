
$(function () {
    //返回上回浏览记录
    $('#back').click(function () {
        history.back()
    })
    let search = '';
    let arr

    //将本地数据已存数据再次放入search;
    //有数据赋给search
    if(localStorage.history){
        search=localStorage.history
        // 数组用“，”隔开
         arr = search.split(",")


        arr.shift();
        //历史记录截取最后5个
        arr=arr.slice(-5);

        //将内容放入页面
        let str='';
        arr.forEach(val=> {
          str+=`<span>${val}</span>`
        })
         $('.span').html(str)

    }

    //事件委派到#record 实现各个点击
    $('#record').on('click','span',function () {
          let thisa=$(this).text()

        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + thisa + "&appkey=928182a1a53ac025",
            dataType: 'jsonp',
            beforeSend:function () {
                $('#gd').show()
                //历史记录消失
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                //历史记录消失
                $('#record').hide()
                //点击的页面加入数组
                let arr = res.result.list;


                let str='';

                arr.forEach(val=>{
                    if(val.pic ==""){
                    str += `<li class="list" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                }
                else{
                    str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                }
            })
                $('#aaa').html(str);
                //点击内容后调整详情页2
                $('.content').on('click', '.list', function () {
                    let indexsa = $('.list').index(this)
                    console.log(indexsa)
                    localStorage.val = thisa;
                    localStorage.indexsa = indexsa;
                    location.href = 'particulars2.html'
                })

            }
        })


    })








    $('.search input').blur(function () {
        //input的内容
        let values = $(this).val();
        //存搜索内容到search

        if (values=='') {
            return
        }
        // if(!arr.includes($(this).val())){
        //     search+=","+$(this).val();
        //     localStorage.history=search;
        // }


        //input
        $.ajax({

            url: "https://api.jisuapi.com/news/search?keyword=" + values + "&appkey=928182a1a53ac025",
            dataType: 'jsonp',
            //发送前加载隐藏 ，
            beforeSend:function () {
               $('#gd').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                $('#record').hide()
                //存储
                let arr = res.result.list;

                  let str='';
                    arr.forEach((val,index)=>{
                        if(val.pic ==""){
                        str += `<li class="list" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }else
                    {
                        str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                    }
                })
                    $('#aaa').html(str);
                //点击内容后调整详情页2
                $('.content').on('click', '.list', function () {
                    let indexsa = $('.list').index(this)
                    console.log(indexsa)
                    localStorage.val = thisa;
                    localStorage.indexsa = indexsa;
                    location.href = 'particulars2.html'
                })

            },
        })
    })


    $('.sosuo').click(function () {

        // 删除新闻栏目
        $('#wrapper').remove();
        // 获取输入内容
        let values = $('input').val();
        // 输出搜索新闻
        $.ajax({
            url: "https://api.jisuapi.com/news/search?keyword=" + values + "&appkey=928182a1a53ac025",
            dataType: 'jsonp',
            beforeSend:function () {
                $('#gd').show()
                $('#record').hide()
            },
            success: function (res) {
                $('#gd').hide()
                $('#record').hide()
                let arr = res.result.list;
                let str = "";
                arr.forEach((val,index)=>{
                    if(val.pic==""){
                    str += `<li class="list" >
                                <a href="${val.url}">
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                }
                else
                {
                    str += `<li class="list">
                                <a href="${val.url}">
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="con">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                }
            })
                $('#aaa').html(str);
                //点击内容后调整详情页2
                $('.content').on('click', '.list', function () {
                    let indexsa = $('.list').index(this)
                    console.log(indexsa)
                    localStorage.val = thisa;
                    localStorage.indexsa = indexsa;
                    location.href = 'particulars2.html'
                })

            }
        })
    })


})