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
                  <h3 class="card-title">Product List</h3>
                  <div>
                    <router-link :to="{name:'product-add'}" class="btn btn-xs btn-success d-inline-block mr-2">
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
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Product Category</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Updated By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in categories" :key="index">
                    <td>{{product.id}}</td>
                    <td>{{product.product_name}}</td>
                    <td><img :src="productImageFind(product.product_image)" width="45" height="30"></td>
                    <td>{{product.category.category_name}}</td>
                    <td>
                      <span v-if="product.product_status == 1" class="badge bg-success">Active</span>
                      <span v-if="product.product_status == 0" class="badge bg-warning">Inactive</span>
                    </td>
                    <td>{{product.created_user.name}}</td>
                    <td>
                      <span v-if="product.updated_by != null">{{product.updated_user.name}}</span>
                      <span v-else>Not Updated</span>
                    </td>
                    <td>{{moment(product.created_at).format('Do MMMM YYYY, h:mm:ss a')}}</td>
                    <td>{{moment(product.updated_at).format('Do MMMM YYYY, h:mm:ss a')}}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{name:'product-edit', params:{product_id:product.id}}" class="btn btn-sm btn-outline-warning">Edit</router-link>
                        <button @click.prevent="productDelete(product.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Product Category</th>
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
      categories:[],
      moment
    }
  },
  methods:{
    productList(){
      axios.get('/product')
        .then(response =>{
          this.categories = response.data.fetched_product;
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
    productImageFind(imageId){
      if(imageId == null){
        return uploadPath + "defaultImage/noimage.png";
      }
      else{
        return uploadPath+"productImage/"+imageId;
      }
    },
    productDelete(product_id) {
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
          axios.delete("/product/" + product_id)
            .then(response => {
              localThis.productList();
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
    this.productList();
  }
}
</script>