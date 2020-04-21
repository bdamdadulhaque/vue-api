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
                  <h3 class="card-title">Category Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="categorySave()" enctype="multipart/form-data">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="categoryName">Category Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.category_name" name="category_name" :class="{'is-invalid': form.errors.has('category_name')}" type="text" class="form-control" id="categoryName" placeholder="Enter category"/>
                      <has-error :form="form" field="category_name"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="categoryImage">Category Image <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <div class="custom-file">
                        <input type="file" name="category_image" @change="changePhoto($event)" :class="{'is-invalid': form.errors.has('category_image')}" class="form-control" id="categoryImage"/>
                        <has-error :form="form" field="category_image"></has-error>
                        <img v-if="form.category_image !=null" :src="form.category_image" width="70" height="70" alt/>
                      </div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="categoryStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.category_status" value="1" type="radio" id="customRadioInline1" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.category_status" value="0" type="radio" id="customRadioInline2" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                  </div> -->
                  <div class="form-row">
                    <!-- <div class="form-group col-md-6">
                      <label for="categoryStatus" class="mr-4">Status:</label>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline1" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="category_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Inactive</label>
                      </div>
                    </div> -->
                    <!-- <div class="form-group col-md-4">
                      <label for="inputState">State</label>
                      <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input type="text" class="form-control" id="inputZip">
                    </div> -->
                    <!-- hidden input begin -->
                    <input v-model="form.created_by" name="created_by" type="hidden" />
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
                <!-- /.card footer-->
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
        category_name: '',
        category_image: '',
        category_status: 1,
        created_by: ''
      })
    };
  },
  methods: {
    changePhoto(event) {
      let file = event.target.files[0];
      if (file.size > 524288) {
        iziToast.warning({
          title: "Wrong",
          message: "Max image size 500KB!",
          position: "topRight",
          timeout: 2000
        });
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.category_image = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    categorySave() {
      this.form
        .post("/category")
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: "topRight",
            timeout: 2000
          });
          this.$router.push({ name: "category-list" });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: "topRight",
            timeout: 2000
          });
        });
    }
  },
  mounted() {
    this.form.created_by = localStorage.getItem("loggedInUserId");
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>