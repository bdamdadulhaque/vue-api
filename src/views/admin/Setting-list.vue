<template>
    <div>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card card-primary">
                            <div class="card-header">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">Settings</h3>
                                </div>
                            </div>
                                <div class="card-body">
                                    <div class="form-row">
                                        <div class="form-group col-md-3">
                                            <form @submit.prevent="siteLogoUpdate()">
                                                <label for="siteLogo">Logo</label>
                                                    <div class="custom-file">
                                                        <input type="file" name="site_logo" @change="changeLogo($event)" class="form-control" id="siteLogo"/>
                                                        <img :src="updateLogo()" alt="" width="70" height="70">
                                                    </div>
                                                <button type="submit" class="btn btn-primary mt-3">
                                                    <i class="fas fa-upload"></i> Upload
                                                </button>
                                            </form>
                                        </div>
                                        <div class="form-group col-md-2">
                                          <form v-if="add_form == true" @submit.prevent="menuSave()">
                                            <label for="menuName">Menu Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form2.menu_name" name="menu_name" :class="{'is-invalid': form.errors.has('menu_name')}" type="text" class="form-control" id="menuName" placeholder="Enter menu name"/>
                                            <has-error :form="form" field="menu_name"></has-error>
                                            <label for="menuType" class="mt-2">Menu Type <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <select v-model="form2.menu_type" name="menu_type" class="form-control" id="menuType">
                                              <option disabled value="">Select Menu Type</option>
                                              <option value="1">Header</option>
                                              <option value="2">Footer</option>
                                            </select>
                                            <label for="menuLink" class="mt-2">Menu Link <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form2.menu_link" name="menu_link" :class="{'is-invalid': form.errors.has('menu_link')}" type="text" class="form-control" id="menuLink" placeholder="Enter menu link"/>
                                            <has-error :form="form" field="menu_link"></has-error>
                                            <label for="menuPosition" class="mt-2">Position <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form2.menu_position" name="menu_position" :class="{'is-invalid': form.errors.has('menu_position')}" type="number" class="form-control" id="menuPosition" placeholder="Enter menu position"/>
                                            <has-error :form="form" field="menu_position"></has-error>
                                            <button type="submit" class="btn btn-primary mt-2">
                                            <i class="fas fa-check"></i> Save
                                            </button>
                                          </form>
                                          <form v-if="edit_form == true" @submit.prevent="menuUpdate()">
                                            <label for="menuName">Menu Name <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form3.menu_name" name="menu_name" :class="{'is-invalid': form.errors.has('menu_name')}" type="text" class="form-control" id="menuName" placeholder="Enter menu name"/>
                                            <has-error :form="form" field="menu_name"></has-error>
                                            <label for="menuType" class="mt-2">Menu Type <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <select v-model="form3.menu_type" name="menu_type" class="form-control" id="menuType">
                                              <option disabled value="">Select Menu Type</option>
                                              <option value="1">Header</option>
                                              <option value="2">Footer</option>
                                            </select>
                                            <label for="menuLink" class="mt-2">Menu Link <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form3.menu_link" name="menu_link" :class="{'is-invalid': form.errors.has('menu_link')}" type="text" class="form-control" id="menuLink" placeholder="Enter menu link"/>
                                            <has-error :form="form" field="menu_link"></has-error>
                                            <label for="menuPosition" class="mt-2">Position <sup><i class="fas fa-asterisk" style="color:red;font-size:8px;"></i></sup></label>
                                            <input v-model="form3.menu_position" name="menu_position" :class="{'is-invalid': form.errors.has('menu_position')}" type="number" class="form-control" id="menuPosition" placeholder="Enter menu position"/>
                                            <has-error :form="form" field="menu_position"></has-error>
                                            <button type="submit" class="btn btn-primary mt-2">
                                            <i class="fas fa-sync-alt"></i> Update
                                            </button>
                                          </form>
                                        </div>
                                        <div class="form-group col-md-6">
                                          <table class="table">         
                                            <tr class="text-center">
                                              <th>Name</th>
                                              <th>Link</th>
                                              <th>Type</th>
                                              <th>Position</th>
                                              <th>Status</th>
                                              <th>Action</th>
                                            </tr>
                                            <tr v-for="(menu, index) in menus" :key="index" class="text-center">
                                              <td>{{menu.menu_name}}</td>
                                              <td>{{menu.menu_link}}</td>
                                              <td>
                                                <span v-if="menu.menu_type == 1">Header</span>
                                                <span v-if="menu.menu_type == 2">Footer</span>
                                              </td>
                                              <td>{{menu.menu_position}}</td>
                                              <td>
                                                <span v-if="menu.menu_status == 1" class="badge bg-success">Active</span>
                                                <span v-if="menu.menu_status == 0" class="badge bg-warning">Inactive</span>
                                              </td>
                                              <td v-if="userRole == 1">
                                                <div class="btn-group">
                                                  <button @click.prevent="editMenu(menu.id)" class="btn btn-sm btn-outline-warning">Edit</button>
                                                  <!-- <button @click.prevent="menuDelete(book.id)" class="btn btn-sm btn-outline-danger">Delete</button> -->
                                                </div>
                                              </td>
                                              <td v-else>
                                                <span>Not Allowed</span>
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <!-- hidden input begin -->
                                        <!-- <input v-model="form.created_by" name="created_by" type="hidden" /> -->
                                        <!-- hidden input -- end -->
                                    </div>
                                </div>
                                <!-- /.card-body -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  data(){
    return{
      form: new Form({
        site_logo:''
      }),
      form2: new Form({
        menu_name:'',
        menu_type:'',
        menu_link:'',
        menu_position:'',
        created_by:''
      }),
      menus:[],
      userRole:localStorage.getItem('userRole'),
      add_form: true,
      edit_form: false,
      menu_id:'',
      form3: new Form({
        menu_name:'',
        menu_type:'',
        menu_link:'',
        menu_position:'',
        updated_by:''
      })
    }
  },
  methods:{
    getLogo(){
      axios.get('/getlogo/1')
        .then(response => {
            this.form.fill(response.data.fetched_site_logo);
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
    updateLogo(){
      if(this.form.site_logo != null){
        let img = this.form.site_logo;
        if(img.length > 100){
          return  this.form.site_logo
        }
        else{
          return uploadPath+"defaultImage/"+this.form.site_logo;
        }
      }
    },
    changeLogo(event){
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
        this.form.site_logo = event.target.result;
      };
      reader.readAsDataURL(file);
      }
    },
    siteLogoUpdate(){
      this.form.post('/updatelogo/1')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully uploaded logo!",
            position: 'topRight',
            timeout: 2000
          });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: 'topRight',
            timeout: 2000
          });
        });
    },
    menuSave() {
      this.form2.post('/menusave')
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully inserted record!",
            position: 'topRight',
            timeout: 2000
          });
          this.form2.menu_name = ''
          this.form2.menu_type = ''
          this.form2.menu_link = ''
          this.form2.menu_position = ''
          this.menuList();
          // this.$router.push({ name: 'setting-list' });
        })
        .catch(error => {
          iziToast.warning({
            title: "Warning",
            message: "Please fill up required field!",
            position: 'topRight',
            timeout: 2000
          });
        });
    },
    menuList() {
      axios
        .get("/getmenu")
        .then(response => {
          this.menus = response.data.fetched_menu;
          // data table
          $(function() {
            if ($.fn.dataTable.isDataTable("#example1")) {
              var table = $("#example1").DataTable();
            } else {
              table = $("#example1").DataTable({
                paging: true,
                order: [[0, "asc"]]
              });
            }
          }); // data table
        })
        .catch(error => {
          iziToast.error({
            title: "Error",
            message: "Something wrong, record not fetched!",
            position: "topRight",
            timeout: 2000
          });
        });
    },
    editMenu(menuId){
      this.menu_id = menuId;
      axios.get('/editmenu/'+menuId)
        .then(response => {
          this.add_form = false
          this.edit_form = true
          this.form3.fill(response.data.fetched_single_menu);
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
    menuUpdate() {
      this.form3.put('/updatemenu/'+this.menu_id)
        .then(response => {
          iziToast.success({
            title: "OK",
            message: "Successfully updated record!",
            position: 'topRight',
            timeout: 2000
          });
          this.form3.menu_name = ''
          this.form3.menu_type = ''
          this.form3.menu_link = ''
          this.form3.menu_position = ''
          this.menuList();
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
  mounted() {
    this.getLogo();
    this.menuList();
    this.form2.created_by = localStorage.getItem("loggedInUserId");
    this.form3.updated_by = localStorage.getItem("loggedInUserId");
  }
};
</script>
<style scoped>
.custom-control-label{
  color:rgba(0, 0, 0, 0.5);
}
</style>