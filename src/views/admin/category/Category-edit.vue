<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Category Edit</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Category Edit</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-12">
            <!-- jquery validation -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  Category Edit
                  <small>Note write here</small>
                </h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="categoryUpdate()">
                <div class="card-body">
                  <div class="form-group">
                    <label for="categoryName">Category Name</label>
                    <input v-model="form.category_name" name="category_name" :class="{'is-invalid': form.errors.has('category_name')}" type="text" class="form-control" id="categoryName" placeholder="Enter category"/>
                    <has-error :form="form" field="category_name"></has-error>
                  </div>
                  <div class="form-group">
                    <label for="categoryImage">Category Image</label>
                      <div class="custom-file">
                        <input @change="changePhoto($event)" name="category_image" :class="{'is-invalid': form.errors.has('category_image')}" type="file" class="form-control-input" id="categoryImage"/>
                        <img :src="updateImage()" alt="" width="70" height="70">
                        <has-error :form="form" field="category_image"></has-error>
                      </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
            <!-- /.card -->
          </div>
          <!--/.col (left) -->
          <!-- right column -->
          <div class="col-md-6"></div>
          <!--/.col (right) -->
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
        category_name: '',
        category_image: ''
      })
    };
  },
  methods: {
    singleCategory(){
      axios.get('/category/'+this.$route.params.category_id)
        .then(response => {
          this.form.fill(response.data);
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
    updateImage(){
      let img = this.form.category_image;
        if(img.length > 100){
          return  this.form.category_image
        }
        else{
          return uploadPath+"categoryImage/"+this.form.category_image;
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
        this.form.category_image = event.target.result;
      };
      reader.readAsDataURL(file);
      }
    },
    categoryUpdate() {
      this.form.put('/category/'+this.$route.params.category_id)
        .then(response => {
            iziToast.success({
                title: "OK",
                message: "Successfully updated record!",
                position: 'topRight',
                timeout: 2000
            });
          this.$router.push({ name: "category-list" });
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
    this.singleCategory();
  }
};
</script>