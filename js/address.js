new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        curIndex:0,
        shippingMethod:1,
        delFlag:false,
        curAddress:""
    },
    mounted:function () {
        this.getAddressList()
    },

    computed:{
        filterAddressList:function () {
            return this.addressList.slice(0,this.limitNum);

        }
    },
    methods:{
        getAddressList:function () {
            this.$http.get('data/address.json').then(res=>{

                this.addressList=res.data.result;
                console.log(this.addressList)
            })
        },
        //点击more按钮加载全部地址
        loadMore:function () {
            let _this=this;
            if(_this.limitNum!=_this.addressList.length){
                _this.limitNum=_this.addressList.length;
            }
            //再次点击可以收回列表
            else{

            }
        },
        //设为默认
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }
                else{
                    address.isDefault=false
                }

            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curAddress=this.addressList.indexOf(item);


        },
        //删除地址卡片~
        delAddress:function () {
            this.addressList.splice(this.curAddress,1);
            this.delFlag=false;
            
        }






    }
})