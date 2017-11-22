// VueJS Instance
new Vue({
  el:"#app",
  data:{
    products:[],
    shoppingCart:null,
    total:0,
    categoryList:[
      {title:"Processor",image:"./assets/icon/processor.png"},
      {title:"HDD",image:"./assets/icon/hard-disk.png"},
      {title:"VGA",image:"./assets/icon/video-card.png"},
      {title:"RAM",image:"./assets/icon/ram.png"},
      {title:"Monitor",image:"./assets/icon/monitor.png"},
      {title:"Power Supply",image:"./assets/icon/power-source.png"},
      {title:"Network",image:"./assets/icon/ethernet.png"},
      {title:"Mouse",image:"./assets/icon/mouse.png"},
      {title:"Keyboard",image:"./assets/icon/keyboard.png"}
    ],
    showCategory:false,
    showShoppingCart:false
  },
  created:function(){ // Dijalankan ketika HTML pertama kali berjalan
    this.allProducts();
    this.updateState();
    this.checkTotal();
  },
  methods:{
    // Show / Hide Category
    categoryBehavior:function(){
      var duration=800;
      if(!this.showCategory){
        $("#category-body").slideDown(duration,"easeInOutQuart");
      }else{
        $("#category-body").slideUp(duration,"easeInOutQuart");
      }
      this.showCategory=!this.showCategory;
    },
    // Show / Hide Shopping Cart
    cartBehavior:function(){
      var duration=800;
      if(!this.showShoppingCart){
        $("#shopping-cart-list").slideDown(duration,"easeInOutQuart");
      }else{
        $("#shopping-cart-list").slideUp(duration,"easeInOutQuart");
      }
      this.showShoppingCart=!this.showShoppingCart;
    },
    // Retrieve all product data from database
    allProducts:function(){
      axios.get("http://localhost:3000/api/product/all").then((fromServer)=>{
        if(fromServer.data.status){
          fromServer.data.products.forEach(function(data){
            this.products.push(data);
          }.bind(this));
        }else{
          console.log("Something went wrong!");
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    // Auto update shoping cart state on refresh based on localStorage data
    updateState:function(){
      if(localStorage.getItem("shopping-cart") != null){
        var cart=JSON.parse(localStorage.getItem("shopping-cart"));
        this.shoppingCart=cart;
      }
    },
    // Add item to shoping cart state & shoping cart localStorage
    addToCart:function(product){
      // Jika localStorage Shoping Cart ditemukan
      if(localStorage.getItem("shopping-cart") != null){
        var i=0;
        var duplicate=false;
        var cart=JSON.parse(localStorage.getItem("shopping-cart"));
        // Lakukan perulangan selama duplicate tidak ditemukan
        do{
          // Jika item ditemukan dalam shoping cart
          if(cart[i]._id == product._id){
            duplicate=true;
            cart[i].quantity++;
            cart.splice(i,1,cart[i]);
          // Jika item tidak ditemukan dalam shoping cart
          }else if(cart[i]._id != product._id && i == cart.length - 1){
            duplicate=true;
            product.quantity=1;
            cart.push(product);
          }
          i++;
        }while(!duplicate);
        localStorage.setItem("shopping-cart",JSON.stringify(cart));
        this.shoppingCart=cart;
      // Jika localStorage Shoping Cart tidak ditemukan
      }else{
        product.quantity=1;
        this.shoppingCart=[product];
        localStorage.setItem("shopping-cart",JSON.stringify([product]));
      }
      this.checkTotal();
    },
    // Check Total
    checkTotal:function(){
      this.total=0;
      if(localStorage.getItem("shopping-cart") != null){
        this.shoppingCart.forEach(function(item){
          var price=item.price;
          var quantity=item.quantity;
          var subtotal=price * quantity;
          this.total+=subtotal;
        }.bind(this));
      }
    },
    // Remove from shopping cart
    removeCart:function(itemId){
      var cart=JSON.parse(localStorage.getItem("shopping-cart"));
      cart.forEach(function(item,i){
        if(item._id === itemId){
          cart.splice(i,1);
        }
      });
      if(cart.length === 0){
        this.cartBehavior();
        this.shoppingCart=null;
        localStorage.removeItem("shopping-cart");
      }else{
        this.shoppingCart=cart;
        localStorage.setItem("shopping-cart",JSON.stringify(cart));
      }
      this.checkTotal();
    },
    // Checkout Item
    checkout:function(){
      var itemList=this.shoppingCart.map(function(item){
        var obj={
          itemId:item._id,
          quantity:item.quantity,
          subtotal:item.quantity * item.price
        }
        return obj
      }.bind(this));
      axios.post("http://localhost:3000/api/transaction/add",{
        userId:"5a14b6743518333a09835780",
        itemList:itemList,
        total:this.total
      }).then(function(stats){
        if(stats.data.status){
          this.total=0;
          this.shoppingCart=null;
          localStorage.removeItem("shopping-cart");
          this.cartBehavior();
        }else{
          console.log(stats.data.msg);
        }
      }.bind(this)).catch(function(err){
        console.log("Something went wrong! Check 'checkout section'!");
      });
    }
  }
});
