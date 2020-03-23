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
                  <h3 class="card-title">Product Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="productSave()" enctype="multipart/form-data">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="productName">Product Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.product_name" name="product_name" :class="{'is-invalid': form.errors.has('product_name')}" type="text" class="form-control" id="productName" placeholder="Enter product"/>
                      <has-error :form="form" field="product_name"></has-error>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="productCategory">Category <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <select v-model="form.category_id" name="category_id" :class="{'is-invalid': form.errors.has('category_id')}" class="form-control" id="productCategory">
                        <option disabled value="">Select Category</option>
                        <option v-for="(category,index) in categories" :key="index" :value="category.id">{{category.category_name}}</option>
                      </select>
                      <has-error :form="form" field="category_id"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="productImage">Product Image <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                        <div class="custom-file">
                          <input type="file" name="product_image" @change="changePhoto($event)" :class="{'is-invalid': form.errors.has('product_image')}" class="form-control" id="productImage"/>
                          <img v-if="form.product_image !=null" :src="form.product_image" width="70" height="70" alt="">
                          <has-error :form="form" field="product_image"></has-error>
                        </div>
                    </div>
                    <!-- <div class="form-group col-md-6">
                      <label for="productStatus">Status</label>
                      <input name="product_status" type="radio" class="form-control" id="productStatus"/>
                    </div> -->
                    <!-- hidden input begin -->
                    <input v-model="form.created_by" name="created_by" type="hidden">
                    <!-- hidden input -- end -->
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Save
                  </button>
                  <button type="reset" class="btn btn-warning ml-2">
                    <i class="fas fa-undo-alt"></i> Reset
                  </button>
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
        category_id:'',
        product_image:'',
        created_by:''
      }),
      categories:[]
    };
  },
  methods: {
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
    productSave() {
      this.form.post('/product')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'product-list' });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: 'topRight',
            timeout: 2000
          });
        });
    }
  },
  mounted(){
    this.form.created_by = localStorage.getItem("loggedInUserId");
  },
  created(){
    this.getCategories();
  }
};
</script>