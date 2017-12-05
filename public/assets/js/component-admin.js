var host="http://localhost:3000/";

Vue.component("product-list",{
  props:["product"],
  template:`
  <div class="each-product">
    <span class="product-name">{{product.title}}</span>
    <div class="product-action">
      <button class="btn btn-sm btn-success" @click="triggerEditModal(product)">Edit</button>
      <button class="btn btn-sm btn-danger" @click="deleteProduct(product._id)">Delete</button>
    </div>
  </div>`,
  methods:{
    deleteProduct:function(productId){
      axios.delete(host+"api/product/delete/"+productId).then(function({data}){
        this.$emit("deleteproduct",productId);
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    triggerEditModal:function(productObject){
      this.$emit("triggereditmodal",productObject);
    }
  }
});

Vue.component("add-product",{
  data:function(){
    return{
      productPrice:null,
      productName:null,
      imagePreview:"corsair-1200-psu.png"
    }
  },
  template:`
  <div class="add-product row">
    <div class="col-xs-12">
      <span class="input-label">Product Name</span>
      <input v-model="productName" type="text"/>
    </div>
    <div class="col-xs-12 col-sm-6">
      <span class="input-label">Product Price</span>
      <input v-model="productPrice" type="number"/>
      <button class="btn btn-primary add-new-button" @click="saveNewProduct">Add New</button>
    </div>
    <div class="col-xs-12 col-sm-6">
      <span class="input-label">Product Image</span>
      <div class="preview-image">
        <div class="overlay-preview">
          <div class="wrap">
            <span>Sample Image Preview</span>
          </div>
        </div>
        <img src="data/image/corsair-1200-psu.png" alt="Preview"/>
      </div>
    </div>
  </div>`,
  methods:{
    saveNewProduct:function(){
      axios.post(host+"api/product/add",{
        title:this.productName,
        price:this.productPrice,
        imageUrl:this.imagePreview
      }).then(function({data}){
        this.productPrice=null,
        this.productName=null,
        this.$emit("addproduct",data.msg);
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    }
  }
});
