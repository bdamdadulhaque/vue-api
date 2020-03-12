<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Category</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Category</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5>Category List</h5>
                    </div>
                    <div>
                        <router-link :to="{name:'category-add'}" class="btn btn-outline-primary d-inline-block"><i class="fas fa-plus"></i> Add New</router-link>
                    </div>
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Category Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(category, index) in categories" :key="index">
                    <td>{{category.id}}</td>
                    <td>{{category.category_name}}</td>
                    <td><img :src="categoryImageFind(category.category_image)" width="60" height="50"></td>
                    <td>{{category.category_status}}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{name:'category-edit', params:{category_id:category.id}}" class="btn btn-outline-warning">Edit</router-link>
                        <button @click.prevent="categoryDelete(category.id)" class="btn btn-outline-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Category Image</th>
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
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
export default {
    data(){
        return{
            categories:[]
        }
    },
    methods:{
        categoryList(){
            axios.get('/category')
            .then(response =>{
                this.categories = response.data;
                 $(function () {
                   $("#example1").DataTable();
                 });
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
        categoryImageFind(imageId){
          return uploadPath+"categoryImage/"+imageId;
        },
        categoryDelete(category_id){
          axios.delete('/category/'+category_id)
          .then(response => {
            this.categoryList();
            iziToast.warning({
              title: 'Caution',
              message: 'Successfully deleted record!',
              position: 'topRight',
              timeout: 2000
            });
          })
          .catch(error => {
            iziToast.warning({
            title: "Warning",
            message: "Something wrong, record not deleted!",
            position: 'topRight',
            timeout: 2000
            });
          });
        }
    },
    mounted(){
        this.categoryList();
    }
}
</script>