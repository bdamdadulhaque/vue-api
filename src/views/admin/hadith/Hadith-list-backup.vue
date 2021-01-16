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
                  <h3 class="card-title">Hadith List</h3>
                  <div>
                    <router-link :to="{name:'hadith-add'}" v-if="userRole == 1 || userRole == 2" class="btn btn-xs btn-success d-inline-block mr-2">
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
              <table id="example" class="table table-bordered table-striped text-center">
                <thead>
                  <tr>
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
                    <td>
                      <span v-if="hadith.hadith_no != null">{{hadith.hadith_no}}</span>
                      <span v-else>N/A</span>
                    </td>
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
                      <span v-if="hadith.hotd_status == 1" class="badge bg-primary ml-2"><i class="fa fa-clock"></i></span>
                    </td>
                    <td v-if="userRole == 1 || userRole == 2">
                      <div class="btn-group">
                        <router-link :to="{name:'hadith-view', params:{hadith_id:hadith.id}}" class="btn btn-sm btn-outline-success">View</router-link>
                        <router-link :to="{name:'hadith-edit', params:{hadith_id:hadith.id}}" class="btn btn-sm btn-outline-warning">Edit</router-link>
                        <!-- <router-link :to="{name:'hotd', params:{hadith_id:hadith.id}}" class="btn btn-sm btn-outline-primary">HOTD</router-link> -->
                        <button v-if="userRole == 1" @click.prevent="hadithDelete(hadith.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                    <td v-else>
                      <span>Not Allowed</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
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
      axios.get('/hadith')
        .then(response =>{
          console.log("fetched hadith "+response.data.fetched_hadith)
          this.hadiths = response.data.fetched_hadith;
          // data table
          // $(function() {
          //   if($.fn.dataTable.isDataTable('#example1')){
          //     var table = $('#example1').DataTable();
          //   }
          //   else{
          //     table = $('#example1').DataTable({
          //       paging: true,
          //       "order":[[0,"asc"]]
          //     });
          //   }
          // }); 
          // data table
          // data table
          $(function() {
            if($.fn.dataTable.isDataTable('#example')){
              var table = $('#example').DataTable();
            }
            else{
              table = $('#example').DataTable({
                paging: true,
                "order":[[0,"asc"]],
                dom: 'Bfrtip',
                initComplete: function () {
                    this.api().columns([0, 1, 2, 4, 5]).every( function () {
                        var column = this;
                        var select = $('<select><option value="">All</option></select>')
                            .appendTo( $(column.header()).empty() )
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );  
                        column.data().unique().sort().each( function ( d, j ) {
                            select.append( '<option value="'+d+'">'+d+'</option>' )
                        } );
                    } );
                }
              });
            }
          });
        // data table
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
    hadithDelete(hadith_id) {
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
          axios.delete("/hadith/" + hadith_id)
            .then(response => {
              localThis.hadithList();
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
          //console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
          //console.info('Closed | closedBy: ' + closedBy);
        }
      });
    }
  },
  mounted(){
    this.hadithList();
  }
}
</script>