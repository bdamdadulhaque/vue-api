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
                  <h3 class="card-title">Admin Add</h3>
                  <button @click="$router.go(-1)" class="btn btn-default btn-xs d-inline-block mr-1">
                    <i class="fas fa-arrow-left"></i> Back
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="adminUserSave()">
                <div class="card-body">
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="name">Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.name" name="name" :class="{'is-invalid': form.errors.has('name')}" type="text" class="form-control" id="name" placeholder="Full name" />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="email">Email <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.email" name="email" :class="{'is-invalid': form.errors.has('email')}" type="email" class="form-control" id="email" placeholder="Email" />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="password">Password <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.password" name="password" :class="{'is-invalid': form.errors.has('password')}" type="password" class="form-control" id="password" placeholder="Password" />
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="confirmPassword">Confirm Password <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                      <input v-model="form.password_confirmation" name="password_confirmation" :class="{'is-invalid': form.errors.has('password_confirmation')}" type="password" class="form-control" id="confirmPassword" placeholder="Retype password" />
                      <has-error :form="form" field="password_confirmation"></has-error>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="userRole" class="mr-4">Role</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.user_role" value="1" type="radio" id="customRadioInline1" name="user_role" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline1">Super Admin</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.user_role" value="2" type="radio" id="customRadioInline2" name="user_role" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline2">Admin</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.user_role" value="3" type="radio" id="customRadioInline3" name="user_role" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInline3">Employee</label>
                      </div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="userStatus" class="mr-4">Status</label><br>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.user_status" value="1" type="radio" id="customRadioInlineStatus1" name="user_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInlineStatus1">Active</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input v-model="form.user_status" value="0" type="radio" id="customRadioInlineStatus2" name="user_status" class="custom-control-input">
                        <label class="custom-control-label" for="customRadioInlineStatus2">Inactive</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="userPhoto">Photo</label>
                        <div class="custom-file">
                          <input type="file" name="user_photo" @change="changePhoto($event)" class="form-control" id="userPhoto"/>
                          <img v-if="form.user_photo !=null" :src="form.user_photo" width="70" height="70" alt="">
                        </div>
                    </div>
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
  data(){
    return{
      form: new Form({
        name:'',
        email:'',
        user_photo:'',
        password:'',
        password_confirmation:'',
        user_role:2,
        user_status:0,
        created_by: ''
      })
    }
  },
  methods:{
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
        this.form.user_photo = event.target.result;
      };
      reader.readAsDataURL(file);
      }
    },
    adminUserSave(){
      this.form.post('/register')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully created user!",
            position: 'topRight',
            timeout: 2000
          });
          this.$router.push({ name: 'admin-list' });
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
  mounted() {
    this.form.created_by = localStorage.getItem("loggedInUserName");
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>