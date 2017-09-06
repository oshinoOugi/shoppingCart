var vm =new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0
    },
    // 局部过滤器
    filters:{
        formatMoney:function (value) {
            return "¥"+value.toFixed(2);
            
        }
    },
    //相当于 onready
    mounted:function () {
        this.cartView();
    },
    //所有事件的绑定
    methods:{
        cartView:function () {
            this.$http.get("data/cartData.json").then(res=> {

                this.productList=res.data.result.list;
                this.totalMoney=res.data.result.totalMoney;
            })
        },
        // 单条目商品价格更改.
        changeMoney:function (value,type) {
            if(type<0){
                if(value.productQuantity>1){
                    value.productQuantity--;
                }else{
                    value.productQuantity=1;
                }
            }
            else{
                value.productQuantity++;
            }
        }
    }

});
// 全局过滤器可以在任何一个页面
Vue.filter("money",function (value,type) {
    return "¥"+value.toFixed(2)+type;
})