var vm =new Vue({
    el:"#app",
    data:{
        productList:[],
        checkAllFlag:false,
        totalMoney:0,
        totalPrice:0,
        delFlag:false,
        curProduct:""
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
            this.calcTotalPrice()
        },
        // 单条目勾选
        selectedProduct:function (item) {
            if((typeof item.checked) == 'undefined'){
                // Vue.set(item,"checked",true);
                this.$set(item,"checked",true);
            }
            else{
                item.checked =!item.checked;
            }
            this.calcTotalPrice()
            
        },
        // 全选与取消全选
        checkAll:function (flag) {
            this.checkAllFlag=flag;
            var _this=this;
            this.productList.forEach(function (item,index) {
                if((typeof item.checked) == 'undefined'){
                    // Vue.set(item,"checked",true);
                    _this.$set(item,"checked",_this.checkAllFlag);
                }
                else {
                    item.checked=_this.checkAllFlag;
                }
            });
            this.calcTotalPrice()
        },
        // 总价格
        calcTotalPrice:function () {
            var _this=this;
            this.totalPrice=0;
            this.productList.forEach(function (item,index) {
               if(item.checked){
                   _this.totalPrice+=item.productPrice*item.productQuantity
               }
            })
        },
        // 点击删除图标时：删除条目确认
        delConfirm:function (item) {
            this.curProduct=this.productList.indexOf(item);
            this.delFlag=true;
            console.log(this.curProduct)

        },
        // 模态框确认删除
        delProduct:function (item) {
            console.log(this.curProduct);
            this.productList.splice(this.curProduct,1);
            this.delFlag=false;
        },
        jump:function () {


        }

    }

});
// 全局过滤器可以在任何一个页面
Vue.filter("money",function (value,type) {
    return "¥"+value.toFixed(2)+type;
})