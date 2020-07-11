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
                  <h3 class="card-title">Chapter List</h3>
                  <div>
                    <router-link :to="{name:'chapter-add'}" v-if="userRole == 1 || userRole == 2" class="btn btn-xs btn-success d-inline-block mr-2">
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
                    <th>ID</th>
                    <th>Chapter Name</th>
                    <th>Book</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(chapter, index) in chapters" :key="index">
                    <td>{{chapter.id}}</td>
                    <td>{{chapter.chapter_name}}</td>
                    <td>{{chapter.book.book_name}}</td>
                    <td>{{chapter.created_user.name}}</td>
                    <td>
                      <span v-if="chapter.updated_by != null">{{chapter.updated_user.name}}</span>
                      <span v-else>Not Updated</span>
                    </td>
                    <td>
                      <span v-if="chapter.chapter_status == 1" class="badge bg-success">Active</span>
                      <span v-if="chapter.chapter_status == 0" class="badge bg-warning">Inactive</span>
                    </td>
                    <td v-if="userRole == 1 || userRole == 2">
                      <div class="btn-group">
                        <router-link :to="{name:'chapter-edit', params:{chapter_id:chapter.id}}" class="btn btn-sm btn-outline-warning">Edit</router-link>
                        <button @click.prevent="chapterDelete(chapter.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                    <td v-else>
                      <span>Not Allowed</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Chapter Name</th>
                    <th>Book</th>
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
      chapters:[],
      moment,
      userRole:localStorage.getItem('userRole')
    }
  },
  methods:{
    chapterList(){
      axios.get('/chapter')
        .then(response =>{
          this.chapters = response.data.fetched_chapter;
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
            $('#example').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                  {
                    extend: 'csvHtml5'
                  }
                ],
                initComplete: function () {
                    this.api().columns([0, 1, 2, 3, 4]).every( function () {
                        var column = this;
                        var select = $('<select><option value="">All</option></select>')
                             
                           //.appendTo( '#table_filter' )
                           //.appendTo( $(column.header()).empty() )
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
            } );
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
    chapterDelete(chapter_id) {
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
          axios.delete("/chapter/" + chapter_id)
            .then(response => {
              localThis.chapterList();
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
    this.chapterList();
  }
}
</script>