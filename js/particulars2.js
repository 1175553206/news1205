
$(function () {
    //一些基本操作
    $(document).ajaxSend(function () {
        $('#gd').show()
    })
    $(document).ajaxSuccess(function () {
        $('#gd').hide()

    })
    $('.back').click(function () {
        history.back()
    })
    //声明两个变量用来存储   搜索页存在本地数据的值  值用来写在ajax地址栏
let valuesa=localStorage.val;
let indexsa=localStorage.indexsa;
    // console.log(channel,index)

$.ajax({
    url: "https://api.jisuapi.com/news/search?keyword=" + valuesa + "&appkey=3732400a5ce14b54",
    dataType:'jsonp',
    success:function (res) {
        let str = "";
        let str1='';
        let nav = res.result.list[indexsa].content

        let src=res.result.list[indexsa].src
        // console.log(nav.src())
             str1=`<span>${src}</span>`

        $('#xiangqing').html(nav)
        $('.headspan').html(str1)

    }


})



})