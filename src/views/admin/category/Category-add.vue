<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h1>Category Add</h1>
            </div>
            <div>
              <button @click="$router.go(-1)" class="btn btn-outline-secondary btn-sm d-inline-block mr-1">
                <i class="fas fa-arrow-left"></i> Back
              </button>
            </div>
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
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <small>All star marked ( * ) fields are mandatory, please fill up all mandatory fields.</small>
                </h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="categorySave()" enctype="multipart/form-data">
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
                        <img v-if="form.category_image !=null" :src="form.category_image" width="70" height="70" alt="">
                        <has-error :form="form" field="category_image"></has-error>
                      </div>
                  </div>
                  <input v-model="form.created_by" name="created_by" type="hidden">
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary"><i class="fas fa-check"></i> Save</button>
                  <button type="reset" class="btn btn-warning ml-2"><i class="fas fa-undo-alt"></i> Reset</button>
                </div>
              </form>
            </div>
            <!-- /.card -->
          </div>
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
        category_image:'',
        created_by:''
      })
    };
  },
  methods: {
    changePhoto(event){
      let file = event.target.files[0];
      if(file.size > 524288){
        iziToast.warning({
          title: "Wrong",
          message: "Max image size 500KB!",
          position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
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
    categorySave() {
      this.form.post('/category')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'category-list' });
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
  }
};
</script>