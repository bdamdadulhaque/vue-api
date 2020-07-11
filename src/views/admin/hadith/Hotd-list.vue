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
                  <h3 class="card-title">Hadith of the today list</h3>
                  <div>
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
                    <th>HOTD Date</th>
                    <th>Hadith No</th>
                    <th>Book</th>
                    <th>Chapter</th>
                    <th>Hadith Subject</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hadith, index) in hadiths" :key="index">
                    <td>{{hadith.hotd_date}}</td>
                    <td>{{hadith.hadith_no}}</td>
                    <td>{{hadith.book.book_name}}</td>
                    <td>{{hadith.chapter.chapter_name}}</td>
                    <td>{{hadith.hadith_subject}}</td>
                    <td>{{hadith.created_user.name}}</td>
                    <td>
                      <span v-if="hadith.updated_by != null">{{hadith.updated_user.name}}</span>
                      <span v-else>Not Updated</span>
                    </td>
                    <td>
                      <span v-if="hadith.hadith_status == 1" class="badge bg-success">Active</span>
                      <span v-if="hadith.hadith_status == 0" class="badge bg-warning">Inactive</span>
                    </td>
                    <td v-if="userRole == 1 || userRole == 2">
                      <div class="btn-group">
                        <router-link :to="{name:'hadith-view', params:{hadith_id:hadith.id}}" class="btn btn-sm btn-outline-success">View</router-link>
                      </div>
                    </td>
                    <td v-else>
                      <span>Not Allowed</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>HOTD Date</th>
                    <th>Hadith No</th>
                    <th>Book</th>
                    <th>Chapter</th>
                    <th>Hadith Subject</th>
                    <th>Created By</th>
                    <th>Updated By</th>
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
      hadiths:[],
      moment,
      userRole:localStorage.getItem('userRole')
    }
  },
  methods:{
    hadithList(){
      axios.get('/hotdlist')
        .then(response =>{
          this.hadiths = response.data.fetched_hadith;
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
    this.hadithList();
  }
}
</script>