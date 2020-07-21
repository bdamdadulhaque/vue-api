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
                  <h3 class="card-title">Daily Hadith List</h3>
                  <div>
                    <router-link :to="{name:'daily-hadith-add'}" v-if="userRole == 1 || userRole == 2" class="btn btn-xs btn-success d-inline-block mr-2">
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
              <table id="example1" class="table table-bordered table-striped text-center">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hadith</th>
                    <th>Link</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hadith, index) in dailyhadiths" :key="index">
                    <td>{{hadith.daily_hadith_date}}</td>
                    <td>{{hadith.daily_hadith}}</td>
                    <td>{{hadith.daily_hadith_link}}</td>
                    <td>
                      <span v-if="hadith.daily_hadith_status == 1" class="badge bg-success">Active</span>
                      <span v-if="hadith.daily_hadith_status == 0" class="badge bg-warning">Inactive</span>
                    </td>
                    <td v-if="userRole == 1 || userRole == 2">
                      <div class="btn-group">
                        <router-link :to="{name:'daily-hadith-edit', params:{daily_hadith_id:hadith.id}}" class="btn btn-sm btn-outline-success">Edit</router-link>
                      </div>
                    </td>
                    <td v-else>
                      <span>Not Allowed</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Date</th>
                    <th>Hadith</th>
                    <th>Link</th>
                    <th>Status</th>
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
      dailyhadiths:[],
      moment,
      userRole:localStorage.getItem('userRole')
    }
  },
  methods:{
    dailyHadithList(){
      axios.get('/dailyhadith')
        .then(response =>{
          this.dailyhadiths = response.data.fetched_daily_hadith;
          // data table
          $(function() {
            if($.fn.dataTable.isDataTable('#example1')){
              var table = $('#example1').DataTable();
            }
            else{
              table = $('#example1').DataTable({
                paging: true,
                "order":[[0,"asc"]]
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
    }
  },
  mounted(){
    this.dailyHadithList();
  }
}
</script>