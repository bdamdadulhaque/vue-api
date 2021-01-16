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
                  <h3 class="card-title">Account List</h3>
                  <div>
                    <router-link :to="{name:'account-add'}" v-if="userRole == 1 || userRole == 2" class="btn btn-xs btn-success d-inline-block mr-2">
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
                    <th>Account Name</th>
                    <th>Bank</th>
                    <th>Account No</th>
                    <th>Branch</th>
                    <th>Account Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(account, index) in accounts" :key="index">
                    <td>{{account.account_name}}</td>
                    <td>{{account.financial_organization_id}}</td>
                    <td>{{account.branch}}</td>
                    <td>{{account.account_type}}</td>
                    
                    <td>
                      <div class="btn-group">
                        <router-link :to="{name:'account-edit', params:{account_id:account.id}}" class="btn btn-sm btn-outline-warning">Edit</router-link>
                        <button  @click.prevent="accountDelete(account.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
              
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Account Name</th>
                    <th>Bank</th>
                    <th>Account No</th>
                    <th>Branch</th>
                    <th>Account Type</th>
                    <th>Actions</th>
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
      accounts:[],
      moment,
    }
  },
  methods:{
    accountList(){
      axios.get('/account-list')
        .then(response =>{
          console.log("fetched account "+response.data.fetched_account)
          this.accounts = response.data.fetched_account;
          // data table
          $(function() {
            if($.fn.dataTable.isDataTable('#example')){
              var table = $('#example').DataTable();
            }
            else{
              table = $('#example').DataTable({
                paging: true,
                "order":[[0,"desc"]],
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
    accountDelete(account_id) {
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
          axios.delete("/account/" + account_id)
            .then(response => {
              localThis.accountList();
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
    this.accountList();
  }
}
</script>