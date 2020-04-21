<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Product Edit</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="productUpdate()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="productName">Product Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.product_name" name="product_name" :class="{'is-invalid': form.errors.has('product_name')}" type="text" class="form-control" id="productName" placeholder="Enter product"/>
                      <has-error :form="form" field="product_name"></has-error>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="productCategory">Category</label>
                      <select v-model="form.category_id" name="category_id" class="form-control" id="productCategory">
                        <option disabled value="">Select Category</option>
                        <option v-for="(category,index) in categories" :key="index" :value="category.id">{{category.category_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="productImage">Product Image</label>
                        <div class="custom-file">
                          <input type="file" name="product_image" @change="changePhoto($event)" class="form-control" id="productImage"/>
                          <img :src="updateImage()" alt="" width="70" height="70">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="productStatus" class="mr-3">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.product_status" value="1" type="radio" id="customRadioInline1" name="product_status" class="custom-control-input" checked>
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.product_status" value="0" type="radio" id="customRadioInline2" name="product_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div>
                    <!-- hidden input begin -->
                    <input v-model="form.updated_by" name="updated_by" type="hidden">
                    <!-- hidden input -- end -->
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary"><i class="fas fa-sync-alt"></i> Update</button>
                </div>
              </form>
              <!-- /.form -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: new Form({
        product_name: '',
        category_id: '',
        product_image: '',
        product_status: '',
        updated_by: ''
      }),
      categories:''
    };
  },
  methods: {
    singleProduct(){
      axios.get('/product/'+this.$route.params.product_id)
        .then(response => {
           if(response.data.updated_by != localStorage.getItem("loggedInUserId")){
             response.data.fetched_single_product.updated_by = localStorage.getItem("loggedInUserId");
             this.form.fill(response.data.fetched_single_product);
           }
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, record not fetched!",
            position: 'topRight',
            timeout: 2000
          });
        });
    },
    getCategories(){
      axios.get('/category')
        .then(response =>{
          this.categories = response.data.fetched_category;
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, Category not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    updateImage(){
      let img = this.form.product_image;
        if(img.length > 100){
          return  this.form.product_image
        }
        else{
          return uploadPath+"productImage/"+this.form.product_image;
        }
    },
    changePhoto(event){
      let file = event.target.files[0];
      if(file.size > 524288){
        iziToast.warning({
          title: "Wrong",
          message: "Max image size 500KB!",
          position: 'topRight',
          timeout: 2000,
        });
      }
      else{
        let reader = new FileReader();
        reader.onload = event => {
        this.form.product_image = event.target.result;
      };
      reader.readAsDataURL(file);
      }
    },
    productUpdate() {
      this.form.put('/product/'+this.$route.params.product_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: "product-list" });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Something wrong, record not updated!",
            position: 'topRight',
            timeout: 2000
          });
        });
    }
  },
  mounted(){
    this.singleProduct();
  },
  created(){
    this.getCategories();
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>