$(function () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false})


//一些基本操作
    $(document).ajaxSend(function () {
        $('.content,#add').hide()
        $('#gd').show()

    })
    $(document).ajaxSuccess(function () {
        $('#gd').hide()
        $('.content,#add').show()
    })
//关于这两个变量可忽略，给li加的id，没用到。so不影响使用
    var index1=0;let arr2=[] ;
// 封装添加新闻核心函数   render
    //三个参数
    //type     为新闻方式···头条？娱乐？
    //repatint 一个开关，后续添加新闻函数用到
    //start    从第几条数据开始获取，默认为0，后续添加新闻函数用到，详情页也用
    function render(type,repaint=true,start=0) {
        $.ajax({
            url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=10&appkey=3732400a5ce14b54",
            dataType:'jsonp',
            success:function (res) {
                let arr = res.result.list;
                let str = "";

                arr.forEach((val,index)=>{
                    let arr1=[];
                    if(val.pic ==""){

                    str += `<li class="list" id=${index1}   >
                                    <a href="particulars2.html" class="xqa" >
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    arr1.push(""+val.content+"")
                  }
                  else {
                    str += `<li class="list" id="${index1}">
                                    <a href="particulars.html" class="xqa" >
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;

                    arr1.push(""+val.content+"")
                    }
                arr2.push(arr1)
                index1++;

                })



                // 点击获取新闻内容



                $(document).on('click','.list',function (e) {
                    e.preventDefault()
                    // e.stopPropagation()
                    console.log($('.list'))
                   var index=$('.content').find('.list').index($(this))
                    console.log(index)

                    localStorage.channel=res.result.channel
                    localStorage.indexs=index
                    location.href='particulars2.html'


                })

                if(repaint) {
                    $('.content').html(str);

                }else {

                    $('.content').html($('.content').html()+str);

                }
            }
        })
    }

//获取新闻频道   头条？娱乐？NBA?
    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=3732400a5ce14b54',
        dataType:'jsonp',
        success:function (res) {
            let arr = res.result;
            let str = "";
            arr.forEach((val, index) => {
                if(index == 0)
            {
                str += `<li class="active">${val}</li>`;

            }
            else
            {
                str += `<li>${val}</li>`
            }
        })
            $('#scroller ul').html(str);
            //执行render重绘页面
            render($('#scroller li.active').text());
        }
    })
// 点击栏目切换新闻
    $('#scroller').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }
        arr2=[];
        $(this).siblings().removeClass('active').end().addClass('active');
        let text =$(this).html();
        render(text);
    })
// 点击加载更多
    $('#add').click(function () {
        render($('#scroller li.active').html(),false,$(".content").children("li").length);
    })



     $('.search input').click(function () {
        location.href='search.html'
     })

})
















