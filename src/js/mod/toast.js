require('less/toast.less')
// var $ = require('jquery');  设置了plugins，每一个页面都有jquery
function toast(msg,time){
    this.msg = msg;
    this.dismissTime = time || 1000//ms
    this.createToast();
    this.showToast();
}
toast.prototype = {
    createToast(){
        var tpl = `<div class='toast'>${this.msg}</div>`;
        console.log(tpl);
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast(){
        var self= this;
        this.$toast.fadeIn(300,()=>{
            setTimeout(()=>{
                self.$toast.fadeOut(300,()=>{
                    self.$toast.remove();
                })
            },self.dismissTime)
        })
    }
};
function Toast(msg,time){
    return new toast(msg,time);
} 
window.toast = Toast;
// module.exports是一个对象，不是直接赋值函数，让函数成为它的一个方法
module.exports.Toast = Toast;







