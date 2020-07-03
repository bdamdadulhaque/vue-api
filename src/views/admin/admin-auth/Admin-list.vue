<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title">Admin List</h3>
                  <div>
                    <router-link :to="{name:'admin-add'}" class="btn btn-xs btn-success d-inline-block mr-2">
                      <i class="fas fa-plus"></i> Add New
                    </router-link>
                    <button @click="$router.go(-1)" class="btn btn-xs btn-default d-inline-block mr-1">
                      <i class="fas fa-arrow-left"></i> Back
                    </button>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Photo</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(adminUser, index) in adminUsers" :key="index">
                    <td>{{adminUser.id}}</td>
                    <td>{{adminUser.name}}</td>
                    <td>{{adminUser.email}}</td>
                    <td><img :src="userPhotoFind(adminUser.user_photo)" width="60" height="50"></td>
                    <td>
                      <span v-if="adminUser.user_role == 1" class="badge bg-primary">Super Admin</span>
                      <span v-if="adminUser.user_role == 2" class="badge bg-primary">Admin</span>
                      <span v-if="adminUser.user_role == 3" class="badge bg-primary">Employee</span>
                    </td>
                    <td>
                      <span v-if="adminUser.user_status == 1" class="badge bg-success">Active</span>
                      <span v-if="adminUser.user_status == 0" class="badge bg-warning">Inactive</span>
                    </td>
                    <td>{{adminUser.created_by}}</td>
                    <td>{{adminUser.updated_by}}</td>
                    <td>{{moment(adminUser.created_at).format('Do MMMM YYYY, h:mm:ss a')}}</td>
                    <td>{{moment(adminUser.updated_at).format('Do MMMM YYYY, h:mm:ss a')}}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{name:'admin-edit', params:{admin_id:adminUser.id}}" class="btn btn-xs btn-outline-warning">Edit</router-link>
                        <router-link :to="{name:'admin-password-reset', params:{admin_id:adminUser.id}}" class="btn btn-xs btn-outline-primary">CP</router-link>
                        <button @click.prevent="adminDelete(adminUser.id)" class="btn btn-xs btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Photo</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      adminUsers:[],
      moment
      }
    },
  methods:{
    adminList(){
      axios.get('/adminlist')
        .then(response =>{
          this.adminUsers = response.data.fetched_user;
          // data table
          $(function() {
            if($.fn.dataTable.isDataTable('#example1')){
              var table = $('#example1').DataTable();
            }
            else{
              table = $('#example1').DataTable({
                paging: true,
                "order":[[0,"desc"]]
              });
            }
          }); // data table
      })
      .catch(error => {
        iziToast.error({
          title: "Error",
          message: "Something wrong, record not fetched!",
          position: 'topRight',
          timeout: 2000
        });
      })
    },
    userPhotoFind(photoId){
      if(photoId == null){
        return uploadPath + "defaultImage/noimage.png";
      }
      else{
        return uploadPath+"userPhoto/"+photoId;
      }
    },
    adminDelete(admin_id) {
    let localThis = this;
      iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: 'Are you sure to delete that?',
      position: 'center',
      buttons: [
        ['<button><b>YES</b></button>', function (instance, toast) {
          axios.delete("/admindelete/" + admin_id)
            .then(response => {
              localThis.adminList();
              iziToast.warning({
              title: "Caution",
              message: "Successfully deleted record!",
              position: "topRight",
              timeout: 2000
              });
             })
            .catch(error => {
              iziToast.warning({
                title: "Warning",
                message: "Something wrong, record not deleted!",
                position: "topRight",
                timeout: 2000
              });
            });
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
          ['<button>NO</button>', function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          }],
        ],
        onClosing: function(instance, toast, closedBy){
          console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
          console.info('Closed | closedBy: ' + closedBy);
        }
      });
    }
  },
  mounted(){
    this.adminList();
  }
}
</script>