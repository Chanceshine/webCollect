function downloadFile(fileName, content) { //下载base64图片
    var base64ToBlob = function(code) {
        var parts = code.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);

        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for(var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    };
    var aLink = document.createElement('a');
    var blob = base64ToBlob(content); //new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
};
/**
 * filename:文件名，url：下载地址
**/
function test(filename, url){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    //设置图片跨域访问
    img.crossOrigin = 'anonymous';
    //加时间戳解决跨域问题
    img.src = url+"?timeStamp="+new Date();
    img.onload = function () {
        canvas.width = img.width;       //让画布大小与图片同长宽
        canvas.height = img.height;     //让画布大小与图片同长宽
        // document.body.appendChild(img);      //这一句好像不必要，如果加上这句的话点击下载按钮，图片会出现在页面底部
        ctx.drawImage(this,0,0,img.height,img.height);
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);    //不要遗漏这一句
        var base64 = canvas.toDataURL('image/jpg', 1);
        // console.log(base64)
        downloadFile(filename, base64);
    };
}
